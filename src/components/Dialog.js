import * as React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Dialog = (props) => {
    const {
        show
    } = props;

    const markup = !show ? null : (
            <StyleWrapper role="dialog">
                <button onClick={props.handleClickClose}>X</button>
                {props.children}
            </StyleWrapper>
        );

    return markup;
};

export default Dialog;