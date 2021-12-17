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
import { Modal as Modall } from '../Modal/Modal'
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const Products = ({ heading, data, modalVisibility, setModalVisibility }) => {
  const [addedItem, setAddedItem] = useState('');
  const handleOnClick = (item) => {
    setAddedItem(item);
    setModalVisibility(prev => !prev);
  }
  return (
    // <>{!modalVisibility ? (
      <ProductsContainer >
        <ProductsHeading>{!modalVisibility ? heading : addedItem}</ProductsHeading>
        <ProductWrapper>
 
          {!modalVisibility ? data.map((product, index) => {
            return (
              <ProductCard key={index}>
                <ProductImg src={product.img} alt={product.alt} />
                <ProductInfo>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDesc>{product.desc}</ProductDesc>
                  <ProductPrice>{product.price}</ProductPrice>
                  <ProductButton onClick={() => handleOnClick(product.name)}>{product.button}</ProductButton>
                </ProductInfo>
              </ProductCard>
            );
          }) : 
          // <Container >
          <Modall modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} addedItem={addedItem} setAddedItem={setAddedItem}/>
        // </Container>
        }

          

        </ProductWrapper>
      </ProductsContainer>
    // ) : null}</>
  );
};

export default Products;
