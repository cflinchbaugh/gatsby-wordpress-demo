import React, {
    useEffect,
    useRef,
    useState
} from 'react';
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

    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 150) {
            //swiped left
            handleClickPrev(); 
        } else if (touchStart - touchEnd < -150) {
            //swiped right

            handleClickNext(); 
        }
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