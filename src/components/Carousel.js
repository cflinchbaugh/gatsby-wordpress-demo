import React, {
    useRef,
} from 'react';
import { useState, useEffect } from 'preact/hooks';
import PropTypes from 'prop-types';
import useIntersection from './useIntersection';
import CarouselPresentation from './CarouselPresentation';

function Carousel(props) {
    const {
        defaultItemIdx = 0,
        items = [],
    } = props;

    const [isOnScreen, setIsOnScreen] = useState(false);
    const [activeItem, setActiveItem] = useState(defaultItemIdx);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [transformValue, setTransformValue] = useState(0);
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

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
    }

    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }

    function handleTouchMove(e) {
        const transformValue = clamp(((e.targetTouches[0].clientX - touchStart) / 10), -15, 15);

        setTransformValue(transformValue);
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 150) {
            //swiped left
            if (activeItem !== items.length -1) {
                handleClickNext();
            }
        } else if (touchStart - touchEnd < -150) {
            //swiped right
            if (activeItem !== 0) {
                handleClickPrev();
            }
        }

        setTransformValue(0);
    }

    function handleClickHome() {
        setActiveItem(defaultItemIdx);
    }

    const carouselPresentationData = {
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
        transformValue
    }

    return (
        <CarouselPresentation {...carouselPresentationData} />
    );
}

Carousel.propTypes = {
    defaultItemIdx: PropTypes.number,
    items: PropTypes.array
};

export default Carousel;