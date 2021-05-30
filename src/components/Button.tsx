import React, {
} from 'react';
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
        border: solid 1px;
        border-radius: 15px;
        backdrop-filter: blur(4px);

        &:hover:not(:disabled) {
            background: ${accentDark};
        }
    }

    .kuro {
        color: ${kuro};
        border: solid 1px;
        border-radius: 15px;
        backdrop-filter: blur(4px);

        &:hover:not(:disabled) {
            background: ${accentDark};
        }
    }

    .ghost,
    .kuro, 
    .primary {
        &:disabled {
            background: ${disabled};
            opacity: 0.5;
    
            &:hover {
                cursor: not-allowed;
            }
        }
    }
    
`;

interface ButtonInterface {
    active: boolean,
    children: React.ReactNode,
    disabled: boolean,
    handleClick: Function,
    showShimmer: boolean,
    type: 'ghost' | 'kuro' | 'primary'
}

function Button(props:ButtonInterface) {
    const {
        active = false,
        children,
        disabled = false,
        handleClick,
        showShimmer = false,
        type = 'primary'
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

export default Button;