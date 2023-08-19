import { styled } from "styled-components";
import { mobile, mobileXL } from "../utils/responsive";
import { Link } from "react-router-dom";
import { Kids, Men, Women } from "../utils/constant";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-top: 25px;
  align-items: center;
  justify-content: center;
`;

const OuterContainer = styled.div`
  width: 94%;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  padding-top: 10px;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% / 3) - 6px);

  ${mobileXL({
    gridAutoFlow: "row",
    gridAutoColumns: "calc(100%)",
  })}

  ${mobile({
    gridAutoFlow: "row",
    gridAutoColumns: "calc(100%)",
  })}
`;

const Card = styled.div`
  width: 100%;
  aspect-ratio: 0.8;
  position: relative;

  ${mobileXL({
    aspectRatio: "1.5",
  })}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  left: 40px;
  bottom: 40px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 7px 18px;
  position: absolute;
  border-radius: 100px;
  font-family: "Nunito", sans-serif;
  background-color: white;
`;

const Essentials = () => {
  return (
    <Wrapper>
      <OuterContainer>
        <Heading> The Essentials </Heading>
        <Container>
          <Card>
            <Img src={Men} />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/search/Men`}>
              <Button> Men's </Button>
            </Link>
          </Card>

          <Card>
            <Img src={Women} />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/search/Women`}>
              <Button> Women's </Button>
            </Link>
          </Card>

          <Card>
            <Img src={Kids} />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/search/Kids`}>
              <Button> Kid's </Button>
            </Link>
          </Card>
        </Container>
      </OuterContainer>
    </Wrapper>
  );
};

export default Essentials;
