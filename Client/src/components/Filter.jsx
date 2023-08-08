import React, { useState } from "react";
import { styled } from "styled-components";
import { CurrencyRupee } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  top: 0px;
  width: ${(props) => (props.component === "modal" ? "100%" : "250px")};
  overflow: ${(props) => (props.component === "modal" ? "hidden" : "scroll")};
  position: ${(props) => (props.component === "modal" ? "relative" : "sticky")};
  height: ${(props) =>
    props.component === "modal" ? "max-content" : "calc(100vh)"};
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
`;

const Header = styled.p`
  margin: 0px;
  color: #2a2a2a;
  font-weight: 700;
  padding-left: 2px;
  font-size: 18px;
  font-family: "Nunito", sans-serif;
`;

const Label = styled.label`
  gap: 4px;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-family: "Nunito", sans-serif;
  width: max-content;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CostWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const MultiSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const ColourContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 5px 0px 0px 4px;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
`;

const Colour = styled.span`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: #${(props) => props.colour};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const SizeContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 5px 2px 0px 2px;
  grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
`;

const Size = styled.span`
  height: 50px;
  cursor: pointer;
  outline: 1px solid lightgray;
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

const ButtonWrapper = styled.div`
  left: 0;
  bottom: 0px;
  width: 100%;
  padding: 10px 0px;
  position: sticky;
  background-color: white;
`;

const ApplyButton = styled.div`
  width: 100%;
  display: flex;
  color: white;
  font-size: 18px;
  border-radius: 100px;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-family: "Nunito", sans-serif;
  cursor: pointer;
`;

const Filter = ({ component }) => {
  const { width } = useWindowDimensions();

  const brand = ["Nike", "Adidas", "Reebok", "Puma"];
  const gender = ["Male", "Female", "Unisex"];
  const price = [2000, 4000, 6000, 8000, 10000];
  const type = ["Sneaker", "Sports", "Running", "Formal"];
  const sizeAvailable = [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
  ];

  const colourAvailable = [
    "D5FFE4",
    "EAC696",
    "D8D9DA",
    "61677A",
    "272829",
    "E48586",
  ];

  const [filter, setFilter] = useState({
    brand: "",
    gender: "",
    cost: "",
    type: "",
    colour: [],
    size: [],
  });

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColour, setSelectedColour] = useState(0);

  const handleColour = (index) => {
    setSelectedColour(index);

    let list = filter.colour.filter(
      (colour) => colour === colourAvailable[index - 1]
    );

    if (list.length === 0) {
      list = [...filter.colour, colourAvailable[index - 1]];
    } else {
      list = filter.colour.filter(
        (colour) => colour !== colourAvailable[index - 1]
      );
    }

    setFilter((prev) => ({ ...prev, colour: list }));
  };

  const handleSize = (index) => {
    setSelectedSize(index);

    let list = filter.size.filter((size) => size === sizeAvailable[index - 1]);

    if (list.length === 0) {
      list = [...filter.size, sizeAvailable[index - 1]];
    } else {
      list = filter.size.filter((size) => size !== sizeAvailable[index - 1]);
    }

    setFilter((prev) => ({ ...prev, size: list }));
  };

  const handleFilter = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  return (
    <Wrapper component={component}>
      {/* Brand: */}
      <CheckboxContainer>
        <Header> Brand: </Header>
        {brand.map((val, index) => (
          <Label key={index}>
            <Checkbox
              name="brand"
              value={val}
              type="checkbox"
              onClick={handleFilter}
            />
            {val}
          </Label>
        ))}
      </CheckboxContainer>

      {/* Gender: */}
      <CheckboxContainer>
        <Header> Gender: </Header>
        {gender.map((val, index) => (
          <Label key={index}>
            <Checkbox
              name="gender"
              value={val}
              type="checkbox"
              onClick={handleFilter}
            />
            {val}
          </Label>
        ))}
      </CheckboxContainer>

      {/* Price: */}
      <CheckboxContainer>
        <Header> Cost: </Header>
        {price.map((val, index) => (
          <Label key={index}>
            <Checkbox
              name="cost"
              value={val}
              type="checkbox"
              onClick={handleFilter}
            />
            <CostWrapper>
              <CurrencyRupee style={{ transform: "scale(0.7)" }} /> under {val}
              {/* <CurrencyRupee style={{ transform: "scale(0.7)" }} /> {val} */}
            </CostWrapper>
          </Label>
        ))}
      </CheckboxContainer>

      {/* Type: */}
      <CheckboxContainer>
        <Header> Type: </Header>
        {type.map((val, index) => (
          <Label key={index}>
            <Checkbox
              name="type"
              value={val}
              type="checkbox"
              onClick={handleFilter}
            />
            {val}
          </Label>
        ))}
      </CheckboxContainer>

      {/* Colour: */}
      <MultiSelectWrapper>
        <Header>Colour:</Header>
        <ColourContainer>
          {colourAvailable.map((colour, index) => (
            <Colour
              key={index}
              child={selectedColour}
              colour={colour}
              onClick={() => handleColour(index + 1)}
            />
          ))}
        </ColourContainer>
      </MultiSelectWrapper>

      {/* Size */}
      <MultiSelectWrapper>
        <Header>Select Size:</Header>
        <SizeContainer>
          {sizeAvailable.map((size, index) => (
            <Size
              key={index}
              child={selectedSize}
              size={size}
              onClick={() => handleSize(index + 1)}>
              <SizeInfo>U.K {size}</SizeInfo>
            </Size>
          ))}
        </SizeContainer>
      </MultiSelectWrapper>

      {width > 1024 && (
        <ButtonWrapper>
          <ApplyButton>Apply</ApplyButton>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default Filter;
