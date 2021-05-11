import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { GatsbyImage } from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';

const StyleWrapper = styled.div`
    .employee-section {
        padding: 20px;
    }

`;

const WpEmployee = (props) => {  
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
            __html: DOMPurify.sanitize(services)
        },
        profileImage = (typeof(profileData) !== 'undefined') ? <GatsbyImage image={profileData} alt={`${title} Profile Image`} /> : <img src={staffPlaceholderImg} alt="Placeholder Profile Image"></img>
    
    return (
        <StyleWrapper>
            <div className="employee-section profile-image">
                {profileImage}
            </div>

            <div className="employee-section">
                {biography}
            </div>

            <hr/>

            <div className="employee-section">
                <strong>Services*</strong>

                <div dangerouslySetInnerHTML={servicesSantized} />

                <div>*Prices subject to change</div>
            </div>
        </StyleWrapper>
    );
}

export default WpEmployee;