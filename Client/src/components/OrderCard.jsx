import React from "react";
import { styled } from "styled-components";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

const ProductWrapper = styled.div``;

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
    height: "150px",
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
    fontSize: "17px",
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

  ${mobileXL({
    gap: "6px",
    alignItems: "flex-start",
    flexDirection: "column",
  })}

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

const ProductInfo = styled.p`
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
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${tablet({
    alignItems: "flex-start",
    flexDirection: "column",
  })}

  ${mobileXL({
    alignItems: "flex-start",
    flexDirection: "column",
  })}

  ${mobile({
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: "10px",
  })}
`;

const UtilityInfoWrapper = styled.div``;

const InfoHeading = styled.p`
  margin: 0px;
  padding: 0px;
  color: black;
  font-weight: bold;
`;

const BuyAgain = styled.button`
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 100px;
  background-color: black;
  font-family: "Nunito", sans-serif;
`;

const Hr = styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
`;

const OrderCard = ({ info }) => {
  const { width } = useWindowDimensions();

  return (
    <ProductWrapper>
      <Product>
        <Link
          to={`/product/${info?.product?._id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}>
          <Image src={info?.product?.photo[0]} />
        </Link>

        <DetailWrapper>
          <Detail>
            <TopInfoWrapper>
              <Link
                to={`/product/${info?.product?._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <HeadingWrapper>
                  <ProductName>{info?.product?.title}</ProductName>
                  {width <= 480 ? null : (
                    <ProductCost>MRP: {info?.product?.cost}</ProductCost>
                  )}
                </HeadingWrapper>
              </Link>

              {width > 660 && (
                <ProductTypeWrapper>
                  {[
                    info?.product?.brand,
                    ...info?.product?.gender,
                    ...info?.product?.type,
                  ].map((val, index) => (
                    <ProductType key={index}>{val}</ProductType>
                  ))}
                </ProductTypeWrapper>
              )}
            </TopInfoWrapper>

            {/* Colour: */}
            <InfoWrapper>
              Color:
              <ProductColor color={info?.colour} />
            </InfoWrapper>

            <DropdownWrapper>
              {/* Size */}
              <InfoWrapper>
                Size:
                <ProductInfo>{info?.size}</ProductInfo>
              </InfoWrapper>

              {/* Quantity */}
              <InfoWrapper>
                Quantity: <ProductInfo>{info?.quantity}</ProductInfo>
              </InfoWrapper>
            </DropdownWrapper>
          </Detail>

          {width > 480 && (
            <UtilityWrapper>
              <UtilityInfoWrapper>
                <InfoWrapper>
                  <InfoHeading>Order_ID:</InfoHeading>
                  <ProductInfo>{info?.razorpayOrderID}</ProductInfo>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoHeading>Payment_ID:</InfoHeading>
                  <ProductInfo>{info?.razorpayPaymentID}</ProductInfo>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoHeading>Total Amount Paid:</InfoHeading>
                  <ProductInfo>
                    {info?.quantity * info?.product?.cost}
                  </ProductInfo>
                </InfoWrapper>
              </UtilityInfoWrapper>
              <Link
                to={`/product/${info?.product?._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <BuyAgain>Order Again</BuyAgain>
              </Link>
            </UtilityWrapper>
          )}
        </DetailWrapper>
      </Product>
      {width <= 480 && (
        <UtilityWrapper>
          <UtilityInfoWrapper>
            <InfoWrapper>
              <InfoHeading>Order_ID:</InfoHeading>
              <ProductInfo>{info?.razorpayOrderID}</ProductInfo>
            </InfoWrapper>
            <InfoWrapper>
              <InfoHeading>Payment_ID:</InfoHeading>
              <ProductInfo>{info?.razorpayPaymentID}</ProductInfo>
            </InfoWrapper>
            <InfoWrapper>
              <InfoHeading>Total Amount Paid:</InfoHeading>
              <ProductInfo>{info?.quantity * info?.product?.cost}</ProductInfo>
            </InfoWrapper>
          </UtilityInfoWrapper>
          <Link
            to={`/product/${info?.product?._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}>
            <BuyAgain>Order Again</BuyAgain>
          </Link>
        </UtilityWrapper>
      )}

      <Hr />
    </ProductWrapper>
  );
};

export default OrderCard;
