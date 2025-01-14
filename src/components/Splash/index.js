import React, { useState } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import {
  SplashContainer,
  SplashContent,
  SplashItems,
  SplashH1,
  SplashP,
  SplashBtn
} from './SplashElements';

const Splash = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const scroll = () => window.scroll({
    top: 900,
    left: 0,
    behavior: 'smooth'
  })

  return (
    <SplashContainer>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <SplashContent>
        <SplashItems>
          <SplashH1>Order Pizza Now</SplashH1>
          <SplashP>Ready in 30 Minutes</SplashP>
          <SplashBtn onClick={scroll}>Place Order</SplashBtn>
        </SplashItems>
      </SplashContent>
    </SplashContainer>
  );
};

export default Splash;
