import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import styled from 'styled-components';
import useIntersection from './useIntersection';
import {
    accentDefault,
    primaryDark,
    secondaryDefault
} from '../colors';

const StyleWrapper = styled.div`
    display: flex;
    overflow: hidden;

    .cards-container {
        display: flex;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        margin: auto !important;

        ::-webkit-scrollbar {
            width: 0;  /* Remove scrollbar space */
            background: transparent;  /* Optional: just make scrollbar invisible */
        }
    }

    .card {
        position: relative;
        float: left;
        margin: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex: 0 0 auto;    
        transition: all 0.15s;    
    }

    .prev-active,
    .next-active {
        opacity: 0.75;
    }

    .active {
        opacity: 1;
        border: solid 2px yellow;
    }

    .inactive {
        opacity: 0.5;
    }

    button {
        color: ${accentDefault};
        padding: 15px;
        transition: all 0.15s;
        background: transparent;

        &:hover {
            background: ${primaryDark};
            color: ${secondaryDefault};
        }
    }

    @media(min-width: 768px) {
        
    }
`;

function Carousel(props) {
    const {
        items
    } = props;

    const [activeItem, setActiveItem] = useState(4);
    const cardsContainerRef = useRef();
    const inViewport = useIntersection(cardsContainerRef, '-300px');
    const activeRef = useRef();
    const inactiveRef = useRef(null);

    // Centers the active item when the component enters the viewport
    useEffect(() => {
        if (inViewport && activeRef && activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    }, [
        activeItem,
        inViewport
    ]);

    function handleClickPrev() {
        setActiveItem(prevActiveItem => {
            return prevActiveItem === 0 ? items.length - 1 : prevActiveItem - 1;
        })
    }

    function handleClickNext() {
        setActiveItem(prevActiveItem => {
            return prevActiveItem === items.length - 1 ? 0 : prevActiveItem + 1;
        })
    }

    function handleClickCard(i) {
        setActiveItem(i);
    }

    function buildCards() {
        const cards = items.map((item, i) => {
            const isActive = (i === activeItem),
                statusRef = isActive ? activeRef : inactiveRef;

            let statusClass;
            switch(i) {
                case activeItem - 1:
                    statusClass = 'prev-active';
                    break;
                case activeItem:
                    statusClass = 'active';
                    break;
                case activeItem + 1:
                    statusClass = 'next-active';
                    break;
                default:
                    statusClass = 'inactive';
                    break;
            }

            const cardData = {
                key: i,
                onClick: () => {
                    handleClickCard(i)
                },
                ref: statusRef,
            }

            return (
                <div className={`card ${statusClass}`} {...cardData}>
                    {item}
                </div>
            );
        });

        return cards;
    }

    const cards = buildCards(),
        prevButtonData = {
            onClick: handleClickPrev
        },
        nextButtonData = {
            onClick: handleClickNext
        };

    return (
        <StyleWrapper ref={cardsContainerRef}>
            <button {...prevButtonData}>
                ◄
            </button>

            <div className="cards-container">
                {cards}
            </div>

            <button {...nextButtonData}>
                ►
            </button>
        </StyleWrapper>
    );
}

export default Carousel;