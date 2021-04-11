import * as React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    padding: 4em;
    background: papayawhip;
    text-align: center;
`;

const Footer = (props) => {
    return (
        <StyleWrapper>
            <div>
                (717) 858-7428
            </div>
            <div>
                Hours of Operation
            </div>
            <div>
                Monday: Closed
            </div>
            <div>
                Tuesday – Friday: 9AM–7PM
            </div>
            <div>
                Saturday: 9AM–3PM
            </div>
            <div>
                *Prices subject to change
            </div>
        </StyleWrapper>
    );
};

export default Footer;