import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
    display: flex;

    img {
        border-radius: 100%;
        padding: 15px;
    }
`;

const Charm = (props) => {
    const commonImageData = {
        height: 200,
        width: 200,
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