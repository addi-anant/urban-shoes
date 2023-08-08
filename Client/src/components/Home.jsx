import Essentials from "./Essentials";
import Header from "./Header";
import Slider from "./Slider";
import { styled } from "styled-components";
import Slogan from "./Slogan";
import IconicSlider from "./IconicSlider";
import { useEffect } from "react";

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
      <Slider heading="Trending Now" type="home" />
      <Header />
      <IconicSlider />
      <Essentials />
    </Wrapper>
  );
};

export default Home;
