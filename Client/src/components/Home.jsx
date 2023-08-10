import Header from "./Header";
import Slider from "./Slider";
import Slogan from "./Slogan";
import { useEffect } from "react";
import Essentials from "./Essentials";
import IconicSlider from "./IconicSlider";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: max-content;
`;

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <Header type="header" />
      <Slogan />
      <Slider heading="Trending Now" />
      <Header />
      <IconicSlider />
      <Essentials />
    </Wrapper>
  );
};

export default Home;
