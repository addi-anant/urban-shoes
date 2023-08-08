import React, { useEffect } from "react";
import styled from "styled-components";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import { CurrencyRupee, DeleteOutline } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import Slider from "./Slider";

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
  const info = {
    id: 1,
    title: "Nike Tech Hera",
    cost: "9 695.00",
    description:
      "The Tech Hera is here to fulfil all of your chunky sneaker wishes. The wavy lifted midsole and suede accents level up your look while keeping you comfortable. Its durable design holds up beautifully to everyday wear—which is perfect, because you'll definitely want to wear these every day.",
    photo: [
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/08f3e7fe-fdae-4a73-a551-64abeb1bbad6/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5b5c2d7e-1d57-4040-bbea-ed95dac979da/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1239f5af-af11-4356-aa39-1d474dee4fd0/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6e1ed3de-e9d9-4268-974f-0de85530e60c/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_default/d9c82563-fe46-4d96-af29-d5b6d8039fb2/tech-hera-shoes-JlV5km.png",
    ],
    tag: ["Women", "Sneaker", "Running"],
    sizeAvailable: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
    ],
    colourAvailable: [
      "D5FFE4",
      "EAC696",
      "D8D9DA",
      "61677A",
      "272829",
      "E48586",
    ],
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    <Text>3 Items</Text>
                    <Text>|</Text>
                    <Text>
                      <ProductCost>
                        <CurrencyRupee style={{ transform: "scale(0.7)" }} />
                        {info?.cost}
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
              {Array(3)
                .fill("")
                .map((val, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={"/product/1"}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      <Product>
                        <Image src={info?.photo[0]} />
                        <DetailWrapper>
                          <Detail>
                            <TopInfoWrapper>
                              <HeadingWrapper>
                                <ProductName>{info?.title}</ProductName>
                                {width <= 660 ? null : (
                                  <ProductCost>MRP: {info?.cost}</ProductCost>
                                )}
                              </HeadingWrapper>
                              <ProductTypeWrapper>
                                {info?.tag.map((val, index) => (
                                  <ProductType key={index}>{val}</ProductType>
                                ))}
                              </ProductTypeWrapper>
                            </TopInfoWrapper>
                            <InfoWrapper>
                              Color:
                              <ProductColor color={info?.colourAvailable[0]} />
                            </InfoWrapper>

                            <DropdownWrapper>
                              <InfoWrapper>
                                Size:
                                <ProductSize>
                                  {info?.sizeAvailable[1]}
                                </ProductSize>
                              </InfoWrapper>
                              <InfoWrapper>
                                Quantity: <ProductQuantity>1</ProductQuantity>
                              </InfoWrapper>
                            </DropdownWrapper>
                          </Detail>
                          <UtilityWrapper>
                            <DeleteOutline
                              style={{
                                transform: `scale(${width <= 660 ? 1 : 1.2}`,
                                cursor: "pointer",
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
                    </Link>
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
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} /> {10}
                </PaymentText>
              </Payment>
              <Payment>
                <PaymentText>Estimated Shipping & Handling</PaymentText>
                <PaymentText>
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} /> 5.90
                </PaymentText>
              </Payment>

              <Hr />
              <Payment>
                <PaymentText>Total</PaymentText>
                <PaymentText>
                  <CurrencyRupee style={{ transform: "scale(0.7)" }} /> {10}
                </PaymentText>
              </Payment>
              <Hr />
            </PaymentWrapper>
            {width <= 1024 ? null : <Button> Checkout </Button>}
          </RightWrapper>

          {width <= 1024 ? (
            <ButtonWrapper>
              <Button> Checkout </Button>
            </ButtonWrapper>
          ) : null}
        </Container>
      </Wrapper>
      <Slider heading="You May Also Like" />
    </>
  );
};

export default Cart;
