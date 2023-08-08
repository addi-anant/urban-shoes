import {
  FavoriteBorder,
  Search,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { css, keyframes, styled } from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const growHorizontal = keyframes`
 0% { height: 100px;  }
 100% { height: 300px;  }
`;

const Container = styled.div`
  width: ${(props) => (props.typing === "true" ? "100%" : "94%")};
  display: flex;
  align-items: ${(props) =>
    props.typing === "true" ? "flex-start" : "center"};
  justify-content: space-between;
  margin: ${(props) => (props.typing === "true" ? "0px" : "10px")};
  height: ${(props) => (props.typing === "true" ? "300px" : "max-content")};
  position: ${(props) => (props.typing === "true" ? "fixed" : "relative")};
  padding-top: ${(props) => (props.typing === "true" ? "10px" : "0px")};
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: white;
  z-index: 10;

  animation-name: ${(props) =>
    props.typing === "true"
      ? css`
          ${growHorizontal}
        `
      : ""};

  animation-duration: ${(props) => (props.typing === "true" ? "1s" : "")};
`;

const Img = styled.img`
  height: 40px;
  width: 60px;
  object-fit: contain;
  margin-left: ${(props) => (props.typing === "true" ? "10px" : "0px")};
`;

const UtilityContainer = styled.div`
  display: relative;
  height: 100%;
  display: flex;
  align-items: ${(props) =>
    props.typing === "true" ? "flex-start" : "center"};
  justify-content: flex-end;
  gap: 18px;
  width: ${(props) => (props.typing === "true" ? "100%" : "max-content")};
`;

const growVertical = keyframes`
 0% { width: 300px;  }
 100% { width: 90%;  }
`;

const SearchWrapper = styled.div`
  /* border: 1px solid red; */

  height: 25px;
  width: ${(props) => (props.typing === "true" ? "90%" : "max-content")};
  display: flex;
  align-items: center;
  border: 1px solid black;
  justify-content: flex-start;
  padding: 8px 14px;
  border-radius: 100px;
  background-color: #f8f8f8;
  border: none;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  animation-name: ${(props) =>
    props.typing === "true"
      ? css`
          ${growVertical}
        `
      : ""};

  animation-duration: ${(props) => (props.typing === true ? "0.5s" : "")};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: "Nunito", sans-serif;
  width: 125px;
  font-size: 16px;

  &::placeholder {
    color: #d1d1d1;
    font-size: 18px;
  }
`;

const CancelButton = styled.button`
  padding: 6px 15px;
  border-radius: 100px;
  margin-right: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  background-color: black;
  font-family: "Nunito", sans-serif;
`;

const Navbar = () => {
  const { width } = useWindowDimensions();

  const [isTyping, setIsTyping] = useState(false);

  return (
    <Wrapper>
      <Container typing={isTyping.toString()}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/320px-Logo_NIKE.svg.png"
            typing={isTyping.toString()}
          />
        </Link>
        <UtilityContainer typing={isTyping.toString()}>
          {width <= 480 ? (
            <Search style={{ transform: "scale(1.2)", cursor: "pointer" }} />
          ) : (
            <SearchWrapper
              typing={isTyping.toString()}
              onClick={() => setIsTyping(true)}>
              <Search style={{ transform: "scale(1.2)" }} />
              <Input placeholder="Search" />
            </SearchWrapper>
          )}

          {!isTyping && (
            <>
              <FavoriteBorder />

              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}>
                <ShoppingBagOutlined />
              </Link>
            </>
          )}

          {isTyping && (
            <CancelButton onClick={() => setIsTyping(false)}>
              cancel
            </CancelButton>
          )}
        </UtilityContainer>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
