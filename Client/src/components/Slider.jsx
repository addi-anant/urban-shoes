import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import SliderCard from "./SliderCard";
import { mobile, mobileXL, tablet } from "../utils/responsive";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0px;
`;

const Container = styled.div`
  width: 94%;
`;

const SliderWrapper = styled.div`
  gap: 15px;
  width: 100%;
  display: grid;
  overflow-x: auto;
  scrollbar-width: none;
  grid-auto-flow: column;
  scroll-behavior: smooth;
  grid-auto-columns: calc((100% / 3) - 10px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${tablet({
    gridAutoColumns: "calc((100% / 2) - 10px)",
  })}

  ${mobileXL({
    gridAutoColumns: "calc((100%) / 2 - 10px)",
  })}

  ${mobile({
    gridAutoColumns: "calc((100%) - 100px)",
  })}
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "26px",
  })}

  ${mobile({
    fontSize: "20px",
  })}
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
`;

const Slider = ({ heading, type }) => {
  // make an API call based upon the slider component is called from Home or Product.

  const info = {
    id: 1,
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

  const ref = useRef();
  const { width } = useWindowDimensions();

  const handleScroll = (direction) => {
    const innerWidth = ref.current.offsetWidth;

    let val =
      width <= 480
        ? innerWidth - 85
        : width <= 660
        ? innerWidth / 2 + 5
        : width <= 768
        ? innerWidth / 2 + 5
        : innerWidth / 3 + 10;

    if (direction === "left") ref.current.scrollLeft -= val;
    if (direction === "right") ref.current.scrollLeft += val;
  };

  return (
    <Wrapper>
      <Container>
        <HeaderWrapper>
          <Heading> {heading} </Heading>
          <ButtonWrapper>
            <Button onClick={() => handleScroll("left")}>
              <KeyboardArrowLeft />
            </Button>
            <Button onClick={() => handleScroll("right")}>
              <KeyboardArrowRight />
            </Button>
          </ButtonWrapper>
        </HeaderWrapper>

        <SliderWrapper ref={ref}>
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
          <SliderCard info={info} />
        </SliderWrapper>
      </Container>
    </Wrapper>
  );
};

export default Slider;
