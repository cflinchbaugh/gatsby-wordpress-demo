import React from 'react';
import styled from 'styled-components';
import { shiro } from '../colors';

const StyleWrapper = styled.div`
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

    .shimmer {
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

`;

interface ShimmerInterface {

}

function Shimmer() {
    return (
        <StyleWrapper>
            <span className="shimmer"></span>
        </StyleWrapper>
    );
}

export default Shimmer;
export type {ShimmerInterface};