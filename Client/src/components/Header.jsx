import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { url1, url2, url3, url4 } from "../utils/constant";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 94%;
  aspect-ratio: 2;

  ${laptop({
    aspectRatio: "1.8",
  })}

  ${tablet({
    aspectRatio: "1.8",
  })}

  ${mobileXL({
    aspectRatio: "0.9",
  })}

  ${mobile({
    aspectRatio: "0.8",
  })}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  padding-bottom: 10px;

  ${mobileXL({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
`;

const Header = ({ type }) => {
  const { width } = useWindowDimensions();

  return (
    <Wrapper>
      <Container>
        {type !== "header" && <Heading>Fresh Arrivals</Heading>}

        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={type === "header" ? `/search/All` : `/search/Nike`}>
          <Img
            src={
              type === "header"
                ? width > 660
                  ? url4
                  : url3
                : width > 660
                ? url1
                : url2
            }
          />
        </Link>
      </Container>
    </Wrapper>
  );
};

export default Header;
