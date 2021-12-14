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
import Modal from '../Modal/Modal'

const Products = ({ heading, data }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
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
                <ProductButton onClick={() => setModalVisibility(true)}>{product.button}</ProductButton>
              </ProductInfo>
            </ProductCard>
          );
        })}
        <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility}/>
      </ProductWrapper>
    </ProductsContainer>
  );
};

export default Products;
