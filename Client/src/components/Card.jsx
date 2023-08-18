import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";

const Wrapper = styled.div``;

const Container = styled.div`
  width: 100%;
  height: max-content;
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const InformationContainer = styled.div`
  padding: 5px;
`;

const Header = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

const Info = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 2px;
  font-family: "Nunito", sans-serif;
`;

const Price = styled.span`
  display: flex;
  font-size: 16px;
  color: #424242;
  font-weight: 600;
  align-items: center;
  padding: 8px 0px 0px 0px;
  font-family: "Nunito", sans-serif;
`;

const Card = React.forwardRef(({ product }, ref) => {
  const CardInfo = (
    <>
      <Link
        to={`/product/${product?._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>
        <Container>
          <ImgContainer>
            <Img alt="product" src={product?.photo[0]} />
          </ImgContainer>

          {/* Product Information */}
          <InformationContainer>
            <Header>{product?.title}</Header>
            <Info>{product.sizeAvailable.length} Size </Info>
            <Info>{product.colourAvailable.length} Colour </Info>
            <Price>
              MRP:
              <CurrencyRupee style={{ transform: "scale(0.7)" }} />
              {product?.cost}
            </Price>
          </InformationContainer>
        </Container>
      </Link>
    </>
  );

  return ref ? (
    <Wrapper ref={ref}>{CardInfo}</Wrapper>
  ) : (
    <Wrapper>{CardInfo}</Wrapper>
  );
});

export default Card;
