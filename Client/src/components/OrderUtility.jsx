import React from "react";
import { styled } from "styled-components";
import { mobile, mobileXL, tablet } from "../utils/responsive";
import { Link } from "react-router-dom";

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

const InfoHeading = styled.p`
  margin: 0px;
  padding: 0px;
  color: black;
  font-weight: bold;
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

const OrderUtility = ({ info }) => {
  return (
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
  );
};

export default OrderUtility;
