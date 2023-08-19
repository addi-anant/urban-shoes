import React from "react";
import { styled } from "styled-components";
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
import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

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

const CartProductCard = ({ info }) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { user } = useSelector((store) => store?.user);

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

  return (
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
                <ProductQuantity>{info?.selectedQuantity}</ProductQuantity>
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
                <CurrencyRupee style={{ transform: "scale(0.7)" }} />
                {info?.cost}
              </ProductCost>
            ) : null}
          </UtilityWrapper>
        </DetailWrapper>
      </Product>
      <Hr />
    </React.Fragment>
  );
};

export default CartProductCard;
