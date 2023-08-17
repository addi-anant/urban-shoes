import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { CurrencyRupee } from "@mui/icons-material";
import MultiSelectFilter from "./MultiSelectFilter";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/filtersAndSearchSlice";
import { brand, gender, price, type } from "../utils/constant";

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

const Filter = ({ component }) => {
  /* State to maintain Filter Information: */
  const [filter, setFilter] = useState({
    brand: [],
    gender: [],
    type: [],
    colour: [],
    size: [],
  });

  const dispatch = useDispatch();
  const handleFilter = (event) => {
    if (event.target.name === "cost") {
      dispatch(
        search({
          [event.target.name]: parseInt(event.target.value),
        })
      );

      return;
    }

    if (event.target.checked) {
      setFilter({
        ...filter,
        [event.target.name]: [...filter[event.target.name], event.target.value],
      });

      dispatch(
        search({
          [event.target.name]: [
            ...filter[event.target.name],
            event.target.value,
          ],
        })
      );
    } else {
      const arr = filter[event.target.name].filter(
        (val) => val != event.target.value
      );

      setFilter({ ...filter, [event.target.name]: arr });

      dispatch(
        search({
          [event.target.name]: arr,
        })
      );
    }
  };

  useEffect(() => {
    setFilter({ ...filtersAndSearch });
  }, []);

  const filtersAndSearch = useSelector((store) => store.filtersAndSearch);

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
              onChange={handleFilter}
              checked={filtersAndSearch?.brand.includes(val)}
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
              onChange={handleFilter}
              checked={filtersAndSearch?.gender.includes(val)}
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
              onChange={handleFilter}
              checked={filtersAndSearch?.cost === val}
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
              onChange={handleFilter}
              checked={filtersAndSearch?.type.includes(val)}
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
    </Wrapper>
  );
};

export default Filter;
