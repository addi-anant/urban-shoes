import React from "react";
import { styled } from "styled-components";
import { mobile } from "../utils/responsive";

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

const ProductBanner = ({ photo, selectedImg, setSelectedImg }) => {
  return (
    <>
      <SideImgWrapper>
        {photo.map((_, index) => (
          <SideImg
            key={index}
            child={selectedImg + 1}
            src={photo[index]}
            onMouseEnter={() => setSelectedImg(index)}
          />
        ))}
      </SideImgWrapper>
      <MainImgWrapper>
        <MainImg src={photo[selectedImg]} alt="" />
      </MainImgWrapper>
    </>
  );
};

export default ProductBanner;
