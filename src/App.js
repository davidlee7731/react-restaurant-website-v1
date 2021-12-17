import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Splash from './components/Splash';
import Products from './components/Products';
import { productData, productDataTwo } from './components/Products/data';
import Feature from './components/Feature';
import Footer from './components/Footer';
import { Modal } from './components/Modal/Modal'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <Router>
      <GlobalStyle />
      <Splash />
      <Products heading='Choose your favorite' data={productData} modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
      <Container>
        <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
      </Container>
      <Feature />
      <Products heading='Sweet Treats for You' data={productDataTwo} />
      <Footer />
    </Router>
  );
}

export default App;
