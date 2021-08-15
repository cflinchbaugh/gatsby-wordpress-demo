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
    allFile: any,
    employeeData?: {
        biography: string,
        services: Node,
        profession: ['Barber'|'Stylist'],
        profilePicture2: {
            mediaItemUrl: string
        }
    },
    title?: string
}

const EmployeeDetails = (props:EmployeeDetailsInterface) => {  
    const {
        allFile,
        title,
        employeeData: {
            biography,
            profilePicture2: {
                mediaItemUrl
            },
            services
        }
    } = props;

    const servicesSantized = {
            __html: DOMPurify.sanitize(services,
                {USE_PROFILES: {html: true}}
            )
        };

        let imageData = undefined;

        allFile.nodes.some((fileData) => {
            if (fileData.url === props.employeeData.profilePicture2.mediaItemUrl) {
                imageData = fileData.childImageSharp.gatsbyImageData
            }
        });

        const profileImage = (typeof(imageData) !== 'undefined') ? (
                <GatsbyImage image={imageData} alt={`${title} Profile`} />
             ) : (
                <img 
                    alt={`${title} Placeholder Profile`}
                    height="481"
                    src={staffPlaceholderImg} 
                    width="350"
                >
                </img>
            );

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
export type {EmployeeDetailsInterface};