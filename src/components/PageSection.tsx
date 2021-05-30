import React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    padding: 4em;
    background: #009688;
`;

interface PageSectionInterface {
    children: React.ReactNode
};

const PageSection = (props:PageSectionInterface) => {
    return (
        <StyleWrapper>
            {props.children}
        </StyleWrapper>
    );
};

export default PageSection;