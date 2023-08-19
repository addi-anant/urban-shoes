import React, { useEffect } from "react";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../utils/responsive";
import OrderCard from "./OrderCard";
import OrderCardLoader from "./Loaders/OrderCardLoader";
import { EmptyOrder } from "../utils/constant";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const Container = styled.div`
  width: 70%;

  ${laptopXL({
    width: "80%",
  })}

  ${laptop({
    gap: "25px",
    width: "80%",
    flexDirection: "column",
  })}

  ${tablet({
    gap: "25px",
    width: "80%",
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

const Heading = styled.div`
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

const ProductInfoWrapper = styled.div`
  min-height: 50vh;
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

  ${laptop({
    width: "56%",
  })}

  ${tablet({
    width: "70%",
  })}

  ${mobileXL({
    width: "70%",
  })}

  ${mobile({
    width: "90%",
  })}
`;

const Text = styled.div`
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
    fontSize: "16x",
  })}
`;

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useSelector((store) => store.user);

  const { data, isLoading } = useQuery({
    queryKey: ["order", user?._id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/order/${user?._id}`);
      return response.data;
    },
  });

  return (
    <>
      <Wrapper>
        <Container>
          <Heading>Your Orders:</Heading>

          <ProductInfoWrapper>
            {isLoading ? (
              Array(3)
                .fill("")
                .map((_, index) => <OrderCardLoader key={index} />)
            ) : !data?.length ? (
              <SVGContainer>
                <SVG src={EmptyOrder} />
                <Text>You haven't placed any order, Yet!</Text>
              </SVGContainer>
            ) : (
              <>
                {data?.map((info) => (
                  <OrderCard
                    info={info}
                    key={`${info?._id}${info?.colour}${info?.size}${info?.quantity}`}
                  />
                ))}
              </>
            )}
          </ProductInfoWrapper>
        </Container>
      </Wrapper>
      <Slider heading="You May Also Like" />
    </>
  );
};

export default Order;
