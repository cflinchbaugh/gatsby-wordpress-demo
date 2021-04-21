import * as React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';


const StyleWrapper = styled.div`
    padding: 4em;
    background-color: #009688;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;



  .staff-item {
    background: rgba( 255,255,255,0.20 );
    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
    backdrop-filter: blur( 20.5px );
    border-radius: 5px;
    float: left;
    margin: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 0 0 auto;

    img {
        transition: all .15s ease-in-out;
    }

    img:hover {
        transform: scale(1.15);
        transition: transform .5s;
    }
  }
`;

const Staff = (props) => {
    const {
        allFile,
        allWpEmployee,
        handleClickDetails
    } = props;

    function buildStaffMarkup() {
        const staffData = (allWpEmployee?.nodes && allWpEmployee.nodes.length) ? allWpEmployee.nodes.map( (wpEmployeeData) => {
            let employeeData = wpEmployeeData;

            const currentEmployeeProfileURL = wpEmployeeData?.employeeData?.profilePicture?.mediaItemUrl;
            
            allFile.nodes.some((fileData) => {
                if (fileData.url === currentEmployeeProfileURL) {
                    employeeData.profileData = fileData.childImageSharp.gatsbyImageData;
                }
                return null;
            })
            
            return employeeData;
        }) :  <div>No Staff Found</div>;

        const staffMarkup =  staffData.map( ({
            id,
            profileData,
            title,
            uri
        }) => {
            const profileImage = (typeof(profileData) !== 'undefined') ? <GatsbyImage image={profileData} alt={`${title} Profile Image`} /> : <div>FALLBACK IMAGE</div>

            return (
                <div className="staff-item" key={id}>
                    <strong>
                        <span dangerouslySetInnerHTML={{__html: title}} />
                    </strong>

                    <div>
                        {profileImage}
                    </div>

                    <button 
                        onClick={(() => {
                            handleClickDetails(id);
                        })}>
                        See Details
                    </button>
                </div>
            );
        });

        return staffMarkup;
    }

    const staffMarkup = buildStaffMarkup();

    return (
        <StyleWrapper>
            {/* <div>Our Family heading</div> */}
            { staffMarkup }
        </StyleWrapper>
    );
};

export default Staff;