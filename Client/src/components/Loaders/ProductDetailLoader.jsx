import { styled } from "styled-components";
import { mobile, mobileXL, tablet } from "../../utils/responsive";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const ProductWrapper = styled.div`
  gap: 5%;
  display: flex;
  padding: 20px 5vw;

  ${tablet({
    padding: "3vw",
    flexDirection: "column",
  })}

  ${mobileXL({
    padding: "3vw",
    flexDirection: "column",
  })}

  ${mobile({
    padding: "3vw",
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  top: 0px;
  flex: 1.2;
  gap: 20px;
  width: 100%;
  display: flex;
  position: sticky;
  height: max-content;

  ${tablet({
    position: "relative",
  })}

  ${mobileXL({
    position: "relative",
  })}

  ${mobile({
    position: "relative",
    flexDirection: "column-reverse",
  })}
`;

const SideImgWrapper = styled.div`
  flex: 1;
  ${mobile({
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
  })}
`;

const SideImg = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 10px;
  ${mobile({
    width: "100%",
  })}
`;

const MainImgWrapper = styled.div`
  flex: 5;
  aspect-ratio: 0.8;
`;

const Right = styled.div`
  flex: 1;
  width: 100%;

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

const RightContainer = styled.div`
  display: flex;
  max-width: 80%;
  flex-direction: column;

  ${tablet({
    maxWidth: "100%",
  })}

  ${mobileXL({
    maxWidth: "100%",
  })}

  ${mobile({
    maxWidth: "100%",
  })}
`;

const Title = styled.p`
  margin: 0px;
  font-size: 28px;
`;

const TagWrapper = styled.div`
  gap: 8px;
  display: flex;
  padding: 5px 0px;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.span`
  width: 60px;
  height: 30px;
`;

const PriceWrapper = styled.div`
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
`;

const Price = styled.span`
  padding: 2px 0px;
`;

const ColorWrapper = styled.div`
  padding-bottom: 20px;
`;

const Header = styled.span`
  font-size: 20px;
  font-family: "Nunito", sans-serif;
`;

const ColorContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 5px 0px 0px 4px;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
`;

const Color = styled.span`
  width: 45px;
  height: 45px;
`;

const SizeWrapper = styled.div`
  padding-bottom: 20px;
`;

const SizeContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 5px 0px 0px 4px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const Size = styled.span`
  height: 50px;
`;

const Button = styled.div`
  padding: 5px 0px;
`;

const Description = styled.p`
  margin: 0px;
`;

const ProductDetailLoader = () => {
  const { width } = useWindowDimensions();
  return (
    <ProductWrapper>
      {width <= "768" && (
        <>
          <Title>
            <Skeleton />
          </Title>
          <TagWrapper>
            {Array(3)
              .fill("")
              ?.map((_, index) => (
                <Tag key={index}>
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "100px" }}
                  />
                </Tag>
              ))}
          </TagWrapper>
          <PriceWrapper>
            <Price>
              <Skeleton width={"150px"} />
            </Price>
            <Price>
              <Skeleton width={"300px"} />
            </Price>
          </PriceWrapper>
        </>
      )}

      <Left>
        <SideImgWrapper>
          {Array(4)
            .fill("")
            .map((_, index) => (
              <SideImg key={index}>
                <Skeleton width={"100%"} height={"100%"} />
              </SideImg>
            ))}
        </SideImgWrapper>
        <MainImgWrapper>
          <Skeleton width={"100%"} height={"100%"} />
        </MainImgWrapper>
      </Left>
      <Right>
        <RightContainer>
          {width > "768" && (
            <>
              <Title>
                <Skeleton />
              </Title>
              <TagWrapper>
                {Array(3)
                  .fill("")
                  .map((_, index) => (
                    <Tag key={index}>
                      <Skeleton
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "100px" }}
                      />
                    </Tag>
                  ))}
              </TagWrapper>
              <PriceWrapper>
                <Price>
                  <Skeleton width={"150px"} />
                </Price>
                <Price>
                  <Skeleton width={"300px"} />
                </Price>
              </PriceWrapper>
            </>
          )}

          <ColorWrapper>
            <Header>Select Color:</Header>
            <ColorContainer>
              {Array(10)
                .fill("")
                .map((_, index) => (
                  <Color key={index}>
                    <Skeleton
                      height={"100%"}
                      width={"100%"}
                      style={{ borderRadius: "100px" }}
                    />
                  </Color>
                ))}
            </ColorContainer>
          </ColorWrapper>

          <SizeWrapper>
            <Header>Select Size:</Header>
            <SizeContainer>
              {Array(10)
                .fill("")
                .map((_, index) => (
                  <Size key={index}>
                    <Skeleton
                      height={"100%"}
                      width={"100%"}
                      style={{ borderRadius: "4px" }}
                    />
                  </Size>
                ))}
            </SizeContainer>
          </SizeWrapper>

          <Button>
            <Skeleton
              height={"60px"}
              width={"100%"}
              style={{ borderRadius: "100px" }}
            />
          </Button>
          <Button>
            <Skeleton
              height={"60px"}
              width={"100%"}
              style={{ borderRadius: "100px" }}
            />
          </Button>

          <Header>Description:</Header>
          <Description>
            <Skeleton height={"150px"} width={"100%"} />
          </Description>
        </RightContainer>
      </Right>
    </ProductWrapper>
  );
};

export default ProductDetailLoader;
