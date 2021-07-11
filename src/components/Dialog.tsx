import React, {
    MouseEventHandler,
    useEffect
} from 'react';
import styled from 'styled-components';
import { 
    primaryLight,
    shiro 
} from '../colors';
import Button, {ButtonInterface} from './Button';

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
        opacity: 0%;
        transition: opacity 0.15s;
    }

    .modal-wrapper.inactive {
        .modal {
            display: none;
        }
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
        opacity: 100%;

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
                background: ${primaryLight};
                color: ${shiro};
                box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
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
                background: ${primaryLight};
                padding: 15px 25px;
                border-radius: 0 0 5px 5px;
                font-size: 1.5rem;
                box-shadow: 0 0 32px 0 rgb(31 38 135 / 37%);
            }
        }
    }

    @media(min-width: 768px) {
        .modal-wrapper.active {

            .modal {
                margin: 0 auto;
                max-width: 1200px;

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

interface DialogInterface {
    children: React.ReactNode,
    height: 'dynamic' | 'fixed',
    footer: React.ReactNode,
    handleClickClose?: MouseEventHandler<HTMLButtonElement>,
    header: React.ReactNode,
    show: boolean
}

/**
 * @description Render a dialog modal and overlay, obstructing default page scrolling
 */
function Dialog(props:DialogInterface) {
    const {
        children,
        height = 'dynamic',
        footer,
        handleClickClose = () => {}, // optional, but allows you to close dialog if you want when the user clicks the overlay
        header,
        show
    } = props;

    useEffect(() => {
        //Toggle scrolling of underlying page    
        const overflowStyle = show ? 'hidden' : '';
        const rootHTML = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
        
        rootHTML.style.overflow = overflowStyle;
    }, [
        show
    ]);

    const showClass = show ? 'active' : 'inactive',
        buttonData:ButtonInterface = {
            children: 'X',
            handleClick: handleClickClose,
            type: 'ghost'
        },
        modalContentsMarkup = show ? (
            <div className={`modal ${height}`}>
                <div className="modal-header-wrapper">
                    {header}
                    <Button {...buttonData}/>
                </div>

                <div className="modal-body-wrapper">
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
                <div className="modal-footer-wrapper">
                    {footer}
                </div>
            </div>
        ) : null;

        return (
            <StyleWrapper>
                <div className={`modal-overlay ${showClass}`} role="presentation">
                    {/* Overlay */}
                </div>
                <div className={`modal-wrapper ${showClass}`}
                    role="dialog">
                    {modalContentsMarkup}
                </div>
            </StyleWrapper>
        );
}

export default Dialog;
export type {DialogInterface};