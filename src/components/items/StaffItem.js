import React from 'react';
import styled from 'styled-components';
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
`;

const StaffItem = (props) => {
    const {
        title,
        profileImage
    } = props;

   return (
        <StyleWrapper>
            <div className="foreground header">
                <strong>
                    <span dangerouslySetInnerHTML={{__html: title}} />
                </strong>
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