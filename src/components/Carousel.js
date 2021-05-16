import React, {
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
    flex-direction: column;
    justify-content: center;
    flex: 1 0 auto;
    overflow: hidden;
    max-width: 100vw;

    .cards-container {
        display: flex;
        justify-content: center;
        min-height: 55vh;
    }

    .navigation-container {
        display: flex;
        justify-content: space-around;
        max-width: 500px;
        margin: 0 auto;
        min-width: 300px;
    }

    .card {
        position: absolute;
        float: left;
        margin: 20px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        flex: 0 0 auto;    
        transition: all 0.15s;    
    }

    .prev-prev-active {
        filter: blur(5px);
        z-index: 1;
        transform: rotate(-20deg) scale(0.5);
    }

    .prev-active {
        filter: blur(0px);
        z-index: 2;
        transform: rotate(-10deg) scale(0.75);
    }

    .active {
        filter: blur(0px);
        border: solid 2px yellow;
        z-index: 3;
        transform: rotate(0deg) scale(1);
    }

    .next-active {
        filter: blur(0px);
        z-index: 2;
        transform: rotate(10deg) scale(0.75);
    }

    .next-next-active {
        filter: blur(5px);
        z-index: 1;
        transform: rotate(20deg) scale(0.5);
    }

    .inactive {
        display: none;
    }

    @media(min-width: 768px) {
        overflow: hidden;

        .cards-container {
            min-height: 65vh;
        }

        .prev-prev-active,
        .next-next-active {
            opacity: 0.35;
        }

        .prev-active,
        .next-active {
            opacity: 0.5;
        }

        .active {
            opacity: 1;
        }

        .inactive {
            display: none;
        }

        .prev-prev-active {
            left: 0%;
            z-index: 1;
        }
    
        .prev-active {
            left: 15%;
            z-index: 2;
        }
    
        .active {
            border: solid 2px yellow;
            z-index: 3;
        }
    
        .next-active {
            left: auto;
            right: 15%;
            z-index: 2;
        }
    
        .next-next-active {
            left: auto;
            right: 0%;
            z-index: 1;
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
        defaultItemIdx,
        items
    } = props;

    const [activeItem, setActiveItem] = useState(defaultItemIdx);
    const [cardsContainerRef, entry] = useIntersection({
        threshold: [0.05]
    });
    const activeRef = useRef();
    const inactiveRef = useRef(null);

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
                case activeItem - 2:
                    statusClass = 'prev-prev-active';
                    break;
                case activeItem - 1:
                    statusClass = 'prev-active';
                    break;
                case activeItem:
                    statusClass = 'active';
                    break;
                case activeItem + 1:
                    statusClass = 'next-active';
                    break;
                case activeItem + 2:
                    statusClass = 'next-next-active';
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
            disabled: activeItem === 0,
            onClick: handleClickPrev
        },
        homeButtonData = {
            disabled: activeItem === 4,
            onClick: () => {
                setActiveItem(defaultItemIdx);
            }
        },
        nextButtonData = {
            disabled: activeItem === items.length - 1,
            onClick: handleClickNext
        };

    return (
        <StyleWrapper ref={cardsContainerRef} ratio={entry.intersectionRatio}>
            <div className="cards-container">
                {cards}
            </div>

            <div className="navigation-container">
                <button {...prevButtonData}>
                    ◄
                </button>

                <button {...homeButtonData}>
                    Home
                </button>

                <button {...nextButtonData}>
                    ►
                </button>
            </div>
        </StyleWrapper>
    );
}

Carousel.defaultProps = {
    defaultItemIdx: 4
};

export default Carousel;