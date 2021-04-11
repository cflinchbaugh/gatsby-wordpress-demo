import * as React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    padding: 4em;
    background: #009688;
`;

const PageSection = (props) => {
    return (
        <StyleWrapper>
            {props.children}
        </StyleWrapper>
    );
};

export default PageSection;