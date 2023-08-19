import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  position: relative;
  height: max-content;
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Header = styled.p`
  padding: 5px;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #565656;
  font-family: "Nunito", sans-serif;
  font-family: "Inter", sans-serif;
`;

const IconicCard = ({ info }) => {
  return (
    <>
      <Link
        to={`/product/${info?._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>
        <Container>
          <ImgContainer>
            <Img alt="product" src={info?.photo[0]} />
          </ImgContainer>

          <Header>{info?.title}</Header>
        </Container>
      </Link>
    </>
  );
};

export default IconicCard;
