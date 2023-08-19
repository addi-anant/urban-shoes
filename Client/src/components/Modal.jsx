import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  return (
    <React.Fragment>
      {createPortal(children, document.getElementById("modal"))}
    </React.Fragment>
  );
};

export default Modal;
