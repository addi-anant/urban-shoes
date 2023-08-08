import { createPortal } from "react-dom";
import { styled } from "styled-components";

// const Wrapper = styled.div`
//   transition: all 5s ease-in-out;
// `;

const Modal = ({ children }) => {
  // return <>{createPortal(children, document.body)}</>;
  return (
    // <Wrapper>
    <>{createPortal(children, document.getElementById("modal"))}</>
    // </Wrapper>
  );
};

export default Modal;
