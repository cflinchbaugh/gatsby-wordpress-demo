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

    .links-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    a {
        transition: color 0.15s;
        padding: 10px 0;

        &:hover {
            color: ${accentDefault};
        }
    }

    .spacer {
        display: none;
    }

    .hours {
        display: flex;
        flex-direction: column;

        font-size: 1.15rem;
        ul {
            list-style-type: none;
        }
    }

    @media (min-width: 768px) {
        .links-wrapper {
            flex-direction: row;
        }

        .spacer {
            display: flex;
            padding: 0 30px;
        }
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
                {/* <a href="#">
                    <StaticImage {...logoImageData} />
                </a> */}

                <div className="hours">
                    <a href="tel:+17178587428" className="phone">
                        (717) 858-7428
                    </a>
                    <strong>Hours of Operation</strong>
                    <ul>
                        <li>Mon: Closed</li>
                        <li>Tues–Fri: 9am–7pm</li>
                        <li>Sat: 9am–3pm</li>
                    </ul>
                </div>
                
                <div className="links-wrapper">
                    <a href="http://www.facebook.com/DiDiandSmilingJohns" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>

                    <span className="spacer">|</span>

                    <a href="https://maps.google.com/maps?ll=39.96126,-76.724574&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=8729464084897694435">
                        Directions
                    </a>

                    <span className="spacer">|</span>

                    <div>Attributions</div>
                    {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                </div>

                
            </div>
        </StyleWrapper>
    );
};

export default Footer;