import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { accentDefault,
    primaryDefault } from '../../colors';

const StyleWrapper = styled.div`
    font-size: 14pt;
    color: white;
    align-items: center;
    background: ${primaryDefault};
    display: flex;
    flex-direction: column;
    padding: 2em;
    text-align: center;

    .footer-contents-primary {
        max-width: 500px;
    }

    a {
        transition: color 0.15s;

        &:hover {
            color: ${accentDefault};
        }
    }

    .spacer {
        padding: 15px;
    }

    .phone {
        padding-bottom: 2px;
    }

    @media (min-width: 768px) {

    }
`;

const Footer = () => {
    const logoImageData = {
            alt: 'DiDi and Smiling John\'s Barber and Beauty Shop Logo',
            src: '../../images/logo_banner.png',
            placeholder: 'tracedSVG',
            width: 200
        }

    return (
        <StyleWrapper>
            <div className="footer-contents-primary">
                <a href="#">
                    <StaticImage {...logoImageData} />
                </a>
                
                <div className="social-media-icons">
                    <a href="http://www.facebook.com/DiDiandSmilingJohns" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>

                    <span className="spacer">|</span>

                    <a href="tel:+17178587428" class="phone">
                        (717) 858-7428
                    </a>
                </div>

                <div>
                    *All prices subject to change
                </div>
            </div>
        </StyleWrapper>
    );
};

export default Footer;