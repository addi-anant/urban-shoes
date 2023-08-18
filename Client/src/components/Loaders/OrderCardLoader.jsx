import React from "react";
import { styled } from "styled-components";
import {
  laptop,
  laptopXL,
  mobile,
  mobileXL,
  tablet,
} from "../../utils/responsive";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductWrapper = styled.div``;

const Product = styled.div`
  gap: 20px;
  display: flex;
  align-items: flex-start;
`;

const Image = styled.div`
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

const ProductInfo = styled.div`
  margin: 0px;
`;

const ProductTypeWrapper = styled.div`
  gap: 10px;
  display: flex;
  padding-top: 10px;
  align-items: center;
`;

const ProductType = styled.div``;

const InfoWrapper = styled.div`
  height: 100%;
  gap: 10px;
  display: flex;
  font-size: 17px;
`;

const DropdownWrapper = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;

  ${mobileXL({
    gap: "0px",
    alignItems: "flex-start",
    flexDirection: "column",
  })}

  ${mobile({
    gap: "0px",
    alignItems: "flex-start",
    flexDirection: "column",
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

const UtilityInfoWrapper = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const BuyAgain = styled.div``;

const Hr = styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
`;

const OrderCardLoader = () => {
  const { width } = useWindowDimensions();

  return (
    <ProductWrapper>
      <Product>
        <Image>
          <Skeleton width={"100%"} height={"100%"} />
        </Image>

        <DetailWrapper>
          <Detail>
            <TopInfoWrapper>
              <HeadingWrapper>
                {width > 660 && (
                  <ProductInfo>
                    <Skeleton width={"200px"} />
                  </ProductInfo>
                )}

                {width > 480 && width <= 660 && (
                  <ProductInfo>
                    <Skeleton width={"180px"} />
                  </ProductInfo>
                )}

                {width <= 480 && (
                  <ProductInfo>
                    <Skeleton width={"125px"} />
                  </ProductInfo>
                )}

                {width <= 480 ? null : (
                  <ProductInfo>
                    <Skeleton width={"60px"} />
                  </ProductInfo>
                )}
              </HeadingWrapper>

              {width > 660 && (
                <ProductTypeWrapper>
                  {Array(3)
                    .fill("")
                    .map((_, index) => (
                      <ProductType key={index}>
                        <Skeleton
                          width={"40px"}
                          style={{ borderRadius: "100px" }}
                        />
                      </ProductType>
                    ))}
                </ProductTypeWrapper>
              )}
            </TopInfoWrapper>

            {width > 480 && (
              <ProductInfo>
                {/* Colour: */}
                <InfoWrapper>
                  <Skeleton width={"150px"} />
                </InfoWrapper>

                <DropdownWrapper>
                  {/* Size */}
                  <InfoWrapper>
                    <Skeleton width={"150px"} />
                  </InfoWrapper>

                  {/* Quantity */}
                  <InfoWrapper>
                    <Skeleton width={"150px"} />
                  </InfoWrapper>
                </DropdownWrapper>
              </ProductInfo>
            )}

            {width <= 480 && (
              <ProductInfo>
                {/* Colour: */}
                <InfoWrapper>
                  <Skeleton width={"100px"} />
                </InfoWrapper>

                <DropdownWrapper>
                  {/* Size */}
                  <InfoWrapper>
                    <Skeleton width={"100px"} />
                  </InfoWrapper>

                  {/* Quantity */}
                  <InfoWrapper>
                    <Skeleton width={"100px"} />
                  </InfoWrapper>
                </DropdownWrapper>
              </ProductInfo>
            )}
          </Detail>

          {width > 480 && (
            <UtilityWrapper>
              <UtilityInfoWrapper>
                <InfoWrapper>
                  <Skeleton width={"250px"} height={"20px"} />
                </InfoWrapper>
                <InfoWrapper>
                  <Skeleton width={"250px"} height={"20px"} />
                </InfoWrapper>
                <InfoWrapper>
                  <Skeleton width={"250px"} height={"20px"} />
                </InfoWrapper>
              </UtilityInfoWrapper>

              <BuyAgain>
                <Skeleton
                  width={"150px"}
                  height={"40px"}
                  style={{ borderRadius: "100px" }}
                />
              </BuyAgain>
            </UtilityWrapper>
          )}
        </DetailWrapper>
      </Product>
      {width <= 480 && (
        <UtilityWrapper>
          <UtilityInfoWrapper>
            <InfoWrapper>
              <Skeleton width={"250px"} height={"20px"} />
            </InfoWrapper>
            <InfoWrapper>
              <Skeleton width={"250px"} height={"20px"} />
            </InfoWrapper>
            <InfoWrapper>
              <Skeleton width={"250px"} height={"20px"} />
            </InfoWrapper>
          </UtilityInfoWrapper>

          <BuyAgain>
            <Skeleton
              width={"150px"}
              height={"40px"}
              style={{ borderRadius: "100px" }}
            />
          </BuyAgain>
        </UtilityWrapper>
      )}

      <Hr />
    </ProductWrapper>
  );
};

export default OrderCardLoader;
