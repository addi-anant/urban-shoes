import {
  FavoriteBorder,
  Search,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { css, keyframes, styled } from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: ${(props) => (props.typing === "true" ? "94%" : "94%")};
  display: flex;
  align-items: ${(props) =>
    props.typing === "true" ? "flex-start" : "center"};
  justify-content: space-between;
  margin: 10px;
  background-color: white;
`;

const Img = styled.img`
  height: 40px;
  width: 60px;
  object-fit: contain;
`;

const UtilityContainer = styled.div`
  display: relative;
  height: 100%;
  display: flex;
  align-items: ${(props) =>
    props.typing === "true" ? "flex-start" : "center"};
  justify-content: flex-end;
  gap: 18px;
  width: ${(props) => (props.typing === "true" ? "100%" : "100%")};
`;

const growVertical = keyframes`
 0% { width: 165px;  }
 100% { width: 95%;  }
`;

const shrinkVertical = keyframes`
 0% { width: 95%;  }
 100% { width: 165px;  }
`;

const growVerticalMobile = keyframes`
 0% { width: 0px;  }
 100% { width: 90%;  }
`;

const shrinkVerticalMobile = keyframes`
 0% { width: 90%;  }
 100% { width: 35px;  }
`;

const SearchWrapper = styled.div`
  height: 25px;
  width: ${(props) => (props.typing === "true" ? "95%" : "max-content")};
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
      ? props.width !== "true"
        ? css`
            ${growVertical}
          `
        : css`
            ${growVerticalMobile}
          `
      : props.typing === "false"
      ? props.width !== "true"
        ? css`
            ${shrinkVertical}
          `
        : css`
            ${shrinkVerticalMobile}
          `
      : ""};

  animation-duration: ${(props) => (props.typing === "true" ? "0.5s" : "0.5s")};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: "Nunito", sans-serif;
  max-width: ${(props) =>
    props.typing === "true"
      ? "100%"
      : props.width === "true"
      ? "0px"
      : "125px"};
  width: 100%;
  font-size: 16px;

  &::placeholder {
    color: #d1d1d1;
    font-size: 18px;
  }
`;

const CancelButton = styled.button`
  padding: 9px 15px;
  border-radius: 100px;
  margin-right: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  background-color: black;
  font-family: "Nunito", sans-serif;
  border: none;
  outline: none;
`;

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [isTyping, setIsTyping] = useState();

  const { user } = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart.products);
  const wishlist = useSelector((store) => store.wishlist.products);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const invokeSearch = (event) => {
    event.key === "Escape" && setIsTyping(false);

    if (query === "") return;

    if (event.key === "Enter") {
      setIsTyping(false);
      navigate(`/search/${query}`);
    }

    event.key !== "Enter" && event.key !== "Escape" && setIsTyping(true);
  };

  return (
    <Wrapper>
      <Container typing={isTyping?.toString()}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          {!isTyping && (
            <Img
              src="https://res.cloudinary.com/additya/image/upload/v1692425970/urban%20shoes/yl1jjgwk1nglg7fphnhb.png"
              typing={isTyping?.toString()}
            />
          )}
        </Link>
        <UtilityContainer typing={isTyping?.toString()}>
          {width <= 480 ? (
            <SearchWrapper
              typing={isTyping?.toString()}
              width={(width <= 480).toString()}
              onClick={() => setIsTyping(true)}>
              <Search style={{ transform: "scale(1.2)", cursor: "pointer" }} />
              <Input
                placeholder="Search"
                width={(width <= 480).toString()}
                typing={isTyping?.toString()}
                onKeyUp={(event) => invokeSearch(event)}
                onChange={(event) => setQuery(event.target.value)}
              />
            </SearchWrapper>
          ) : (
            <SearchWrapper
              typing={isTyping?.toString()}
              width={(width <= 480).toString()}
              onClick={() => setIsTyping(true)}>
              <Search style={{ transform: "scale(1.2)" }} />
              <Input
                placeholder="Search"
                width={(width <= 480).toString()}
                typing={isTyping?.toString()}
                onKeyUp={invokeSearch}
                onChange={(event) => setQuery(event.target.value)}
              />
            </SearchWrapper>
          )}

          {!isTyping && (
            <>
              <Link
                to="/wishlist"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Badge badgeContent={wishlist?.length} color="secondary">
                  <FavoriteBorder />
                </Badge>
              </Link>

              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Badge badgeContent={cart?.length} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>

              {user && (
                <Link
                  to="/order"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <ShoppingBagOutlined />
                </Link>
              )}
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
