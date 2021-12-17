import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Splash from './components/Splash';
import Products from './components/Products';
import { productData, productDataTwo } from './components/Products/data';
import Feature from './components/Feature';
import Footer from './components/Footer';
import styled from 'styled-components';
import { Fab, Action } from 'react-tiny-fab';
import cart from "./assets/cart.svg";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
function CartIcon() {
  return <img src={cart}  style={{ height: 32, width: 32 }}/>
}

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const cartContents = () => {
    return fetch('http://localhost:3002/api/cart')
    .then(res => res.json())
    .then(data => data)
  }
 console.log(cartContents())
  return (
    <Router>
      <GlobalStyle />
      <Splash />
      <Products heading='Choose your favorite' data={productData} modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
      {/* <Container> */}
        {/* <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} /> */}
      {/* </Container> */}
      <Feature />
      <Products heading='Sweet Treats for You' data={productDataTwo} />
      <Modal show={showCart} onHide={handleCloseCart} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header >
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{typeof cartContents()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseCart}>
            Checkout
          </Button> 
        </Modal.Footer>
      </Modal>
      <Footer />
      <Fab icon={<CartIcon/>} mainButtonStyles={{backgroundColor:'#e31837'}} onClick={handleShowCart}> </Fab>

    </Router>
  );
}

export default App;
