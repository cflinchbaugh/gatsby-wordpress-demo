import React from 'react';
import styled from 'styled-components';
import stylistIcon from '../../images/stylistIcon.svg';
import barberIcon from '../../images/barberIcon.svg';

const StyleWrapper = styled.div`
    background: rgba(255,255,255,0.75);
    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    justify-content: space-between;
    text-align: center;
    padding: 20px;
    min-height: 250px;
    min-width: 300px;

    .staff-section {
        font-size: 2rem;
        font-weight: bold;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;

        .icon {
            max-width: 45px;
            opacity: 0.75;
        }

        .icon-stylists {
            padding-left: 10px;
            transform: scaleX(-1);
        }

        .icon-barbers {
            padding-right: 10px;
        }

        
    }

    

    hr {
        border: solid 1px;
        margin: 0px 15px;
        opacity: 0.25;
    }

    @media (min-width: 768px) {
        min-height: 350px;
    }
        
`;

const StaffDefault = (props) => { 
    
    return (
        <StyleWrapper>
            <div className="staff-section">
                <img src={stylistIcon} className="icon icon-stylists" alt="Stylists Icon"/>
                ◄ Stylists
            </div>

            <hr/>
            
            <div className="staff-section">
                <img src={barberIcon} className="icon icon-barbers" alt="Barbers Icon"/>
                Barbers ►
            </div>
        </StyleWrapper>
    );
}

export default StaffDefault;