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
    flex: 1 0 auto;
    overflow: hidden;
    max-width: 100vw;

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

    .active {
        border: solid 2px yellow;
    }

    button {
        display: none;
    }

    @media(min-width: 768px) {
        overflow: hidden;

        .prev-active,
        .next-active {
            opacity: 0.75;
        }

        .active {
            opacity: 1;
        }

        .inactive {
            opacity: 0.5;
        }

        button {
            display: block;
            color: ${accentDefault};
            padding: 15px;
            transition: all 0.15s;
            background: transparent;
    
            &:hover {
                background: ${primaryDark};
                color: ${secondaryDefault};
            }
        }
    }
`;

function Carousel(props) {
    const {
        items
    } = props;

    const [activeItem, setActiveItem] = useState(2);
    const [cardsContainerRef, entry] = useIntersection({
        threshold: [0.05]
    });
    const activeRef = useRef();
    const inactiveRef = useRef(null);

    // Centers the active item when the component enters the viewport
    useEffect(() => {
        if (entry.intersectionRatio && activeRef && activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    }, [
        activeItem,
        entry
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
        <StyleWrapper ref={cardsContainerRef} ratio={entry.intersectionRatio}>
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