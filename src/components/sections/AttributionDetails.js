import * as React from 'react';
import styled from 'styled-components';
import { accentDark } from '../../colors';

const StyleWrapper = styled.div`
    margin: 20px;
    min-height: 50vh;

    a:hover {
        color: ${accentDark};
    }

    li {
        margin-bottom: 20px;
    }
`;

const AttributionDetails = () => {
    const devLink = <a href="https://www.linkedin.com/in/christopher-flinchbaugh/" target="_blank" rel="noopener noreferrer">Chris Flinchbaugh</a>;
    const freePikLink = <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a>;
    const flitIconLink = <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>;

    return (
        <StyleWrapper>
            <ul>
                <li>
                    Designed & Developed by {devLink}
                </li>
                <li>
                    Icons made by {freePikLink} from {flitIconLink}
                </li>
            </ul>
        </StyleWrapper>
    );
};

export default AttributionDetails;