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
            background: rgba( 255, 255, 255, 0.25 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            font-size: clamp(1.5rem, 6vw, 4rem);
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
                        Lorem Ipsum
                        
                        <button className="btn btn-success" 
                            onClick={handleClickCallToAction}>
                            SCHEDULE APPOINTMENT
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