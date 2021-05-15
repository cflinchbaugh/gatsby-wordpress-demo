import React, {
    useState
} from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';
import StaffDefault from '../items/StaffDefault';
import Carousel from '../Carousel';
import { shiro } from '../../colors';


const StyleWrapper = styled.div`
    height: 100vh;
    background-color: #009688;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;

    .staff-item {
        position: relative;
        padding: 0;
        backdrop-filter: blur( 20.5px );
        border-radius: 5px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex: 0 0 auto;
        max-width: 300px;

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
            color: ${shiro};
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

    @media (min-width: 768px) {
        .staff-item {
            max-width: initial;
        }
    }
`;

const barber = 'Barber',
    stylist = 'Stylist';

const Staff = (props) => {
    const {
        allFile,
        allWpEmployee,
        handleClickDetails
    } = props;

    const [filter, setFilter] = useState([barber, stylist]);
    
    function buildStaffMarkup(target) {
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

        let staffMarkup = [];
        
        staffData.forEach( ({
            employeeData,
            id,
            profileData,
            title
        }) => {
            if (employeeData.profession.includes(target)) {
                const profileImage = (typeof(profileData) !== 'undefined') ? <GatsbyImage image={profileData} alt={`${title} Profile Image`} /> : <img src={staffPlaceholderImg}></img>

                staffMarkup.push(
                    <button className="staff-item" 
                        key={id}  
                        onClick={(() => {
                            handleClickDetails(id);
                        })}
                    >
                        <div className="foreground header">
                            <strong>
                                <span dangerouslySetInnerHTML={{__html: title}} />
                            </strong>
                        </div>

                        <div className="profile-image">
                            {profileImage}
                        </div>

                        <div className="foreground footer">
                            <div>
                                See Details
                            </div>
                        </div>
                    </button>
                );
            }
        });

        return staffMarkup;
    }

    const defaultMarkup = filter.includes(barber, stylist) ? [(
            <StaffDefault tabIndex="2" />
        )] : [],
        barbersMarkup = filter.includes(barber) ? buildStaffMarkup(barber) : [],
        stylistsMarkup = filter.includes(stylist) ? buildStaffMarkup(stylist) : [];

    const carouselData = {
            items: [
                ...stylistsMarkup.reverse(),
                ...defaultMarkup,
                ...barbersMarkup,
            ]
        };

    return (
        <StyleWrapper>
            <Carousel {...carouselData} />
        </StyleWrapper>
    );
};

export default Staff;