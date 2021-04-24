import * as React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';

import Carousel from '../Carousel';


const StyleWrapper = styled.div`
    padding: 4em;
    background-color: #009688;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    .staff-item {
        position: relative;
        backdrop-filter: blur( 20.5px );
        border-radius: 5px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex: 0 0 auto;

        .profile-image {
            box-shadow: 0 8px 32px 0 rgb(31 38 135 / 45%);

            img {
                transition: all .15s ease-in-out;
            }
            
            img:hover {
                transform: scale(1.15);
                transition: transform .5s;
            }
        }

        .foreground {
            position: absolute;
            z-index: 2;
            
        }

        .header,
        .footer {
            color: white;
            background-color: rgba(0,0,0,0.65);
            padding: 5px 10px;
        }
        
        .header {
            top: 10px;
            left: 10px;
            border-radius: 10px;
        }
        
        .footer {
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            border-radius: 0 0 5px 5px;
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
            const profileImage = (typeof(profileData) !== 'undefined') ? <GatsbyImage image={profileData} alt={`${title} Profile Image`} /> : <img src={staffPlaceholderImg}></img>

            return (
                <div className="staff-item" key={id}>
                    <div className="foreground header">
                        <strong>
                            <span dangerouslySetInnerHTML={{__html: title}} />
                        </strong>
                    </div>

                    <div className="profile-image">
                        {profileImage}
                    </div>

                    <div className="foreground footer">
                        <button 
                            onClick={(() => {
                                handleClickDetails(id);
                            })}>
                            See Details
                        </button>
                    </div>
                </div>
            );
        });

        return staffMarkup;
    }

    const staffMarkup = buildStaffMarkup(),
        carouselData = {
            items: staffMarkup
        };

    return (
        <StyleWrapper>
            <Carousel {...carouselData} />
        </StyleWrapper>
    );
};

export default Staff;