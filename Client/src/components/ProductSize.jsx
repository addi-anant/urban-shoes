import React from "react";
import { styled } from "styled-components";

const SizeWrapper = styled.div`
  padding-bottom: 20px;
`;

const SizeContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 5px 0px 0px 4px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const Size = styled.span`
  height: 50px;
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const SizeInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const ProductSize = ({ sizeAvailable, selectedSize, setSelectedSize }) => {
  return (
    <SizeWrapper>
      <Header>Select Size:</Header>
      <SizeContainer>
        {sizeAvailable?.map((size, index) => (
          <Size
            key={index}
            child={selectedSize + 1}
            size={size}
            onClick={() => setSelectedSize(index)}>
            <SizeInfo>U.K {size}</SizeInfo>
          </Size>
        ))}
      </SizeContainer>
    </SizeWrapper>
  );
};

export default ProductSize;
