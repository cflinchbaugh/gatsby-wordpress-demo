import React, {
    useEffect
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
    accentDefault,
    primaryDark,
    primaryDefault,
    primaryLight,
    shiro } from '../colors';

const StyleWrapper = styled.div`
    .modal-overlay {
        display: none;
    }

    .modal-overlay.active {
        background-color: rgba(0,0,0, 0.75);
        bottom: 0;
        display: block;
        left: 0;
        opacity: 0.5;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 10001;
    }

    .modal-wrapper {
        display: none;
    }

    .modal-wrapper.active {
        align-items: center;
        bottom: 5vh;
        display: flex;
        justify-items: center;
        left: 5vw;
        padding: 0;
        position: fixed;
        right: 5vw;
        top: 5vh;
        z-index: 10001;

        .modal {
            background: rgba(255,255,255,0.8);
            box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
            backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            height: 100%;
            max-height: 100%;
            width: 100%;

            .modal-header-wrapper {
                display: flex;
                font-size: 1.25rem;
                justify-content: space-between;
                padding: 10px 20px;

                border-bottom: solid 1px;
                background: ${primaryLight};
                color: ${shiro};
                box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);

                button {
                    box-shadow: 0 8px 12px 0 rgb(31 38 135 / 37%);
                    border: solid 2px ${primaryDefault};
                    background-color: ${accentDefault};
                    transition: all 0.15s;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 40px;

                    &:hover {
                        background-color: ${primaryDark};
                        box-shadow: 0 6px 12px 0 rgb(31 38 135 / 37%);
                    }
                }
            }

            .modal-body-wrapper {
                display: flex;
                flex-grow: 1;
                height: 100%;
                height: auto; //Overhflow handlin'
                min-height: 1px;
                min-width: 1px;
                overflow-y: auto;

                /* width */
                ::-webkit-scrollbar {
                    width: 10px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                
                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #888; 
                    border-radius: 20px;
                }

                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                    background: #555; 
                }

                .modal-body {
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                    flex-basis: 100%;
                    height: auto;
                    min-height: 1px; 
                    min-width: 1px;

                    ol,
                    ul {
                        list-style-position: inside;
                        li {
                            line-height: 2;
                        }
                    }
                }
            }

            .modal-footer-wrapper {
                width: 100%;
            }
        }
    }

    @media(min-width: 768px) {
        .modal-wrapper.active {
            padding: 0 12.5%;

            .modal {
                margin: 0 auto;
                max-width: 900px;

                &.fixed {
                    height: 590px;
                }
                &.dynamic {
                    height: auto;
                }
            }
        }
    }
`;

/**
 * @description Render a dialog modal and overlay, obstructing default page scrolling
 *
 * @param {*} props
 * @returns
 */
function Dialog(props) {
    
    useEffect(() => {
        //Toggle scrolling of underlying page    
        const overflowStyle = props.show ? 'hidden' : '';
        const rootHTML = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
        
        rootHTML.style.overflow = overflowStyle;
    }, [
        props.show
    ]);

    function handleClickClose(e) {
        if (typeof(e.target.className) === 'string' && e.target.className.indexOf('modal-wrapper') >= 0) {
            props.handleClickClose(e);
        }
    }

    const showClass = props.show ? 'active' : '';

        return (
            <StyleWrapper>
                <div className={`modal-overlay ${showClass}`} role="presentation">
                    {/* Overlay */}
                </div>
                <div className={`modal-wrapper ${showClass}`} onClick={handleClickClose} role="dialog">
                    <div className={`modal ${props.height}`}>
                        <div className="modal-header-wrapper">
                            {props.header}
                            <button onClick={props.handleClickClose}>
                                X
                            </button>
                        </div>
                        <div className="modal-body-wrapper">
                            <div className="modal-body">
                                {props.children}
                            </div>
                        </div>
                        <div className="modal-footer-wrapper">
                            {props.footer}
                        </div>
                    </div>
                </div>
            </StyleWrapper>
        );
}
Dialog.defaultProps = {
    height: 'dynamic',
    handleClickClose: () => {}, // optional, but allows you to close dialog if you want when the user clicks the overlay
    size: 'default'
};
Dialog.propTypes = {
    children: PropTypes.node,
    height: PropTypes.oneOf([
        'dynamic',
        'fixed'
    ]),
    footer: PropTypes.element,
    handleClickClose: PropTypes.func,
    header: PropTypes.element,
    show: PropTypes.bool.isRequired
};

export default Dialog;