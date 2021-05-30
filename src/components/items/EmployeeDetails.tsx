import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { GatsbyImage } from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;

    .employee-section {
        padding: 20px;
    }

    .profile-image {
        display: flex;
        flex: 1;
    }

    .employee-details {
        display: flex;
        flex: 2;
        flex-direction: column;
    }

    @media (min-width:768px) {
        flex-direction: row;
    }

`;

interface EmployeeDetailsInterface {
    employeeData: {
        biography: string,
        services: Node
    },
    profileData: any,
    title: string
}

const EmployeeDetails = (props:EmployeeDetailsInterface) => {  
    const {
        // id,
        title,
        // uri,
        employeeData: {
            biography,
            // profession,
            services
        },
        profileData
    } = props;

    const servicesSantized = {
            __html: DOMPurify.sanitize(services,
                {USE_PROFILES: {html: true}}
            )
        },
        profileImage = (typeof(profileData) !== 'undefined') ? (
            <GatsbyImage image={profileData} alt={`${title} Profile`} />
         ) : (
            <img src={staffPlaceholderImg} height="481" width="350" alt={`${title} Placeholder Profile`}></img>)
         ;

    return (
        <StyleWrapper>
            <div className="employee-section profile-image">
                {profileImage}
            </div>

            <div className="employee-details">
                <div className="employee-section">
                    {biography}
                </div>

                <hr/>

                <div className="employee-section">
                    <strong>Services*</strong>

                    <div dangerouslySetInnerHTML={servicesSantized} />

                    <div>*Prices subject to change</div>
                </div>
            </div>
        </StyleWrapper>
    );
}

export default EmployeeDetails;