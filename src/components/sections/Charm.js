import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px 0;

    img {
        border-radius: 100%;
        padding: 15px;
    }

    @media (min-width:768px) {
        padding: 50px 0;
    }
`;

const Charm = (props) => {
    const commonImageData = {
        height: 300,
        width: 300,
        placeholder: 'tracedSVG'
    };

    return (
        <StyleWrapper>
            <StaticImage 
                {...commonImageData}
                src="../../images/charm-1.jpg" 
                alt="Scissors and plants" 
            />
            <StaticImage 
                {...commonImageData}
                src="../../images/charm-2.jpg" 
                alt="Silver shelves with organized hair treatment" 
            />
            <StaticImage 
                {...commonImageData}
                src="../../images/charm-3.jpg" 
                alt="Hair styling product" 
            />
        </StyleWrapper>
    );
};

export default Charm;