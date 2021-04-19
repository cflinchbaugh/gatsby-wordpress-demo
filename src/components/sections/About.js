import * as React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px 10px;
    flex-direction: column;

    .tab-card {
        display: flex;
        flex: 1;
        border: solid 1px;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
        text-align: center;
        margin: 10px;
    }

    @media only screen and (min-width: 728px) {
        flex-direction: row;
        padding: 50px 10px;
    }
`;

const About = (props) => {
    console.log(props);
    return (
        <StyleWrapper>
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
        </StyleWrapper>
    );
};

export default About;