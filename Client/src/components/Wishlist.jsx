import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import WishlistCard from "./wishlistCard";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 94%;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 20px;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
`;

const WishlistWrapper = styled.div`
  grid-gap: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  ${laptop({
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  })}

  ${tablet({
    border: "1px solid red",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}

    ${mobileXL({
    border: "1px solid blue",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  })}

   ${mobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  })}
`;

const Wishlist = () => {
  const { products } = useSelector((store) => store.wishlist);
  return (
    <Wrapper>
      <Container>
        <Heading>Wishlist</Heading>
        <WishlistWrapper>
          {products?.map((product) => (
            <WishlistCard key={product?._id} info={product} favourite={true} />
          ))}
        </WishlistWrapper>
      </Container>
    </Wrapper>
  );
};

export default Wishlist;
