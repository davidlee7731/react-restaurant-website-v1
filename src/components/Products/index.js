import React, { useState } from 'react';
import {
  ProductsContainer,
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton
} from './ProductsElements';
// import { Modal } from '../Modal/Modal'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const Products = ({ heading, data, modalVisibility, setModalVisibility }) => {
  // const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <>{!modalVisibility ? (
      <ProductsContainer>
        <ProductsHeading>{heading}</ProductsHeading>
        <ProductWrapper>
          {data.map((product, index) => {
            return (
              <ProductCard key={index}>
                <ProductImg src={product.img} alt={product.alt} />
                <ProductInfo>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDesc>{product.desc}</ProductDesc>
                  <ProductPrice>{product.price}</ProductPrice>
                  <ProductButton onClick={() => setModalVisibility(prev => !prev)}>{product.button}</ProductButton>
                </ProductInfo>
              </ProductCard>
            );
          })}
          {/* <Container>
          <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
        </Container> */}
        </ProductWrapper>
      </ProductsContainer>
    ) : null}
    </>
  );
};

export default Products;
