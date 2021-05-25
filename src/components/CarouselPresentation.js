import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
        position: relative;
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
            position: relative;
            overflow: hidden;
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

    .current-active {
        filter: blur(3px);
        backdrop-filter: blur(4px);
        border: solid 2px yellow;
        border-radius: 5px;
        z-index: 3;
        transform: rotate(0deg) scale(1);
        top: 10px;
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

    .current-active.lift {
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 65%);
        top: 0;
        opacity: 1;
        filter: blur(0px);
    }

    .inactive {
        display: none;
    }

    @media(min-width: 768px) {
        overflow: hidden;

        .cards-container {
            min-height: 65vh;
        }

        .card {
            transition: all 0.5s ease-out;
        }

        .prev-prev-active,
        .next-next-active {
            opacity: 0.35;
        }

        .prev-active,
        .next-active,
        .current-active {
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
    
        .current-active {
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

function CarouselPresentation(props) {
    const {
        activeItem,
        activeRef,
        cardsContainerRef,
        defaultItemIdx,
        entry,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleClickCard,
        handleClickHome,
        handleClickNext,
        handleClickPrev,
        inactiveRef,
        isOnScreen,
        items,
      
    } = props;

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
                    statusClass = 'current-active';
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

            const activeCardData = isActive ? {
                    onTouchStart: handleTouchStart,
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd,
                } : {},
                cardData = {
                    ...activeCardData,
                    key: item.key,
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
            handleClick: handleClickHome
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

CarouselPresentation.propTypes = {
    activeItem: PropTypes.number.isRequired,
    activeRef: PropTypes.oneOfType([
        PropTypes.func, 
        // PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    cardsContainerRef: PropTypes.oneOfType([
        PropTypes.func, 
        // PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    handleTouchStart: PropTypes.func.isRequired,
    handleTouchMove: PropTypes.func.isRequired,
    handleTouchEnd: PropTypes.func.isRequired,
    handleClickCard: PropTypes.func.isRequired,
    handleClickHome: PropTypes.func.isRequired,
    handleClickNext: PropTypes.func.isRequired,
    inactiveRef: PropTypes.oneOfType([
        PropTypes.func, 
        // PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    isOnScreen: PropTypes.bool.isRequired,
    items:  PropTypes.array.isRequired,
    defaultItemIdx: PropTypes.number,
    handleClickPrev: PropTypes.func.isRequired,
    entry: PropTypes.object,
};

export default CarouselPresentation;