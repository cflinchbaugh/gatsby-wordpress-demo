import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import BackgroundImage from 'gatsby-background-image';
import { 
    graphql,
    useStaticQuery
} from 'gatsby';


const StyleWrapper = styled.div`
    height: 100%;
    margin: 0;
    /* Set a specific height */
    height: 90vh;

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
        justify-content: center;

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


    button {
        display: block;
        max-width: 100%;
        margin: 10px auto;
        overflow: hidden;
        position: relative;
        transform: translatez(0);
        text-decoration: none;
        box-sizing: border-box;
        font-size: 24px;
        font-weight: normal;
        box-shadow: 0 9px 18px rgba(0,0,0,0.2);
        text-align: center;
        border-radius: 50px;
        padding: 10px 25px;
        color: white;
        background: #33aba0;
        transition: all 0.2s ease-out 0s;
        border: solid 2px rgba(226,166,49, 1);
    }

    .description {
        margin: 20px 15%;
    }
      
    .gradient {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        bottom: auto;
        margin: auto;
        z-index: -1;
        background: radial-gradient(90px circle at top center, rgba(226,166,49,.6) 30%, rgba(255,255,255,0));
        transition: all 0s ease-out 0s;
        transform: translatex(-140px);
        animation: 10s linear 0s infinite move;
    }
      
    @keyframes move {
        0% {
          transform: translatex(-140px);
        }
        25% {
          transform: translatex(140px);
          opacity: 0.3;
        }
        50% {
          transform: translatex(140px);
          opacity: 1;
          background: radial-gradient(90px circle at bottom center, rgba(238,88,63,.5) 30%, rgba(255,255,255,0));
        }
        75% {
          transform: translatex(-140px);
          opacity: 0.3;
        }
        100% {
          opacity: 1;
          transform: translatex(-140px);
          background: radial-gradient(90px circle at top center, rgba(238,88,63,.5) 30%, rgba(255,255,255,0));
        }
    }

`;

const HeroContents = (props) => {
    const results = useStaticQuery(graphql`
        {
            allFile {
                nodes {
                    url
                    childImageSharp {
                        fluid(quality: 90, maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                    id
                }
            }
        }
    `);

    const { allFile } = results;

    function handleClickCallToAction() {
        window.open('https://www.vagaro.com/didiandsmilingjohnsbarbershop','_blank');
    }

    const heroImageId = 'e48fd9b5-1c45-523f-b448-b7a0562fa447';
    let heroImageData = [];

    allFile.nodes.some((fileData) => {
        if (fileData.id === heroImageId) {
            heroImageData = fileData;
        }
    });
    
    const imageData = heroImageData?.childImageSharp?.fluid;
    const logoImageData = {
        loading: 'eager',
        width: 400
    };
    
    return (
        <StyleWrapper>
            <BackgroundImage
                Tag="section"
                className="dangerzone"
                fluid={imageData}
                backgroundColor={`#040e18`}
            >
                <div className="hero-contents-container">
                    <div className="hero-contents">
                        <StaticImage 
                            {...logoImageData}
                            src="../../images/logo_banner.png" 
                            alt="DiDi and Smiling John's Barber and Beauty Shop Logo" 
                        />
                    
                        <span className="description">
                            Our award winning local business welcomes everyone!
                        </span>
                        
                        <button onClick={handleClickCallToAction}>
                            <span className="gradient"></span>
                            Book Now
                        </button>
                    </div>
                </div>
            </BackgroundImage>
        </StyleWrapper>
    );
};

export default HeroContents;
// import * as React from 'react';
// import styled from 'styled-components';
// import { StaticImage } from 'gatsby-plugin-image';
// import BackgroundImage from 'gatsby-background-image';


// const StyleWrapper = styled.div`
//     padding: 4em;


//     // background: rgba( 255, 255, 255, 0.40 );
//     // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
//     // backdrop-filter: blur( 15.5px );
//     // border-radius: 10px;
//     // border: 1px solid rgba( 255, 255, 255, 0.18 );

//     padding: 4em;
//     background: rgba( 255,255,255,0.20 );
//     box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
//     backdrop-filter: blur( 20.5px );

// `;

// const HeroContents = (props) => {
//     function handleClickCallToAction() {
//         window.open('https://www.vagaro.com/didiandsmilingjohnsbarbershop','_blank');
//     }
    
//     return (
//         <StyleWrapper>
//             {/* <StaticImage 
//                 src="../../images/logo_bbs_blacktxt.png" 
//                 alt="DiDi Logo" 
//                 placeholder="blurred"
                
//                 width={700}
//             />

//             <button className="btn btn-success" 
//                 onClick={handleClickCallToAction}>
//                 SCHEDULE APPOINTMENT
//             </button> */}

//             <BackgroundImage
//                 Tag="section"
//                 className={className}
//                 fluid={imageData}
//                 backgroundColor={`#040e18`}
//             >
//                 <h2>gatsby-background-image</h2>
//             </BackgroundImage>

//         </StyleWrapper>
//     );
// };

// export default HeroContents;