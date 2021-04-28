import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import styled from 'styled-components';

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
        padding: 15px;
    }

    @media(min-width: 768px) {
        
    }
`;

function Carousel(props) {
    const {
        items
    } = props;

    const [activeItem, setActiveItem] = useState(0);
    const activeRef = useRef();
    const inactiveRef = useRef(null);
    const initialRenderCompleteRef = useRef(false);

    useEffect(() => {
        if (initialRenderCompleteRef.current && typeof(activeRef.current) !== 'undefined' && activeRef.current !== null) { //Conditional to avoid scrolling the screen on initial render
            activeRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    }, [
        activeItem
    ]);

    useEffect(() => {
        initialRenderCompleteRef.current = true;
    }, []);

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

            return (
                <div className={`card ${statusClass}`} key={i} ref={statusRef}>
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
        <StyleWrapper>
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