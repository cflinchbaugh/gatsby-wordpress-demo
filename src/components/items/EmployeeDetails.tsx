import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { 
    GatsbyImage,
    StaticImage
} from 'gatsby-plugin-image';
import staffPlaceholderImg from '../../images/staff-placeholder.png';
import {
    accentDark
} from '../../colors';

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;

    .employee-section {
        padding: 20px;
    }

    .social-media-wrapper {
        display: flex;
        justify-content: flex-end;

        a {
            transition: background-color .25s;
            border-radius: 100%;
            padding: 2.5px;

            &:hover {
                background-color: ${accentDark};
            }
        }

    }

    .profile-image {
        display: flex;
        flex: 1;
        max-height: 500px;
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

type AllFileNodeType = {
    childImageSharp: {
        gatsbyImageData: {
            height: number,
            images: {
                fallback: any,
                sources: []
            },
            layout: "constrained",
            placeholder: any,
            width: number
        },
        id: string
    }
    url: string
}

interface EmployeeDetailsInterface {
    allFile: {
        nodes: Array<AllFileNodeType>
    },
    employeeData: {
        biography: string,
        services: Node,
        profession: ['Barber'|'Stylist'],
        profilePicture2: {
            mediaItemUrl: string
        }
        socialMediaInstagram: URL | null
    },
    title?: string
}

const EmployeeDetails = (props:EmployeeDetailsInterface) => {  
    const {
        allFile,
        title,
        employeeData
    } = props;

    const servicesSantized = {
            __html: DOMPurify.sanitize(employeeData.services,
                {USE_PROFILES: {html: true}}
            )
        };

        let imageData = undefined;

        allFile.nodes.some((fileData) => {
            if (fileData.url === employeeData.profilePicture2.mediaItemUrl) {
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
            ),
            commonImageData = {
                height: 30,
                width: 30,
            },
            socialMediaMarkup = employeeData.socialMediaInstagram ? (
                <div className="social-media-wrapper">
                    <a href={employeeData.socialMediaInstagram.toString()} 
                        title={`${title} Instagram`}
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <StaticImage 
                            {...commonImageData}
                            alt="Instagram Icon"
                            placeholder="tracedSVG" 
                            src="../../images/instagram.png" 
                        />
                    </a>
                </div>
            ) : null;

    return (
        <StyleWrapper>
            <div className="employee-section profile-image">
                {profileImage}
            </div>

            <div className="employee-details">
                <div className="employee-section">
                    {employeeData.biography}
                    
                    {socialMediaMarkup}
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