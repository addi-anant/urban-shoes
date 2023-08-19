import React from "react";
import { styled } from "styled-components";
import { CurrencyRupee } from "@mui/icons-material";

const Title = styled.p`
  margin: 0px;
  font-size: 28px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
`;

const TagWrapper = styled.div`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0px;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.span`
  color: #4d4d4d;
  border-radius: 100px;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  background-color: #f5f5f5;
`;

const PriceWrapper = styled.div`
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
  align-items: flex-start;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
  font-family: "Nunito", sans-serif;
`;

const PriceInfoSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const PriceSpan = styled.span`
  color: gray;
  font-size: 18px;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const ProductHeader = ({ title, tag, cost }) => {
  return (
    <>
      <Title>{title}</Title>
      <TagWrapper>
        {tag.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagWrapper>
      <PriceWrapper>
        <PriceContainer>
          <PriceInfoSpan>MRP: </PriceInfoSpan>
          <CurrencyRupee style={{ transform: "scale(0.8)" }} />
          <Price className="price">{cost}</Price>
        </PriceContainer>
        <PriceSpan>(Also includes all applicable duties)</PriceSpan>
      </PriceWrapper>
    </>
  );
};

export default ProductHeader;
