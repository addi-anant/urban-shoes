import React from "react";
import { useTimeout } from "../hooks/useTimeout";
import { styled } from "styled-components";
import { Cancel, Clear } from "@mui/icons-material";

const Wrapper = styled.div`
  padding: 25px 30px;
  position: relative;
  background-color: white;
  width: max-content;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Text = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

const Close = styled.button`
  top: 0px;
  right: 0px;
  position: absolute;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

export const Toast = (props) => {
  useTimeout(props.close, 5000);

  return (
    <Wrapper>
      <Text> {props.children} </Text>
      <Close onClick={props.close}>
        <Clear style={{ transform: "scale(0.8)" }} />
      </Close>
    </Wrapper>
  );
};
