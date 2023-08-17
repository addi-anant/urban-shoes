import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import React from "react";
import { styled } from "styled-components";
import { mobile, mobileXL, tablet } from "../utils/responsive";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  padding-top: 40px;
  background-color: #0f0f0f;
`;

const Container = styled.div`
  padding: 7vh 5vw 12vh 5vw;
  display: flex;
  justify-content: space-between;

  ${tablet({
    flexDirection: "column",
    padding: "5vh 5vw 7vh 5vw",
  })}

  ${mobileXL({
    flexDirection: "column",
    padding: "5vh 5vw 7vh 5vw",
  })}

  ${mobile({
    padding: "5vh 5vw 7vh 5vw",
  })}
`;

const LeftContainer = styled.div`
  gap: 10vw;
  display: flex;

  ${mobile({
    gap: "5vw",
    flexDirection: "column",
  })}
`;

const Block = styled.div`
  line-height: 30px;
`;

const BlockHeader = styled.p`
  margin: 0px;
  color: white;
  cursor: pointer;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
`;

const BlockText = styled.p`
  margin: 0px;
  cursor: pointer;
  color: #9b9b9b;
  font-size: 13px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

const RightContainer = styled.div`
  gap: 15px;
  display: flex;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <LeftContainer>
          <Block>
            <BlockHeader> FIND A STORE </BlockHeader>
            <BlockHeader> BECOME A MEMBER </BlockHeader>
            <BlockHeader> Provide Feedback </BlockHeader>
            <BlockHeader> STUDENT DISCOUNTS </BlockHeader>
          </Block>
          <Block>
            <BlockHeader>GET HELP</BlockHeader>
            <BlockText>Delivery</BlockText>
            <BlockText>Returns</BlockText>
            <BlockText>Payment Options</BlockText>
          </Block>
          <Block>
            <BlockHeader>ABOUT NIKE</BlockHeader>
            <BlockText>News</BlockText>
            <BlockText>Careers</BlockText>
            <BlockText>Investors</BlockText>
            <BlockText>Sustainability</BlockText>
          </Block>
        </LeftContainer>

        <RightContainer>
          <SocialIcon>
            <Twitter style={{ transform: "scale(0.9)" }} />
          </SocialIcon>
          <SocialIcon>
            <Facebook style={{ transform: "scale(0.9)" }} />
          </SocialIcon>
          <SocialIcon>
            <YouTube style={{ transform: "scale(0.9)" }} />
          </SocialIcon>
          <SocialIcon>
            <Instagram style={{ transform: "scale(0.9)" }} />
          </SocialIcon>
        </RightContainer>
      </Container>
    </Wrapper>
  );
};

export default Footer;
