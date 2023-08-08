import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { mobile, mobileXL, tablet } from "../utils/responsive";
import { CurrencyRupee } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";

const ProductWrapper = styled.div`
  gap: 5%;
  display: flex;
  padding: 20px 5vw;
  position: relative;

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

const SideImg = styled.img`
  width: 100%;
  cursor: pointer;
  aspect-ratio: 1;
  object-fit: cover;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 10px;
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
    filter: brightness(85%);
  }

  ${mobile({
    width: "100%",
  })}
`;

const MainImgWrapper = styled.div`
  flex: 5;
`;

const MainImg = styled.img`
  width: 100%;
  aspect-ratio: 0.8;
  object-fit: cover;
  border-radius: 20px;
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
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
`;

const TagWrapper = styled.div`
  gap: 8px;
  display: flex;
  padding: 5px 0px;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
`;

const PriceWrapper = styled.div`
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
  align-items: flex-start;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
  font-family: "Nunito", sans-serif;
`;

const PriceInfoSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const PriceSpan = styled.span`
  color: gray;
  font-size: 18px;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const ColorWrapper = styled.div`
  padding-bottom: 20px;
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));

  grid-gap: 20px;
  padding: 5px 0px 0px 4px;
`;

const Color = styled.span`
  width: 35px;
  height: 35px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
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
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const SizeInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 100px;
  background-color: ${(props) => (props.color === "cart" ? "black" : "white")};
  color: ${(props) => (props.color === "cart" ? "white" : "black")};
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 18px;
  cursor: pointer;
`;

const Description = styled.p`
  margin: 0px;
  font-size: 18px;
  font-weight: 400;
  padding-left: 4px;
  text-align: justify;
  font-family: "Nunito", sans-serif;
`;

const ProductDetail = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const info = {
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
  return (
    <ProductWrapper>
      {width <= "768" && (
        <>
          <Title>{info?.title}</Title>
          <TagWrapper>
            {info?.tag.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagWrapper>
          <PriceWrapper>
            <PriceContainer>
              <PriceInfoSpan>MRP: </PriceInfoSpan>
              <CurrencyRupee style={{ transform: "scale(0.8)" }} />
              <Price className="price">{info?.cost}</Price>
            </PriceContainer>
            <PriceSpan>(Also includes all applicable duties)</PriceSpan>
          </PriceWrapper>
        </>
      )}

      <Left>
        <SideImgWrapper>
          {info?.photo.map((img, index) => (
            <SideImg
              key={index}
              child={selectedImg + 1}
              src={info?.photo[index]}
              alt=""
              onMouseEnter={() => setSelectedImg(index)}
            />
          ))}
        </SideImgWrapper>
        <MainImgWrapper>
          <MainImg src={info?.photo[selectedImg]} alt="" />
        </MainImgWrapper>
      </Left>
      <Right>
        <RightContainer>
          {width > "768" && (
            <>
              <Title>{info?.title}</Title>
              <TagWrapper>
                {info?.tag.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagWrapper>
              <PriceWrapper>
                <PriceContainer>
                  <PriceInfoSpan>MRP: </PriceInfoSpan>
                  <CurrencyRupee style={{ transform: "scale(0.8)" }} />
                  <Price className="price">{info?.cost}</Price>
                </PriceContainer>
                <PriceSpan>(Also includes all applicable duties)</PriceSpan>
              </PriceWrapper>
            </>
          )}

          <ColorWrapper>
            <Header>Select Color:</Header>
            <ColorContainer>
              {info?.colourAvailable.map((color, index) => (
                <Color
                  key={index}
                  child={selectedColor + 1}
                  color={color}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </ColorContainer>
          </ColorWrapper>

          <SizeWrapper>
            <Header>Select Size:</Header>
            <SizeContainer>
              {info?.sizeAvailable?.map((size, index) => (
                <Size
                  key={index}
                  child={selectedSize + 1}
                  size={size}
                  onClick={() => setSelectedSize(index)}>
                  <SizeInfo>U.K {size}</SizeInfo>
                </Size>
              ))}
            </SizeContainer>
          </SizeWrapper>

          <Button color="cart">Add to bag</Button>
          <Button>Favourite</Button>

          <Header>Description:</Header>
          <Description>{info?.description}</Description>
        </RightContainer>
      </Right>
    </ProductWrapper>
  );
};

export default ProductDetail;
