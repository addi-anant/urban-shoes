import React, { useEffect } from "react";
import styled from "styled-components";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import Slider from "./Slider";
import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import { EmptyCart } from "../utils/constant";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CartProductCard from "./CartProductCard";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment } from "../utils/handlePayment";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;

  ${laptop({
    marginTop: "25px",
  })}

  ${tablet({
    marginTop: "25px",
  })}

  ${mobileXL({
    marginTop: "25px",
  })}

  ${mobile({
    marginTop: "25px",
  })}
`;

const Container = styled.div`
  gap: 50px;
  width: 80%;
  display: flex;
  justify-content: space-between;

  ${laptopXL({
    width: "90%",
  })}

  ${laptop({
    gap: "25px",
    width: "75%",
    flexDirection: "column",
  })}

  ${tablet({
    gap: "25px",
    width: "85%",
    flexDirection: "column",
  })}

  ${mobileXL({
    gap: "25px",
    width: "90%",
    flexDirection: "column",
  })}

  ${mobile({
    gap: "25px",
    width: "90%",
    flexDirection: "column",
  })}
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "24px",
  })}

  ${mobile({
    fontSize: "20x",
  })}
`;

const LeftWrapper = styled.div`
  flex: 2.5;
`;

const ProductInfoWrapper = styled.div``;

const RightWrapper = styled.div`
  flex: 1.4;
  padding: 0px 20px;

  ${laptop({
    padding: "0px",
  })}

  ${tablet({
    padding: "0px",
  })}

  ${mobileXL({
    padding: "0px",
  })}

  ${mobile({
    padding: "0px",
  })}
`;

const ButtonWrapper = styled.div`
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: sticky;
  background-color: white;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin: 20px 0px;
  font-weight: 600;
  border-radius: 50px;
  background-color: black;
  font-family: "Nunito", sans-serif;

  &:hover {
    opacity: 0.8;
  }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SVG = styled.img`
  width: 40%;
  aspect-ratio: 1;

  ${mobileXL({
    width: "50%",
  })}

  ${mobile({
    width: "70%",
  })}
`;

const SVGText = styled.p`
  margin: 0px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  text-align: center;

  ${mobileXL({
    fontSize: "20px",
  })}

  ${mobile({
    fontSize: "18px",
  })}
`;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const cart = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.user);
  const loginPayment = () => toast("Login to proceed for payment.");
  const orderSuccessful = () => toast("Order completed successfully.");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Payment Handler: */
  const openPayment = () => {
    handlePayment(
      user,
      cart,
      dispatch,
      navigate,
      loginPayment,
      orderSuccessful
    );
  };

  return (
    <>
      <Wrapper>
        <Container>
          <LeftWrapper>
            {width <= 1024 ? (
              <CartHeader
                length={cart?.products?.length}
                cartSummary={cart?.cartSummary}
              />
            ) : (
              <Heading> Bag </Heading>
            )}

            <ProductInfoWrapper>
              {!cart?.products?.length ? (
                <SVGContainer>
                  <SVG src={EmptyCart} />
                  <SVGText> Your Cart is Empty!</SVGText>
                </SVGContainer>
              ) : (
                <>
                  {cart?.products?.map((info, index) => (
                    <CartProductCard info={info} key={index} />
                  ))}
                </>
              )}
            </ProductInfoWrapper>
          </LeftWrapper>

          <RightWrapper>
            <CartSummary cart={cart} openPayment={openPayment} />
          </RightWrapper>

          {width <= 1024 ? (
            <ButtonWrapper>
              <Button onClick={openPayment}>Checkout</Button>
            </ButtonWrapper>
          ) : null}
        </Container>
      </Wrapper>

      <Slider heading="You May Also Like" />
    </>
  );
};

export default Cart;
