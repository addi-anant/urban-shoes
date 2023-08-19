import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import { Link } from "react-router-dom";
import OrderUtility from "./OrderUtility";
import { styled } from "styled-components";
import OrderHeaderInfo from "./OrderHeaderInfo";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
            <OrderHeaderInfo info={info} />

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

          {width > 480 && <OrderUtility info={info} />}
        </DetailWrapper>
      </Product>
      {width <= 480 && <OrderUtility info={info} />}

      <Hr />
    </ProductWrapper>
  );
};

export default OrderCard;
