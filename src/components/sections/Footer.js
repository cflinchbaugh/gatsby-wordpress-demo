import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { accentDefault,
    primaryDefault,
    shiro } from '../../colors';

const StyleWrapper = styled.div`
    font-size: 14pt;
    color: ${shiro};
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

                    <a href="tel:+17178587428" className="phone">
                        (717) 858-7428
                    </a>
                    
                    <span className="spacer">|</span>
                    
                    <a href="https://maps.google.com/maps?ll=39.96126,-76.724574&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=8729464084897694435">
                        Directions
                    </a>
                </div>
            </div>
        </StyleWrapper>
    );
};

export default Footer;