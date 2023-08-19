import React, { useEffect } from "react";
import WishlistCard from "./wishlistCard";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { EmptyWishlist } from "../utils/constant";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";

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
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}

    ${mobileXL({
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  })}

   ${mobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  })}
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SVG = styled.img`
  width: 30%;
  aspect-ratio: 1;

  ${laptop({
    width: "45%",
  })}

  ${tablet({
    width: "60%",
  })}

  ${mobileXL({
    width: "70%",
  })}

  ${mobile({
    width: "90%",
  })}
`;

const Text = styled.p`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  text-align: center;
  color: #414141;

  ${mobileXL({
    fontSize: "20px",
  })}

  ${mobile({
    fontSize: "18px",
  })};
`;

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { products } = useSelector((store) => store.wishlist);
  return (
    <Wrapper>
      <Container>
        <Heading>Wishlist</Heading>
        <>
          {!products.length ? (
            <SVGContainer>
              <SVG src={EmptyWishlist} />
              <Text>Your Wishlist is Empty.</Text>
            </SVGContainer>
          ) : (
            <WishlistWrapper>
              {products?.map((product) => (
                <WishlistCard key={product?._id} info={product} />
              ))}
            </WishlistWrapper>
          )}
        </>
      </Container>
    </Wrapper>
  );
};

export default Wishlist;
