import React from "react";
import Filter from "./Filter";
import { styled } from "styled-components";
import { Close } from "@mui/icons-material";
import { mobile, mobileXL } from "../utils/responsive";

const FilterWrapper = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;
  overflow-y: scroll;
  -ms-overflow-style: none;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 25px 20px 0px 20px;
`;

const TopWrapper = styled.div`
  top: 0;
  left: 0px;
  width: 100%;
  z-index: 200;
  display: flex;
  position: sticky;
  padding-bottom: 10px;
  align-content: center;
  background-color: white;
  justify-content: space-between;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
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
  cursor: pointer;
  font-size: 18px;
  border-radius: 100px;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-family: "Nunito", sans-serif;
`;

const FilterModal = ({ setOpen }) => {
  return (
    <>
      <FilterWrapper>
        <Container>
          <TopWrapper>
            <Heading>Filters</Heading>
            <Close
              style={{ transform: "scale(1.2)", cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          </TopWrapper>
          <Filter component="modal" />
          <ButtonWrapper>
            <ApplyButton onClick={() => setOpen(false)}>Apply</ApplyButton>
          </ButtonWrapper>
        </Container>
      </FilterWrapper>
    </>
  );
};

export default FilterModal;
