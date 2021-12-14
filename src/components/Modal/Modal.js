import React from "react";
import styled from 'styled-components';
import { ProductButton as FinishButton } from '../Products/ProductsElements';

const Modal = ({ modalVisibility, setModalVisibility }) => {
    if (!modalVisibility) {
        return null;
    }
    return <StyledModal>
        <div>Hello Modal</div>
        <FinishButton onClick={() => setModalVisibility(false)}>Done</FinishButton>
    </StyledModal>;
}

const StyledModal = styled.div`
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    transition: 1.1s ease-out;
    box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
    filter: blur(0);
    transform: scale(1);
    opacity: 1;
    visibility: visible;
    `;


export default Modal;