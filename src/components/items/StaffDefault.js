import React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    background: rgba(255,255,255,0.7);
    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    justify-content: center;
    text-align: center;
    padding: 20px;
    min-width: 300px;

    .heading {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 50px;
    }

    .body {
        font-size: 1.15rem;
        ul {
            list-style-type: none;
        }
    }
`;

const StaffDefault = (props) => { 
    
    return (
        <StyleWrapper>
            <div className="heading">
                ◄ Stylists  |  Barbers ►
            </div>
            
            
            <div className="body">
                <section>
                    <strong>Hours of Operation</strong>
                    <ul>
                        <li>Mon: Closed</li>
                        <li>Tues–Fri: 9am–7pm</li>
                        <li>Sat: 9AM–3PM</li>
                    </ul>
                </section>
            </div>
        </StyleWrapper>
    );
}

export default StaffDefault;