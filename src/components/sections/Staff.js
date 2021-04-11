import * as React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const StyleWrapper = styled.div`
  padding: 4em;
  background-color: #009688;

  .staff-item {
      background: #ffffff;
      
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

            const currentEmployeeProfileURL = wpEmployeeData.employeeData.profilePicture.mediaItemUrl;
            
            allFile.nodes.some((fileData) => {
                if (fileData.url === currentEmployeeProfileURL) {
                    console.log(fileData.url);
                    employeeData.profileData = fileData.childImageSharp.gatsbyImageData;
                    console.log(employeeData.profileData);
                }
            })
            
            return employeeData;
        }) :  <div>No Staff Found</div>;

        const staffMarkup =  staffData.map( ({
            id,
            profileData,
            title,
            uri
        }) => (
            <div className="staff-item" key={id}>
                <strong>
                    <span dangerouslySetInnerHTML={{__html: title}} />
                </strong>

                <div>
                    <GatsbyImage image={profileData} alt={`${title} Profile Image`} />
                </div>

                <button 
                    onClick={(() => {
                        handleClickDetails(id);
                    })}>
                    See Details
                </button>
            </div>
        ));

        return staffMarkup;
    }

    const staffMarkup = buildStaffMarkup();

    return (
        <StyleWrapper>
            <div>Our Family heading</div>
            { staffMarkup }
        </StyleWrapper>
    );
};

export default Staff;