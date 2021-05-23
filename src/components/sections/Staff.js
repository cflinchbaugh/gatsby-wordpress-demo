import React, {
    useState
} from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';
import StaffDefault from '../items/StaffDefault';
import Carousel from '../Carousel';
import StaffItem from '../items/StaffItem';
import { secondaryDefault } from '../../colors';

const StyleWrapper = styled.div`
    height: 100vh;
    background-color: ${secondaryDefault};
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    overflow-x: hidden;
    margin: auto;
    position: relative;
    min-height: 550px;

    .staff-wrapper {
        max-width: 1800px;
        position: relative;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex: 1;
        flex-wrap: nowrap;
        overflow-x: hidden;
        margin: auto;
        position: relative;
    }

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
        overflow: hidden;
    }

    @media (min-width: 768px) {
        .staff-wrapper {
            min-height: 70vh;
        }
        .staff-item {
            max-width: 350px;
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
                const profileImage = (typeof(profileData) !== 'undefined') ? <GatsbyImage image={profileData} alt={`${title} Profile Image`} /> : <img src={staffPlaceholderImg}></img>,
                    staffItemData = {
                        title,
                        profileImage
                    };

                staffMarkup.push(
                    <button className="staff-item" 
                        key={id}  
                        onClick={(() => {
                            handleClickDetails(id);
                        })}
                    >
                        <StaffItem {...staffItemData} />
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
            defaultItemIdx: stylistsMarkup.length,
            items: [
                ...stylistsMarkup.reverse(),
                ...defaultMarkup,
                ...barbersMarkup,
            ]
        };

    return (
        <StyleWrapper>
            <div className="staff-wrapper">
                <Carousel {...carouselData} />
            </div>
        </StyleWrapper>
    );
};

export default Staff;