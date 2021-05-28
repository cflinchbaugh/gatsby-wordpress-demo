import React, { 
    useState
} from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { 
    accentDefault, 
    accentLight,
    accentDark,
} from '../colors';
import Shimmer from './Shimmer';

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
    justify-content: space-around;
    padding: 10vw;
    flex-direction: column;
    text-align: center;

    .fade-in {
        animation-name: ${fadeIn};
        animation-duration: 1s;
    }

    .tabs-wrapper button,
    .tab-contents {
        background: rgba(255,255,255,0.9);
        box-shadow: 0 8px 20px 0 rgb(31 38 135 / 20%);
        backdrop-filter: blur(4px);
    }

    .tabs-wrapper {
        position: relative;

        .indicator {
            position: absolute;
            bottom: 0;
            transition: all 0.5s ease-in-out;
            height: 10px;
            background-color: ${accentLight};
            
            left: 0;
            width: 50%;
            pointer-events: none;
            z-index: 1;
        }

        .indicator-track {
            background: ${accentDefault};
            border-left: solid 2px ${accentLight};
            border-right: solid 2px ${accentLight};
            width: 100%;
            height: 10px;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 0;
        }
    
        .indicator.who {
            left: calc(0% + 2px);
        }
        .indicator.what {
            left: calc(50% - 2px);
        }
    
        .tab-buttons {
            padding-bottom: 10px;
            margin: auto;
            position: relative;
            display: flex;
            justify-content: space-between;

            button {
                border-radius: 5px 5px 0 0;
                border: solid 2px ${accentLight};
                border-bottom: none;
                padding: 5px 10px;
                transition: background 0.15s;
                box-shadow: 0 8px 15px 0 rgb(31 38 135 / 50%);
                overflow: hidden;
            }

            button.active {
                background: ${accentLight};
            }
            button.inactive {
                background: ${accentDefault};

                &:hover {
                    background: ${accentDark};
                }
            }
        }
    }

    .tab-contents {
        display: flex;
        flex-direction: column;
        border: solid 2px ${accentLight};
        box-shadow: 0 8px 15px 0 rgb(31 38 135 / 50%);

        .tab-card:nth-child(1) {
            animation-delay: .0s;
            animation-fill-mode: forwards;
        }
        .tab-card:nth-child(2) {
            animation-delay: .25s;
            animation-fill-mode: forwards;
        }
        .tab-card:nth-child(3) {
            animation-delay: .5s;
            animation-fill-mode: forwards;
        }
    }

    @media only screen and (min-width: 768px) {
        max-width: 1200px;

        .tabs-wrapper {
            .tab-buttons {
                width: 50%;
            }
        }

    }

    @media (min-width: 1024px) {
        max-width: 1600px;

        .tab-contents {
            flex-direction: row;
        }
    }

`;

const Tabs = (props) => {
    const {
        activeTabDefault,
        tabContent,
    } = props;

    const [activeTab, setActiveTab] = useState(activeTabDefault);

    function handleClickTab(id) {
        setActiveTab(id);
    }

    function buildButtonsMarkup() {
        const buttonsMarkup = tabContent.map((itemData) => {
            const buttonData = {
                className: activeTab === itemData.id ? 'active' : 'inactive',
                id: itemData.id,
                key: itemData.id,
                onClick: () => {
                    handleClickTab(itemData.id)
                }
            }
    
            return (
                <button {...buttonData}>
                    <Shimmer />
                    {itemData.tabLabel}
                </button>
            )
        });

        return buttonsMarkup;

    }

    function buildTabContentsMarkup() {
        return tabContent.find((data) => data.id === activeTab).content;
    }

    const buttonsMarkup = buildButtonsMarkup();
    const tabContentsMarkup = buildTabContentsMarkup();

    return (
        <StyleWrapper>
            <div className="tabs-wrapper">
                <div className="tab-buttons">
                    {buttonsMarkup}
                    
                    <span className={`indicator ${activeTab}`}></span>
                    <span className="indicator-track"></span>
                </div>
            </div>

            <div className="tab-contents">
                {tabContentsMarkup}
            </div>
        </StyleWrapper>
    );
};

Tabs.propTypes = {
    tabContent: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            tabLabel: PropTypes.string,
            content: PropTypes.array.isRequired
        })
    )
}
export default Tabs;