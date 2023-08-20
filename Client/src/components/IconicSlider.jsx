import IconicCard from "./IconicCard";
import React, { useRef } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import IconicCardLoader from "./Loaders/IconicCardLoader";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

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
  width: 100%;
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
  z-index: 100;
  display: flex;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: white;
  left: ${(props) => (props.dir === "right" ? "calc(100% - 60px)" : "10px")};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const IconicSlider = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["iconic"],
    queryFn: async () => {
      const response = await axiosInstance.get("/product/iconic");
      return response.data;
    },
  });

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
            <Button onClick={() => handleScroll("left")}>
              <KeyboardArrowLeft />
            </Button>
          )}

          <SliderWrapper ref={ref}>
            {isLoading ? (
              <>
                {Array(10)
                  .fill("")
                  .map((val, index) => (
                    <IconicCardLoader key={index} />
                  ))}
              </>
            ) : (
              <>
                {data?.map((info) => (
                  <IconicCard key={info?._id} info={info} />
                ))}
              </>
            )}
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
