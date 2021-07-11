import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    max-width: 1600px;
    margin: auto;

    img {
        border-radius: 100%;
        padding: 15px;
    }

    @media (min-width:768px) {
        padding: 50px 0;
    }
`;

interface CharmInterface {

}
const Charm = () => {
    const commonImageData = {
        height: 300,
        width: 300,
    };

    return (
        <StyleWrapper>
            <StaticImage 
                {...commonImageData}
                alt="Scissors and plants"
                placeholder="tracedSVG" 
                src="../../images/charm-1.jpg" 
            />
            <StaticImage 
                {...commonImageData}
                alt="Silver shelves with organized hair treatment" 
                placeholder="tracedSVG" 
                src="../../images/charm-2.jpg"
            />
            <StaticImage 
                {...commonImageData}
                alt="Hair styling product" 
                placeholder="tracedSVG" 
                src="../../images/charm-3.jpg" 
            />
        </StyleWrapper>
    );
};

export default Charm;
export type {CharmInterface};