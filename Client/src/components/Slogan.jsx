import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { mobile } from "../utils/responsive";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 540px;
  display: flex;
  padding: 75px 0px 40px 0px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Header = styled.p`
  margin: 0;
  font-size: 64px;
  font-weight: 1000;
  text-align: center;
  line-height: 54px;
  letter-spacing: 0px;
  font-family: "Inter", sans-serif;

  ${mobile({
    fontSize: "48px",
    // textAlign: "left",
  })}
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  text-align: center;
  padding: 0px 10px;
  color: #3b3b3b;
  font-family: "Nunito", sans-serif;
`;

const Button = styled.button`
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  padding: 7px 18px;
  border-radius: 100px;
  background-color: black;
  font-family: "Nunito", sans-serif;
`;

const Slogan = () => {
  return (
    <Wrapper>
      <Container>
        <Header>MADE FOR YOUR EVERY MOVE</Header>
        <Text>
          No matter what your workout looks like today or tomorrow, we've got
          the go-to-essentials to make every movement count.
        </Text>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/search/All`}>
          <Button> Shop </Button>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default Slogan;
