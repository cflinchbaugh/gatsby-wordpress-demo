import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import BackgroundImage from 'gatsby-background-image';
import { 
    graphql,
    useStaticQuery
} from 'gatsby';
import Button from '../Button';
import {
    accentDefault,
    shiro
} from '../../colors';


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
            backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            font-size: clamp(1.5rem, 6vw, 2rem);
            line-height: 1.2;
            text-align: center;
        }
    }

    .description {
        margin: 20px 15%;
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

    function handleClickCallToAction() {
        if (typeof(window) !== 'undefined') {
            window.open('https://www.vagaro.com/didiandsmilingjohnsbarbershop','_blank');
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
                        
                        <Button handleClick={handleClickCallToAction} showShimmer={true}>
                            Book Now
                        </Button>
                    </div>

                    <Button handleClick={handleClickArrow} type={"ghost"}>
                        ▼
                    </Button>
                </div>
            </BackgroundImage>
        </StyleWrapper>
    );
};

export default HeroContents;