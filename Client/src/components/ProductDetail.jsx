import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { mobile, mobileXL, tablet } from "../utils/responsive";
import { CurrencyRupee } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

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

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    },
  });

  const { width } = useWindowDimensions();
  return (
    <ProductWrapper>
      {width <= "768" && (
        <>
          <Title>{data?.title}</Title>
          <TagWrapper>
            {data?.tag.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagWrapper>
          <PriceWrapper>
            <PriceContainer>
              <PriceInfoSpan>MRP: </PriceInfoSpan>
              <CurrencyRupee style={{ transform: "scale(0.8)" }} />
              <Price className="price">{data?.cost}</Price>
            </PriceContainer>
            <PriceSpan>(Also includes all applicable duties)</PriceSpan>
          </PriceWrapper>
        </>
      )}

      <Left>
        <SideImgWrapper>
          {data?.photo.map((img, index) => (
            <SideImg
              key={index}
              child={selectedImg + 1}
              src={data?.photo[index]}
              alt=""
              onMouseEnter={() => setSelectedImg(index)}
            />
          ))}
        </SideImgWrapper>
        <MainImgWrapper>
          <MainImg src={data?.photo[selectedImg]} alt="" />
        </MainImgWrapper>
      </Left>
      <Right>
        <RightContainer>
          {width > "768" && (
            <>
              <Title>{data?.title}</Title>
              <TagWrapper>
                {data?.tag.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagWrapper>
              <PriceWrapper>
                <PriceContainer>
                  <PriceInfoSpan>MRP: </PriceInfoSpan>
                  <CurrencyRupee style={{ transform: "scale(0.8)" }} />
                  <Price className="price">{data?.cost}</Price>
                </PriceContainer>
                <PriceSpan>(Also includes all applicable duties)</PriceSpan>
              </PriceWrapper>
            </>
          )}

          <ColorWrapper>
            <Header>Select Color:</Header>
            <ColorContainer>
              {data?.colourAvailable.map((color, index) => (
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
              {data?.sizeAvailable?.map((size, index) => (
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
          <Description>{data?.description}</Description>
        </RightContainer>
      </Right>
    </ProductWrapper>
  );
};

export default ProductDetail;
