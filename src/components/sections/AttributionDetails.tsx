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

interface AttributionDetailsInterface {

}

const AttributionDetails = () => {
    const devLink = (
            <a href="https://www.linkedin.com/in/christopher-flinchbaugh/" 
                title="Chris Flinchbaugh"
                target="_blank" 
                rel="noopener noreferrer">
                    Chris Flinchbaugh
            </a>
        ),
        photographerLink = (
            <a href="https://www.kristamaemyers.com/" 
                title="Krista Mae Myers"
                target="_blank" 
                rel="noopener noreferrer">
                    Krista Mae Myers
            </a>
        ),
        freePikLink = (
            <a href="https://www.freepik.com" 
                title="Freepik" 
                target="_blank" 
                rel="noopener noreferrer">
                    Freepik
            </a>
        ),
        flitIconLink = (
            <a href="https://www.flaticon.com/" 
                title="Flaticon" 
                target="_blank" 
                rel="noopener noreferrer">
                    www.flaticon.com
            </a>
        );

    return (
        <StyleWrapper>
            <ul>
                <li>
                    Designed & Developed by {devLink}
                </li>
                <li>
                    Photos by {photographerLink}
                </li>
                <li>
                    Icons made by {freePikLink} from {flitIconLink}
                </li>
            </ul>
        </StyleWrapper>
    );
};

export default AttributionDetails;
export type {AttributionDetailsInterface};