import React from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  gap: 10px;
  left: 20px;
  bottom: 20px;
  display: flex;
  position: sticky;
  width: max-content;
  flex-direction: column;
`;

const ToastWrapper = ({ children }) => {
  return (
    <Wrapper>
      {createPortal(
        <Wrapper> {children} </Wrapper>,
        document.getElementById("root")
      )}
    </Wrapper>
  );
};

export default ToastWrapper;
