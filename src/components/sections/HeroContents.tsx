import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { 
    graphql,
    useStaticQuery
} from 'gatsby';
import Button, {ButtonInterface} from '../Button';
import stylistIcon from '../../images/stylistIcon.svg';
import barberIcon from '../../images/barberIcon.svg';

const bounceAnimation = keyframes`
    0% {
        transform: translateY(0px);
    }
    30% {
        transform: translateY(0px);
    }
    85% {
        transform: translateY(-30px);
    }
    90% {
        transform: translateY(5px);
    }
    95% {
        transform: translateY(-10px);
    }
`;

const StyleWrapper = styled.div`
    height: 100%;
    margin: 0;
    min-height: 100vh;

    /* Position and center the image to scale nicely on all screens */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    section {
        height: 100%;
    }

    .hero-background-image {
        position: absolute;
        height: 100vh;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
    }

    .hero-contents-container {
        display: flex;
        flex: 1 0 0%;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-evenly;
        min-height: 100vh;

        .hero-contents {
            margin: 1.5rem;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(8px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            font-size: clamp(1.5rem, 6vw, 1.5rem);
            line-height: 1.2;
            text-align: center;
        }
    }

    .description {
        margin: 30px 15% 0;
    }

    .call-to-actions-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;

        .call-to-action-button-container {
            flex: 1;
            margin: 20px 0;
        }

    }
    
    .call-to-action-button-contents {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px;

        .icon {
            opacity: 0.85;
            padding-right: 15px;
            max-width: 45px;
        }
    }

    
    
    .bounce {
        animation-name: ${bounceAnimation};
        animation-delay: 2.5s;
        animation-duration: 2.5s;
        animation-iteration-count: infinite;
    }

    @media (min-width: 768px) {
        .call-to-actions-container {
            flex-direction: row;
    
            .call-to-action-button-container {
                margin: 50px 0;
            }
        }
    }
 
`;

interface HeroContentsInterface {

}

const HeroContents = () => {
    const results = useStaticQuery(graphql`
        {
            wpSectionHeroContent {
                sectionHero {
                  heroBody
                }
            }            
        }
    `);


    const { wpSectionHeroContent } = results;

    function handleClickBarbers() {
        if (typeof(window) !== 'undefined') {
            window.open('https://www.vagaro.com/didiandsmilingjohnsbarbershop','_blank');
        }
    }

    function handleClickStylists() {
        if (typeof(window) !== 'undefined') {
            window.open('http://fb.com/msg/DiDiandSmilingJohns','_blank');
        }
    }
    
    function handleClickArrow() {
        if (typeof(window) !== 'undefined') {
            let pageHeight = window.innerHeight;
            window.scrollBy(0, pageHeight);
        }
    }

    const logoImageData = {
            alt: 'DiDi and Smiling John\'s Barber and Beauty Shop Logo',
            loading: 'eager',
            src: '../../images/logo_banner.png',
            placeholder: 'tracedSVG',
            width: 400
        },
        heroImageData = {
            alt: 'The Barbershop, a yellow brick building set against a brilliant blue sky',
            formats: [
                'auto',
                'webp',
                'avif'
            ],
            layout: 'fullWidth',
            src: '../../images/hero_cropped.jpg'
        },
        bookStylistButtonData:ButtonInterface = {
            children: (
                <div className="call-to-action-button-contents">
                    <img src={stylistIcon} className="icon icon-stylists" alt="Stylists Icon"/>
                    Book Stylist
                </div>
            ),
            handleClick: handleClickStylists,
            showShimmer: true
        },
        bookBarberButtonData:ButtonInterface = {
            children: (
                <div className="call-to-action-button-contents">
                    <img src={barberIcon} className="icon icon-barbers" alt="Barbers Icon"/>
                    Book Barber
                </div>
            ),
            handleClick: handleClickBarbers,
            showShimmer: true
        }

        return (
            <StyleWrapper>
                <div style={{ display: "grid" }}>
                    <StaticImage
                        className="hero-background-image"
                        style={{
                            gridArea: "1/1", // By using the same grid area for both, they are stacked on top of each other
                        }}
                        {...heroImageData}
                    />
                    <div
                        style={{
                            display: "grid",
                            gridArea: "1/1", // By using the same grid area for both, they are stacked on top of each other
                            placeItems: "center", // Centers the other elements inside the hero component
                            position: "relative"
                        }}
                    >

                        <div className="hero-contents-container">
                            <div className="hero-contents">
                                <StaticImage {...logoImageData} />
                            
                                <span className="description">
                                    {wpSectionHeroContent.sectionHero.heroBody}
                                </span>

                                <div className="call-to-actions-container">
                                    <div className="call-to-action-button-container">
                                        <Button {...bookStylistButtonData} />
                                    </div>

                                    <div className="call-to-action-button-container">
                                        <Button {...bookBarberButtonData} />
                                    </div>
                                </div>
                            </div>

                            <span className="bounce">
                                <Button handleClick={handleClickArrow} type={"secondary"}>
                                    ▼
                                </Button>
                            </span>
                        </div>
                    </div>
                </div>
            </StyleWrapper>
        )
};

export default HeroContents;
export type {HeroContentsInterface};