import * as React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    
`;

const AttributionDetails = () => {
    const devLink = <a href="https://www.linkedin.com/in/christopher-flinchbaugh/" target="_blank" rel="noopener noreferrer">Chris</a>;
    const freePikLink = <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a>;
    const flitIconLink = <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>;

    return (
        <StyleWrapper>
            <div>
                {`Designed & Developed by ${devLink}`}`
            </div>
            <div>
                {`Icons made by ${freePikLink} from ${flitIconLink}`}
            </div>
        </StyleWrapper>
    );
};

export default AttributionDetails;