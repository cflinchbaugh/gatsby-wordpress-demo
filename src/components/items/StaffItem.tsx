import React from 'react';
import styled from 'styled-components';
import barberIcon from '../../images/barberIcon.svg';
import stylistIcon from '../../images/stylistIcon.svg';
import { shiro } from '../../colors';

const StyleWrapper = styled.div`
    .profile-image {
        display: flex;
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 45%);

        img {
            transition: all .15s ease-in-out;
        }
        
        img:hover {
            transform: scale(1.15);
            transition: transform .5s;
        }
    }

    .foreground {
        position: absolute;
        z-index: 2;
        
    }

    .header,
    .footer {
        color: ${shiro};
        background-color: rgba(0,0,0,0.65);
        padding: 5px 10px;
    }
    
    .header {
        top: 10px;
        left: 10px;
        border-radius: 10px;
    }
    
    .footer {
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        border-radius: 0 0 5px 5px;
    }

    .icons {
        left: auto;
        right: 10px;
        height: 40px;
        width: 50px;

        .icon-stylists {
            transform: scaleX(-1);
        }

        img {
            filter: invert(100%) sepia(7%) saturate(0%) hue-rotate(308deg) brightness(102%) contrast(102%);
        }
    }
`;

type ProfessionTypes = 'Barber' | 'Stylist';

interface StaffItemInterface {
    employeeData: {
        profession: Array<ProfessionTypes>
    },
    title: string,
    profileImage: React.ReactNode
}

const StaffItem = (props:StaffItemInterface) => {
    const {
            employeeData,
            title,
            profileImage
        } = props,
        professionIcon = employeeData.profession.includes('Barber') ? (
            <img 
                alt="Barbers Icon"
                className="icon icon-barbers"
                src={barberIcon} 
            />
        ) : (
            <img 
                alt="Stylists Icon"
                className="icon icon-stylists"
                src={stylistIcon} 
            />
        );


    return (
        <StyleWrapper>
            <div className="foreground header">
                <strong>
                    {title}
                </strong>
            </div>

            <div className="foreground header icons">
                {professionIcon}
            </div>

            <div className="profile-image">
                {profileImage}
            </div>

            <div className="foreground footer">
                <div>
                    See Details
                </div>
            </div>
        </StyleWrapper>
   )
};

export default StaffItem;
export type { StaffItemInterface };