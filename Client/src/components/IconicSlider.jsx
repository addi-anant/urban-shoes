import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import SliderCard from "./SliderCard";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import IconicCard from "./IconicCard";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0px;
`;

const OuterContainer = styled.div`
  width: 94%;
`;

const Container = styled.div`
  position: relative;
`;

const SliderWrapper = styled.div`
  gap: 15px;
  width: 100%;
  display: grid;
  overflow-x: auto;
  scrollbar-width: none;
  grid-auto-flow: column;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  grid-auto-columns: calc((100% / 4) - 10px);
  &::-webkit-scrollbar {
    display: none;
  }

  ${laptop({
    gridAutoColumns: "calc((100% / 3) - 10px)",
  })}

  ${tablet({
    gridAutoColumns: "calc((100% / 3) - 10px)",
  })}

  ${mobileXL({
    gridAutoColumns: "calc((100% / 2) - 10px)",
  })}

  ${mobile({
    gridAutoColumns: "calc((100% / 1.8))",
  })}
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 20px;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
`;

const Button = styled.div`
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: 45px;
  height: 45px;
  display: flex;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: white;
  left: ${(props) => props.dir === "left" && "10px"};
  right: ${(props) => props.dir === "right" && "10px"};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const IconicSlider = () => {
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
        ? innerWidth / 1.8 + 10
        : width <= 660
        ? innerWidth / 2 + 5
        : width <= 768
        ? innerWidth / 3 + 5
        : width <= 1024
        ? innerWidth / 3 + 5
        : innerWidth / 4 + 5;

    if (direction === "left") ref.current.scrollLeft -= val;
    if (direction === "right") ref.current.scrollLeft += val;
  };

  return (
    <Wrapper>
      <OuterContainer>
        <Heading> Always Iconic </Heading>
        <Container>
          {width > 660 && (
            <Button dir="left" onClick={() => handleScroll("left")}>
              <KeyboardArrowLeft />
            </Button>
          )}
          <SliderWrapper ref={ref}>
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
            <IconicCard info={info} />
          </SliderWrapper>
          {width > 660 && (
            <Button dir="right" onClick={() => handleScroll("right")}>
              <KeyboardArrowRight />
            </Button>
          )}
        </Container>
      </OuterContainer>
    </Wrapper>
  );
};

export default IconicSlider;
