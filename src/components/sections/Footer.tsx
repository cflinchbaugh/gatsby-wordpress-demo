import React, {
    MouseEventHandler
} from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { 
    kuro,
    primaryDefault,
    shiro 
} from '../../colors';
import Button, {ButtonInterface} from '../Button';

const StyleWrapper = styled.div`
    font-size: 14pt;
    font-weight: bold;
    color: ${kuro};
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
            color: ${shiro};
        }
    }

    .spacer {
        display: none;
    }

    .hours {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        font-size: 1.15rem;

        ul {
            font-size: 18px;
            list-style-type: none;
        }
    }

    .phone-button-wrapper {
        margin-bottom: 30px;
    }

    @media (min-width: 768px) {
        .links-wrapper {
            flex-direction: row;
        }

        .spacer {
            display: flex;
            padding: 0 30px;
        }

        .phone-button-wrapper {
            display: none;
        }
    }
`;

interface FooterInterface {
    handleClickAttributions: MouseEventHandler<HTMLButtonElement>
}

const Footer = (props:FooterInterface) => {
    const {
        handleClickAttributions
    } = props;

    const logoImageData = {
            alt: 'DiDi and Smiling John\'s Barber and Beauty Shop Logo',
            src: '../../images/logo_banner.png',
            width: 200
        }

    function handleClickPhone() {
        if (typeof(window) !== 'undefined') {
            window.location.href='tel:+17178587428';
        }
    }

    const phoneButtonData:ButtonInterface = {
            children: '(717) 858-7428',
            handleClick: handleClickPhone,
            type: 'primary'
        },
        attributionButtonData:ButtonInterface = {
            children: 'Attributions',
            handleClick: handleClickAttributions,
            type: 'kuro'
        };
        

    return (
        <StyleWrapper>
            <div className="footer-contents-primary">
                <StaticImage placeholder="tracedSVG" {...logoImageData} />

                <div className="hours">
                    <strong>Hours of Operation</strong>
                    <ul>
                        <li>Mon: Closed</li>
                        <li>Tues–Fri: 9am–7pm</li>
                        <li>Sat: 9am–3pm</li>
                    </ul>
                </div>

                <div className="links-wrapper">
                    <a href="http://www.facebook.com/DiDiandSmilingJohns" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Facebook
                    </a>

                    <span className="spacer">|</span>

                    <a href="https://maps.google.com/maps?ll=39.96126,-76.724574&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=8729464084897694435"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Directions
                    </a>

                    <div className="phone-button-wrapper">
                        <span className="spacer">|</span>

                        <Button {...phoneButtonData}/>
                    </div>
                </div>
            </div>

            <Button {...attributionButtonData}/>
        </StyleWrapper>
    );
};

export default Footer;
export type {FooterInterface};