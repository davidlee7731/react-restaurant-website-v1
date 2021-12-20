import React, { useState, useEffect } from 'react';
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
  return <img src={cart} style={{ height: 45, width: 45 }} />
}

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [cartItems, setCartItems] = useState(true)
  const [rawCartItems, setRawCartItems] = useState({});

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const handleOpenCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
    // console.log(rawCartItems)
    fetch('http://localhost:3002/api/checkout', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(rawCartItems) })
      .then(res => res.json())
      .then(data => window.location = data.url)
      .catch(err => {
        console.log('hi')
        console.error(err.error)
      })

  }
  const handleCloseCheckout = () => setShowCheckout(false);


  useEffect(() => {
    fetch('http://localhost:3002/api/cart')
      .then(res => res.json())
      .then(data => {
        console.log('useEffect', data)
        // setCartItems(Object.values(data));
        console.log('rawCartItems in useEffect', rawCartItems)
        setTimeout(500, () => console.log('waited 500'))
        setCartItems(!cartItems)
        setRawCartItems(data);
      })
  }, [cartItems])
  // const cartContents = () => {
  //   return fetch('http://localhost:3002/api/cart')
  //   .then(res => res.json())
  //   .then(data => data)
  // }
  // console.log(cartContents())
  return (
    <Router>
      <GlobalStyle />
      <Splash />
      <Products heading='Choose your favorite' data={productData} modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} cartItems={cartItems} setCartItems={setCartItems} />
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
        <Modal.Body>{Object.values(rawCartItems).map(({ name, price }, i) => <div key={i} style={{ 'marginLeft': '50px', }}>1x {name}<span style={{ 'marginLeft': '150px', }}>{(price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></div>)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOpenCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      {/* checkout modal below*/}
      <Modal show={showCheckout} onHide={handleCloseCheckout} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header >
          <Modal.Title>Redirecting to Stripe Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please do not press the Back button of your browser</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseCheckout}>
            Close
          </Button> */}
          {/* <Button variant="primary" onClick={handleCloseCart}>
            Checkout
          </Button> */}
        </Modal.Footer>
      </Modal>

      <Footer />
      <Fab icon={<CartIcon />} mainButtonStyles={{
        backgroundColor: '#e31837', width: '100px', height: '100px'
      }} onClick={handleShowCart}> </Fab>

    </Router>
  );
}

export default App;
