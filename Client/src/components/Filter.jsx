import React, { useState } from "react";
import { styled } from "styled-components";
import { CurrencyRupee } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  brand,
  gender,
  price,
  type,
  sizeAvailable,
  colourAvailable,
} from "../utils/constant";
import MultiSelectFilter from "./MultiSelectFilter";

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

const OptionContainer = styled.div`
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

  const [filter, setFilter] = useState({
    brand: [],
    gender: [],
    cost: 0,
    type: [],
    colour: [],
    size: [],
  });

  console.log(filter);

  const handleFilter = (event) => {
    if (event.target.name === "cost") {
      setFilter({
        ...filter,
        [event.target.name]: parseInt(event.target.value),
      });
      return;
    }

    if (event.target.checked) {
      setFilter({
        ...filter,
        [event.target.name]: [...filter[event.target.name], event.target.value],
      });
    } else {
      const arr = filter[event.target.name].filter(
        (val) => val != event.target.value
      );
      setFilter({ ...filter, [event.target.name]: arr });
    }
  };

  return (
    <Wrapper component={component}>
      {/* Brand: */}
      <OptionContainer>
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
      </OptionContainer>

      {/* Gender: */}
      <OptionContainer>
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
      </OptionContainer>

      {/* Price: */}
      <OptionContainer>
        <Header> Cost: </Header>
        {price.map((val, index) => (
          <Label key={index}>
            <Checkbox
              name="cost"
              value={val}
              type="radio"
              onClick={handleFilter}
            />
            <CostWrapper>
              <CurrencyRupee style={{ transform: "scale(0.7)" }} /> under {val}
            </CostWrapper>
          </Label>
        ))}
      </OptionContainer>

      {/* Type: */}
      <OptionContainer>
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
      </OptionContainer>

      {/* Colour: */}
      <MultiSelectFilter
        heading="Colour"
        filter={filter}
        setFilter={setFilter}
      />

      {/* Size */}
      <MultiSelectFilter heading="Size" filter={filter} setFilter={setFilter} />

      {width > 1024 && (
        <ButtonWrapper>
          <ApplyButton>Apply</ApplyButton>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default Filter;
