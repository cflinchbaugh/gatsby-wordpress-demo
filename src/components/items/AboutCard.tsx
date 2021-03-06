import React, {
    useEffect,
    useState
} from 'react';
import styled, { keyframes } from 'styled-components';
import useIntersection from '../useIntersection';

const fadeIn = keyframes`
    0% {
        transform: translateY(80px);
        opacity: 0;
    }
    75% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const StyleWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 30px;
    text-align: center;
    margin: auto;
    font-size: clamp(1rem, 1.35rem, 1.2rem);
    line-height: 1.2;
    opacity: 0;

    .fade-in {
        animation-name: ${fadeIn};
        animation-duration: 2s;
    }

    @media (min-width: 768px) {
        max-width: 70vw;
        margin: 1.5rem auto;
    }
`;

interface AboutCardInterface {
    contents: React.ReactNode,
    key: string,
    title: string
}

const AboutCard = (props:AboutCardInterface) => { 
    const {
            contents,
            title,
        } = props,
        [isOnScreen, setIsOnScreen] = useState(false),
        [aboutCardRef, entry] = useIntersection({
            threshold: [0, 1.0]
        }),
        appearClass = isOnScreen ? 'fade-in' : '';

    useEffect(() => {
        if (entry.intersectionRatio === 1) {
            setIsOnScreen(true);
        } else if (entry.intersectionRatio === 0) {
            setIsOnScreen(false);
        }
    }, [
        entry
    ]);
    
    return (
        <StyleWrapper className={`tab-card ${appearClass}`} ref={aboutCardRef}>
            <strong>{title}</strong>

            <div>
                {contents}
            </div>
        </StyleWrapper>
    );
}

export default AboutCard;
export type {AboutCardInterface};