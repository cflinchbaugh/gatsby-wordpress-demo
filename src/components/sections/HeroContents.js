import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import BackgroundImage from 'gatsby-background-image';
import { 
    graphql,
    useStaticQuery
} from 'gatsby';
import Button from '../Button';
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
    /* Set a specific height */
    height: 100vh;

    /* Position and center the image to scale nicely on all screens */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    section {
        height: 100%;
    }

    .hero-contents-container {
        display: flex;
        flex: 1 0 0%;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-evenly;

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



const HeroContents = (props) => {
    const results = useStaticQuery(graphql`
        {
            wpSectionHeroContent {
                sectionHero {
                  heroBody
                }
            }
            file(url: {eq: "https://didiandsmilingjohns.com/wp-content/uploads/hero.png"}, childrenImageSharp: {}) {
                id
                url
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            
        }
    `);

    const { file } = results;
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
        backgroundImageData = {
            fluid: file?.childImageSharp?.fluid,
            Tag: 'section'
        }

    return (
        <StyleWrapper>
            <BackgroundImage {...backgroundImageData}>
                <div className="hero-contents-container">
                    <div className="hero-contents">
                        <StaticImage {...logoImageData} />
                    
                        <span className="description">
                            {wpSectionHeroContent.sectionHero.heroBody}
                        </span>

                        <div className="call-to-actions-container">
                            <div className="call-to-action-button-container">
                                <Button className="call-to-action-button" handleClick={handleClickStylists} showShimmer={true}>
                                    <div className="call-to-action-button-contents">
                                        <img src={stylistIcon} className="icon icon-stylists" alt="Stylists Icon"/>
                                        Book Stylist
                                    </div>
                                </Button>
                            </div>

                            <div className="call-to-action-button-container">
                                <Button className="call-to-action-button" handleClick={handleClickBarbers} showShimmer={true}>
                                    <div className="call-to-action-button-contents">
                                        <img src={barberIcon} className="icon icon-barbers" alt="Barbers Icon"/>
                                        Book Barber
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <span className="bounce">
                        <Button handleClick={handleClickArrow} type={"ghost"}>
                            ▼
                        </Button>
                    </span>
                </div>
            </BackgroundImage>
        </StyleWrapper>
    );
};

export default HeroContents;