import React, { 
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px 10px;
    flex-direction: column;
    text-align: center;

    .tab-buttons {
        button {
            padding: 0 15px;
        }
    }

    .tab-card {
        display: flex;
        flex: 1;
        border: solid 1px;
        flex-direction: column;
        padding: 20px;
        text-align: center;
        margin: 10px;
    }

    .tab-contents {
        display: flex;
        flex-direction: column;
    }

    @media only screen and (min-width: 768px) {
        padding: 10vh 10vw;
        
        .tab-contents{
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

    const tabContents = (activeTab === 'who') ? (
            <div className="tab-contents">
                <div className="tab-card">
                    <strong>Award Winning</strong>
                    <div>
                        Downtown First award for Outstanding Small Business in 2015. “Susquehanna Style’s” Best Barber Shop in York every year since 2014 with no intention of stopping!
                    </div>
                </div>

                <div className="tab-card">
                    <strong>Communal</strong>
                    <div>
                        We proudly serve our diverse community and maintain a safe environment of equality, inclusion, and respect for all people.
                    </div>
                </div>

                <div className="tab-card">
                    <strong>Principled</strong>
                    <div>
                        Partner of Davines, striving to do the best for the world through beauty, ethics, and sustainability.
                    </div>
                </div>
            </div>
        ) : (
            <div className="tab-contents">
                <div className="tab-card">
                    <strong>Professional Styling</strong>
                    <div>
                        Our services include traditional and modern haircuts, coloring, balayage, precision scissor cuts, and much, much more.
                    </div>
                </div>

                <div className="tab-card">
                    <strong>Wedding Services</strong>
                    <div>
                        We want to help make your special day the best that it can be! We accomodate wedding parties and are available for on-site Wedding Hair
                    </div>
                </div>

                <div className="tab-card">
                    <strong>Professional Shaves</strong>
                    <div>
                        From trims to straight razor, we’ve got you covered.
                    </div>
                </div>
            </div>
        )

    const whoTabData = {
            id: 'who',
            onClick: handleClickTabWho
        },
        whatTabData = {
            id: 'what',
            onClick: handleClickTabWhat
        };

    return (
        <StyleWrapper>
            <div className="tab-buttons">
                <button {...whoTabData}>
                    Who We Are
                </button>
                <button {...whatTabData}>
                    What We Do
                </button>
            </div>

            {tabContents}
            
        </StyleWrapper>
    );
};

export default About;