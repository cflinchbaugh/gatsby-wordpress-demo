import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useIntersection from './useIntersection';
import Button from './Button';

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 0 auto;
    overflow: hidden;
    max-width: 100vw;
    justify-content: space-evenly;

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

        button {
            box-shadow: 0 6px 10px 0 rgb(31 38 135 / 20%);
            transition: box-shadow 0.3s;
        }
    }

    .navigation-container.lift {
        button {
            box-shadow: 0 8px 15px 0 rgb(31 38 135 / 50%);
        }
    }

    .card {
        position: absolute;
        float: left;
        margin: 20px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        flex: 0 0 auto;    
        transition: all 0.3s;
        box-shadow:  0 6px 10px 0 rgb(31 38 135 / 20%);
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
        border-radius: 5px;
        z-index: 3;
        transform: rotate(0deg) scale(1);
        top: 0px;
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

    .prev-prev-active.lift,
    .next-next-active.lift {
        box-shadow: 0 8px 20px 0 rgb(31 38 135 / 20%);
    }
    
    .prev-active.lift,
    .next-active.lift {
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 50%);
    }

    .active.lift {
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 65%);
        top: 10px;
        opacity: 1;
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
        .next-active,
        .active {
            opacity: 0.5;
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

    }
`;

function Carousel(props) {
    const {
        defaultItemIdx,
        items
    } = props;

    const [isOnScreen, setIsOnScreen] = useState(false);
    const [activeItem, setActiveItem] = useState(defaultItemIdx);
    const [cardsContainerRef, entry] = useIntersection({
        threshold: [0, 1.0]
    });
    const activeRef = useRef();
    const inactiveRef = useRef(null);

    useEffect(() => {
        if (entry.intersectionRatio === 1) {
            setIsOnScreen(true);
        } else if (entry.intersectionRatio === 0) {
            setIsOnScreen(false);
        }
    }, [
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
                },
                liftClass = isOnScreen ? 'lift' : '';

            return (
                <div className={`card ${statusClass} ${liftClass}`} {...cardData}>
                    {item}
                </div>
            );
        });

        return cards;
    }

    const cards = buildCards(),
        prevButtonData = {
            disabled: activeItem === 0,
            handleClick: handleClickPrev,
            showShimmer: activeItem !== 0
        },
        homeButtonData = {
            active: activeItem === defaultItemIdx,
            handleClick: () => {
                setActiveItem(defaultItemIdx);
            }
        },
        nextButtonData = {
            disabled: activeItem === items.length - 1,
            handleClick: handleClickNext,
            showShimmer: activeItem !== items.length - 1
        },
        liftClass = isOnScreen ? 'lift' : '';

    return (
        <StyleWrapper>
            <div className="cards-container" ref={cardsContainerRef} ratio={entry.intersectionRatio}>
                {cards}
            </div>

            <div className={`navigation-container ${liftClass}`}>
                <Button {...prevButtonData}>
                    ◄
                </Button>

                <Button {...homeButtonData}>
                    Home
                </Button>

                <Button {...nextButtonData}>
                    ►
                </Button>
            </div>
        </StyleWrapper>
    );
}

Carousel.propTypes = {
    defaultItemIdx: PropTypes.number
};

export default Carousel;