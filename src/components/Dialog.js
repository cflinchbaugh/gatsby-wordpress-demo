import React from 'react';
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
                width: 100%;
            }

            .modal-body-wrapper {
                display: flex;
                flex-grow: 1;
                height: 100%;
                height: auto; //Overhflow handlin'
                min-height: 1px;
                min-width: 1px;
                .modal-body {
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                    flex-basis: 100%;
                    height: auto;
                    min-height: 1px; 
                    min-width: 1px;
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

function Dialog(props) {
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
                            <button onClick={props.handleClickClose}>X</button>
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