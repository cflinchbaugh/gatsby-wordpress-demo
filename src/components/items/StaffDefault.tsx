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

interface StaffDefaultInterface {

}
const StaffDefault = () => { 
    
    return (
        <StyleWrapper tabIndex={0}>
            <div className="staff-section">
                <img 
                    alt="Stylists Icon"
                    className="icon icon-stylists"
                    src={stylistIcon} 
                />
                ◄ Stylists
            </div>

            <hr/>
            
            <div className="staff-section">
                <img 
                    alt="Barbers Icon"
                    className="icon icon-barbers"
                    src={barberIcon} 
                />
                Barbers ►
            </div>
        </StyleWrapper>
    );
}

export default StaffDefault;
export type {StaffDefaultInterface};