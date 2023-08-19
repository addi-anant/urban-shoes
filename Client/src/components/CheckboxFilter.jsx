import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

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

const CheckboxFilter = ({ title, name, arr, handleFilter }) => {
  const filtersAndSearch = useSelector((store) => store.filtersAndSearch);

  return (
    <OptionContainer>
      <Header> {title}: </Header>
      {arr.map((val, index) => (
        <Label key={index}>
          <Checkbox
            name={name}
            value={val}
            type={name === "cost" ? "radio" : "checkbox"}
            onChange={handleFilter}
            checked={
              name === "cost"
                ? filtersAndSearch?.cost === val
                : name === "gender"
                ? filtersAndSearch?.gender.includes(val)
                : name === "type"
                ? filtersAndSearch?.type.includes(val)
                : filtersAndSearch?.brand.includes(val)
            }
          />

          {val}
        </Label>
      ))}
    </OptionContainer>
  );
};

export default CheckboxFilter;
