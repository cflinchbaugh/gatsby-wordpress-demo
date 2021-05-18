import React, { 
    useState
} from 'react';
import styled, { keyframes } from 'styled-components';
import { 
    accentDefault, 
    accentLight,
    accentDark,
} from '../../colors';
import Shimmer from '../Shimmer';
import AboutCard from '../items/AboutCard';

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

    .tabs-wrapper button,
    .tab-contents {
        background: rgba(255,255,255,0.9);
        box-shadow: 0 8px 20px 0 rgb(31 38 135 / 20%);
        backdrop-filter: blur(4px);

        // border-radius: 10px;
        // border: 1px solid rgba(255, 255, 255, 0.18);
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

                &:hover {
                    cursor: not-allowed;
                }
            }
            button.inactive {
                background: ${accentDefault};

                &:hover {
                    background: ${accentDark};
                }
            }
        }
    }

    .fade-in {
        animation-name: ${fadeIn};
        animation-duration: 1s;
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
        margin: 30vh auto;
        padding: 0;

        .tabs-wrapper {
            .tab-buttons {
                width: 50%;
            }
        }

    }

    @media (min-width: 1024px) {
        .tab-contents {
            flex-direction: row;
        }
    }

`;

const About = (props) => {
    const [activeTab, setActiveTab] = useState('who');

    const handleClickTabWho = () => {
        setActiveTab('who');
    }
    const handleClickTabWhat = () => {
        setActiveTab('what');
    }

    const awardWinning = {
            contents: 'Downtown First award for Outstanding Small Business in 2015. “Susquehanna Style’s” Best Barber Shop in York every year since 2014 with no intention of stopping!',
            key: 'Award Winning',
            title: 'Award Winning'
        },
        local = {
            contents: 'We proudly serve our diverse community and maintain a safe environment of equality, inclusion, and respect for all people.',
            key: 'Local',
            title: 'Local'
        },
        principled = {
            contents: 'Partner of Davines, striving to do the best for the world through beauty, ethics, and sustainability.',
            key: 'Principled',
            title: 'Principled'
        },
        professional = {
            contents: 'Our services include traditional and modern haircuts, coloring, balayage, precision scissor cuts, and much, much more.',
            key: 'Professional Styling',
            title: 'Professional Styling'
        },
        wedding = {
            contents: 'We want to help make your special day the best that it can be! We accomodate wedding parties and are available for on-site Wedding Hair',
            key: 'Wedding Services',
            title: 'Wedding Services'
        },
        shaves = {
            contents: 'From trims to straight razor, we’ve got you covered.',
            key: 'Professional Shaves',
            title: 'Professional Shaves'
        }


    const tabContents = (activeTab === 'who') ? ([
                <AboutCard {...awardWinning} />,
                <AboutCard {...local} />,
                <AboutCard {...principled} />
            ]) : ([
                <AboutCard {...professional} />,
                <AboutCard {...wedding} />,
                <AboutCard {...shaves} />
            ]
        )

    const whoTabData = {
            className: activeTab === 'who' ? 'active' : 'inactive',
            id: 'who',
            onClick: handleClickTabWho
        },
        whatTabData = {
            className: activeTab === 'what' ? 'active' : 'inactive',
            id: 'what',
            onClick: handleClickTabWhat
        };

    return (
        <StyleWrapper>
            <div className="tabs-wrapper">
                <div className="tab-buttons">
                    <button {...whoTabData}>
                        <Shimmer />
                        Who We Are
                    </button>
                    <button {...whatTabData}>
                        <Shimmer />
                        What We Do
                    </button>
                    
                    <span className={`indicator ${activeTab}`}></span>
                    <span className="indicator-track"></span>
                </div>
            </div>

            <div className="tab-contents">
                {tabContents}
            </div>
        </StyleWrapper>
    );
};

export default About;