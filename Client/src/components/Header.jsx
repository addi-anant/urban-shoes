import { styled } from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import { Link } from "react-router-dom";

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
  const url1 =
    "https://images.unsplash.com/photo-1580906853305-5702e648164e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
  const url4 =
    "https://images.unsplash.com/photo-1588754685964-853c9fabf7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
  const url2 =
    "https://images.unsplash.com/photo-1615064779799-df1bfcc66ed0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80";

  const url3 =
    "https://images.unsplash.com/photo-1566796195789-d5a59f97235b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80";

  const url5 =
    "https://images.unsplash.com/photo-1566796201787-b034938b4396?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80";

  const url6 =
    "https://images.unsplash.com/photo-1557336854-ef7f314c71eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80";

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
                  ? url6
                  : url5
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
