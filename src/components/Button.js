import React, {
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Shimmer from './Shimmer';
import { accentDark,
    accentLight,
    accentDefault, 
    kuro,
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
    
    .primary.active:disabled {
        background: ${accentLight};
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

    .primary,
    .ghost {
        &:disabled {
            background: ${disabled};
            opacity: 0.5;
    
            &:hover {
                cursor: not-allowed;
            }
        }
    }
    
`;

function Button(props) {
    const {
        active,
        children,
        disabled,
        handleClick,
        showShimmer,
        type
    } = props;

    const shimmerMarkup = (!disabled && showShimmer) ? <Shimmer /> : null,
        activeClass = active ? 'active' : '',
        disabledAttribute = disabled || active;

    return (
        <StyleWrapper>
            <button className={`${type} ${activeClass}`} disabled={disabledAttribute} onClick={handleClick}>
                {shimmerMarkup}
                {children}
            </button>
        </StyleWrapper>
    );
}

Button.defaultProps = {
    active: false,
    disabled: false,
    showShimmer: false,
    type: 'primary'
}

Button.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    handleClick: PropTypes.func.isRequired,
    showShimmer: PropTypes.bool,
    type: PropTypes.oneOf([
        'primary',
        'ghost'
    ])
};

export default Button;