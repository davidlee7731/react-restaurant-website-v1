import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { ProductButton as FinishButton } from '../Products/ProductsElements';

// const Modal = ({ modalVisibility, setModalVisibility }) => {
//     if (!modalVisibility) {
//         return null;
//     }
//     return <StyledModal>
//         <div>Hello Modal</div>
//         <FinishButton onClick={() => setModalVisibility(false)}>Done</FinishButton>
//     </StyledModal>;
// }

// const StyledModal = styled.div`
//     width: 500px;
//     background: white;
//     border: 1px solid #ccc;
//     transition: 1.1s ease-out;
//     box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
//     filter: blur(0);
//     transform: scale(1);
//     opacity: 1;
//     visibility: visible;
//     `;
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ modalVisibility, setModalVisibility }) => {
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: modalVisibility ? 1 : 0,
        transform: modalVisibility ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setModalVisibility(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && modalVisibility) {
                setModalVisibility(false);
                console.log('I pressed');
            }
        },
        [setModalVisibility, modalVisibility]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
            {modalVisibility ? (
                // <Background onClick={closeModal} ref={modalRef}>hello
                <animated.div style={animation}>
                    <ModalWrapper modalVisibility={modalVisibility}>
                        <ModalImg src={require('./modal.jpg')} alt='camera' />
                        <ModalContent>
                            <h1>Are you ready?</h1>
                            <p>Get exclusive access to our next launch.</p>
                            <button>Join Now</button>
                        </ModalContent>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setModalVisibility(prev => !prev)}
                        />
                    </ModalWrapper>
                </animated.div>
                /* </Background> */
            ) : null}
        </>
    );
};

export default Modal;