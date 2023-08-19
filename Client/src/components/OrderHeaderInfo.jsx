import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { mobile, mobileXL } from "../utils/responsive";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const ProductType = styled.div`
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

const OrderHeaderInfo = ({ info }) => {
  const { width } = useWindowDimensions();
  return (
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
  );
};

export default OrderHeaderInfo;
