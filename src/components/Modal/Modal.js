import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import pic from './pepperoni.jpg'
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
  width: 960px;
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
  padding: 30px 40px;   
  justify-content: top;
  line-height: 1.5;
  color: #141414;
  label {
    align-items: left;
    padding: 0px 10px
  }
  input {
      margin-right: 10px;   
  }
  p {
    margin-left: 10px;
    margin-bottom: 1rem;
  }
  button {
    margin-top: 1rem;
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
const toppings = [{ name: 'Extra Cheese', price: 100 }, { name: 'Pepperoni', price: 200 }, { name: 'Pineapple', price: 100 }, { name: 'Black Olives', price: 100 }, { name: 'Banana Peppers', price: 50 }];

export const Modal = ({ modalVisibility, setModalVisibility, addedItem, setAddedItem, cartItems, setCartItems }) => {
    const modalRef = useRef();
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
    );
    const [total, setTotal] = useState(0);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);

        setCheckedState(updatedCheckedState);
        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + toppings[index].price;
                }
                return sum;
            }, 0);

        setTotal(totalPrice);
    };


    // const animation = useSpring({
    //     config: {
    //         duration: 250
    //     },
    //     opacity: modalVisibility ? 1 : 0,
    //     transform: modalVisibility ? `translateY(0%)` : `translateY(-100%)`
    // });

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

    const handleAddToCartClick = ({ name, price }) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const body = JSON.stringify({
            name,
            price,
        })
        fetch('http://localhost:3002/api/cart', { method: 'POST', headers, body })
            .then(res => res.json())
            .then(data => console.log(data))
        setModalVisibility(false)
        setCartItems(!cartItems)
        setAddedItem('')
    }
    return (
        <>
            {modalVisibility ? (
                // <Background onClick={closeModal} ref={modalRef}>
                // <animated.div style={animation}>
                <ModalWrapper modalVisibility={modalVisibility}>
                    <ModalImg src={pic} alt='pepperoni' />
                    <ModalContent>
                        <h1>Add your toppings</h1>
                        <p>Choose as many as you want!</p>
                        {toppings.map(({ name, price }, i) => (
                            <label style={{ columnCount: 1 }}>
                                <input type="checkbox" id={i} name={name} value={name} checked={checkedState[i]} onChange={() => handleOnChange(i)} />
                                {name} <span>{(price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                            </label>
                        ))}
                        <FinishButton onClick={() => handleAddToCartClick(addedItem)}>Add to Cart</FinishButton>
                    </ModalContent>
                    <CloseModalButton
                        aria-label='Close modal'
                        onClick={() => setModalVisibility(prev => !prev)}
                    />
                </ModalWrapper>
                // </animated.div>
                // </Background> 
            ) : null}
        </>
    );
};

export default Modal;