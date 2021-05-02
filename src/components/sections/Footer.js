import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
    background: papayawhip;
    padding: 4em;
    text-align: center;

    .social-media-icons {
        display: flex;
        justify-content: center;

        a {
            display: flex;
            padding: 15px;
        }
    }
`;

const Footer = (props) => {
    const socialMediaImageData = {
        height: 50,
        width: 50,
        placeholder: 'tracedSVG'
    };

    return (
        <StyleWrapper>
            <div>
                <a href="tel:+17178587428">(717) 858-7428</a>
            </div>
            <div>
                Hours of Operation
            </div>
            <div>
                Monday: Closed
            </div>
            <div>
                Tuesday – Friday: 9AM–7PM
            </div>
            <div>
                Saturday: 9AM–3PM
            </div>
            <div>
                *Prices subject to change
            </div>

            <div className="social-media-icons">
                <a href="http://www.facebook.com/DiDiandSmilingJohns" target="_blank" rel="noopener noreferrer">
                    <StaticImage
                        {...socialMediaImageData}
                        src="../../images/facebook-icon.png"
                        alt="Facebook"
                    />
                </a>

                <a href="http://m.me/DiDiandSmilingJohns" target="_blank" rel="noopener noreferrer">
                    <StaticImage
                        {...socialMediaImageData}
                        src="../../images/messenger-icon.png"
                        alt="Messenger"
                    />
                </a>
            </div>
        </StyleWrapper>
    );
};

export default Footer;