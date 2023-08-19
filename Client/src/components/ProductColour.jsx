import React from "react";
import { styled } from "styled-components";

const ColorWrapper = styled.div`
  padding-bottom: 20px;
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));

  grid-gap: 20px;
  padding: 5px 0px 0px 4px;
`;

const Color = styled.span`
  width: 35px;
  height: 35px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const ProductColour = ({
  colourAvailable,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <ColorWrapper>
      <Header>Select Colour:</Header>
      <ColorContainer>
        {colourAvailable.map((color, index) => (
          <Color
            key={index}
            child={selectedColor + 1}
            color={color}
            onClick={() => setSelectedColor(index)}
          />
        ))}
      </ColorContainer>
    </ColorWrapper>
  );
};

export default ProductColour;
