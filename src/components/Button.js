import React, {
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { accentDark,
    accentLight,
    accentDefault, 
    kuro,
    shiro,
    disabled } from '../colors';

const StyleWrapper = styled.div`
    button {

        position: relative;
        overflow: hidden;

        color: ${kuro};
        box-shadow: 0 8px 15px 0 rgb(31 38 135 / 50%);
        transition: all 0.2s ease-out 0s;
        padding: 5px 15px;
        border-radius: 5px;
        
        
        &:hover:not(:disabled) {
            top: 1px;
        }
    }
    
    .primary {
        background: ${accentDefault};
        border: solid 4px ${accentLight};
        

        &:hover:not(:disabled) {
            background: ${accentDark};
        }
    }

    .ghost {
        color: white;
        border: solid;
        border-radius: 15px;
        backdrop-filter: blur(4px);
        
        
        &:hover:not(:disabled) {
            background: ${accentDark};
        }
    }

    &:disabled {
        background: ${disabled};
        opacity: 0.5;

        &:hover {
            cursor: not-allowed;
        }
    }


    @keyframes move {
        0% {
          transform: translatex(-140px);
        }
        25% {
          transform: translatex(140px);
          opacity: 0.3;
        }
        50% {
          transform: translatex(140px);
          opacity: 1;
          background: radial-gradient(90px circle at bottom center, ${shiro}50 30%, rgba(255,255,255,0));
        }
        75% {
          transform: translatex(-140px);
          opacity: 0.3;
        }
        100% {
          opacity: 1;
          transform: translatex(-140px);
          background: radial-gradient(90px circle at top center, ${shiro}70 30%, rgba(255,255,255,0));
        }
    }

    .gradient {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        bottom: auto;
        margin: auto;
        background: radial-gradient(90px circle at top center, ${shiro}50 30%, rgba(255,255,255,0));
        transition: all 0s ease-out 0s;
        transform: translatex(-140px);
        animation: 10s linear 0s infinite move;
    }

    @media(min-width: 768px) {
       
    }
`;

function Button(props) {
    const {
        children,
        disabled,
        handleClick,
        showGradient,
        type
    } = props;

    const gradientMarkup = (!disabled && showGradient) ? <span className="gradient"></span> : null;

        return (
            <StyleWrapper>
                <button className={type} disabled={disabled} onClick={handleClick}>
                    {gradientMarkup}
                    {children}
                </button>
            </StyleWrapper>
        );
}

Button.defaultProps = {
    disabled: false,
    showGradient: false,
    type: 'primary'
}

Button.propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func.isRequired,
    showGradient: PropTypes.bool,
    type: PropTypes.oneOf([
        'primary',
        'ghost'
    ])
};

export default Button;