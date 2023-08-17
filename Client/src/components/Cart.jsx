import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import {
  AddCircleOutline,
  CurrencyRupee,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { axiosInstance } from "../utils/axiosInstance";
import axios from "axios";
import useToast from "../hooks/useToast";

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

const TopHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: max-content;
  height: max-content;
  padding: 0px 0px 25px 0px;
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

const TextWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "17px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const LeftWrapper = styled.div`
  flex: 2.5;
`;

const ProductInfoWrapper = styled.div``;

const Product = styled.div`
  gap: 20px;
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  aspect-ratio: 1;
  height: 200px;
  object-fit: cover;

  ${laptopXL({
    height: "175px",
  })}

  ${laptop({
    height: "175px",
  })}

  ${tablet({
    height: "175px",
  })}

  ${mobileXL({
    height: "150px",
  })}

  ${mobile({
    height: "125px",
  })}
`;

const DetailWrapper = styled.div`
  gap: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TopInfoWrapper = styled.div``;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductName = styled.p`
  margin: 0px;
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "17px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const ProductCost = styled.p`
  margin: 0px;
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  display: flex;
  align-items: center;

  ${mobileXL({
    fontSize: "17px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const ProductTypeWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ProductType = styled.p`
  margin: 0px;
  font-size: 14px;
  font-family: "Nunito", sans-serif;
  color: #4d4d4d;
  font-weight: 500;
  background-color: #f5f5f5;
  border-radius: 50px;
  padding: 2px 4px;

  ${mobileXL({
    fontSize: "12px",
  })}

  ${mobile({
    fontSize: "12px",
  })}
`;

const InfoWrapper = styled.div`
  height: 100%;
  gap: 10px;
  display: flex;
  font-size: 17px;
  color: #4d4d4d;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  ${mobileXL({
    fontSize: "15px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const DropdownWrapper = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;

  ${mobile({
    gap: "6px",
    alignItems: "flex-start",
    flexDirection: "column",
  })}
`;

const ProductColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  outline: 1px solid black;
  background-color: #${(props) => props.color};
`;

const ProductSize = styled.p`
  margin: 0px;
  font-size: 17px;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "15px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const ProductQuantity = styled.p`
  margin: 0px;
  font-size: 17px;
  font-family: "Nunito", sans-serif;
  display: flex;
  align-items: center;

  ${mobileXL({
    fontSize: "15px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const UtilityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Hr = styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
`;

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

const PaymentWrapper = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const PaymentText = styled.p`
  margin: 0px;
  display: flex;
  font-size: 18px;
  font-weight: 500;
  align-items: center;
  font-family: "Nunito", sans-serif;
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

const Cart = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const cart = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeProductFromCart = (id, cost, size, colour, quantity) => {
    if (!user) return;
    dispatch(removeFromCart({ id, cost, size, colour, quantity }));
  };

  const productQuantity = (type, _id, cost, size, colour, quantity) => {
    if (!user) return;
    type === "increase"
      ? dispatch(increaseQuantity({ _id, cost, size, colour, quantity }))
      : dispatch(decreaseQuantity({ _id, cost, size, colour, quantity }));
  };

  const handlePayment = async () => {
    const key = await axiosInstance.get("/payment/key");

    const order = await axiosInstance.post("/payment", {
      amount: cart.cartSummary,
    });

    /* ID for the product bought: */
    const orderDetail = cart?.products?.map((product) => [
      product?._id,
      product?.selectedColour,
      product?.selectedSize,
      product?.selectedQuantity,
    ]);

    const options = {
      key: key?.data?.key,
      amount: order?.data?.amount,
      currency: "INR",
      name: "URBAN SHOES",
      image:
        "https://res.cloudinary.com/additya/image/upload/v1678127598/Voyance/r9udien7vaenzecl8mmk.png",
      order_id: order?.data?.id,
      handler: async function (response) {
        await axiosInstance.post("/payment/verify", {
          orderDetail:
            orderDetail /* Required -> Colour, Size, Quantity, _id */,
          userId: user?._id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        /* Clear Cart, handle Success Message and Navigate to ORDERS page: */
        toast.open("Order placed successfully.");
        dispatch(clearCart());
        navigate("/order");
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      <Wrapper>
        <Container>
          <LeftWrapper>
            {width <= 1024 ? (
              <TopHeadingWrapper>
                <TopHeadingContainer>
                  <Heading> Bag </Heading>
                  <TextWrapper>
                    <Text>{cart?.products?.length} Items</Text>
                    <Text>|</Text>
                    <Text>
                      <ProductCost>
                        <CurrencyRupee style={{ transform: "scale(0.7)" }} />
                        {cart?.cartSummary}
                      </ProductCost>
                    </Text>
                  </TextWrapper>
                </TopHeadingContainer>
                <Hr />
              </TopHeadingWrapper>
            ) : (
              <Heading> Bag </Heading>
            )}

            <ProductInfoWrapper>
              {cart?.products?.map((info) => (
                <React.Fragment
                  key={`${info?._id}${info?.selectedColour}${info?.selectedSize}${info?.selectedQuantity}`}>
                  <Product>
                    <Image src={info?.photo[0]} />
                    <DetailWrapper>
                      <Detail>
                        <TopInfoWrapper>
                          <Link
                            to={`/product/${info?._id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}>
                            <HeadingWrapper>
                              <ProductName>{info?.title}</ProductName>
                              {width <= 660 ? null : (
                                <ProductCost>MRP: {info?.cost}</ProductCost>
                              )}
                            </HeadingWrapper>
                          </Link>
                          <ProductTypeWrapper>
                            {[info?.brand, ...info?.gender, ...info?.type].map(
                              (val, index) => (
                                <ProductType key={index}>{val}</ProductType>
                              )
                            )}
                          </ProductTypeWrapper>
                        </TopInfoWrapper>
                        <InfoWrapper>
                          Color:
                          <ProductColor color={info?.selectedColour} />
                        </InfoWrapper>

                        <DropdownWrapper>
                          <InfoWrapper>
                            Size:
                            <ProductSize>{info?.selectedSize}</ProductSize>
                          </InfoWrapper>
                          <InfoWrapper>
                            Quantity:{" "}
                            <ProductQuantity>
                              {info?.selectedQuantity}
                            </ProductQuantity>
                            <AddCircleOutline
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                productQuantity(
                                  "increase",
                                  info?._id,
                                  info?.cost,
                                  info?.selectedSize,
                                  info?.selectedColour,
                                  info?.selectedQuantity
                                )
                              }
                            />
                            <RemoveCircleOutline
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                productQuantity(
                                  "decrease",
                                  info?._id,
                                  info?.cost,
                                  info?.selectedSize,
                                  info?.selectedColour,
                                  info?.selectedQuantity
                                )
                              }
                            />
                          </InfoWrapper>
                        </DropdownWrapper>
                      </Detail>
                      <UtilityWrapper>
                        <DeleteOutline
                          style={{
                            transform: `scale(${width <= 660 ? 1 : 1.2}`,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            removeProductFromCart(
                              info?._id,
                              info?.cost,
                              info?.selectedSize,
                              info?.selectedColour,
                              info?.selectedQuantity
                            );
                          }}
                        />

                        {width <= 660 ? (
                          <ProductCost>
                            MRP:
                            <CurrencyRupee
                              style={{ transform: "scale(0.7)" }}
                            />
                            {info?.cost}
                          </ProductCost>
                        ) : null}
                      </UtilityWrapper>
                    </DetailWrapper>
                  </Product>
                  {/* </Link> */}
                  <Hr />
                </React.Fragment>
              ))}
            </ProductInfoWrapper>
          </LeftWrapper>

          <RightWrapper>
            <Heading> Summary </Heading>
            <PaymentWrapper>
              <Payment>
                <PaymentText>Subtotal</PaymentText>
                <PaymentText>
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
                  {cart?.cartSummary}
                </PaymentText>
              </Payment>
              <Payment>
                <PaymentText>Estimated Shipping & Handling</PaymentText>
                <PaymentText>
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
                  {cart?.cartSummary !== 0 ? 99 : 0}
                </PaymentText>
              </Payment>

              <Hr />
              <Payment>
                <PaymentText>Total</PaymentText>
                <PaymentText>
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
                  {cart?.cartSummary + (cart?.cartSummary !== 0 ? 99 : 0)}
                </PaymentText>
              </Payment>
              <Hr />
            </PaymentWrapper>
            {width <= 1024 ? null : (
              <Button onClick={handlePayment}> Checkout </Button>
            )}
          </RightWrapper>

          {width <= 1024 ? (
            <ButtonWrapper>
              <Button onClick={handlePayment}> Checkout </Button>
            </ButtonWrapper>
          ) : null}
        </Container>
      </Wrapper>
      <Slider heading="You May Also Like" />
    </>
  );
};

export default Cart;
