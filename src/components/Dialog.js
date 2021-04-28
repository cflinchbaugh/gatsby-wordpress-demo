import React, {
    useEffect
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyleWrapper = styled.div`
    .modal-overlay {
        display: none;
    }

    .modal-overlay.active {
        background-color: rgba(0,0,0, 0.75);
        bottom: 0;
        display: block;
        left: 0;
        opacity: 0.7;
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
            background-color: #fff;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            height: 100%;
            max-height: 100%;
            width: 100%;

            .modal-header-wrapper {
                display: flex;
                justify-content: space-between;
                padding: 20px;
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

const rootHTML = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
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
                            <button onClick={props.handleClickClose}>Close</button>
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