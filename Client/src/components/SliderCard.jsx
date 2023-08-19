import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
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
  border-radius: 5px;
`;

const InformationContainer = styled.div`
  padding: 5px;
`;

const Header = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

const Info = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 2px;
  font-family: "Nunito", sans-serif;
`;

const Price = styled.span`
  display: flex;
  font-size: 16px;
  color: #424242;
  font-weight: 600;
  align-items: center;
  padding: 8px 0px 0px 0px;
  font-family: "Nunito", sans-serif;
`;

const SliderCard = ({ info }) => {
  return (
    <>
      <Link
        to={`/product/${info?._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>
        <Container>
          <ImgContainer>
            <Img alt="product" src={info?.photo[0]} />
          </ImgContainer>

          {/* Product Information */}
          <InformationContainer>
            <Header>{info?.title}</Header>
            <Info>{info?.sizeAvailable?.length} Size </Info>
            <Info>{info?.colourAvailable?.length} Colour </Info>
            <Price>
              MRP:
              <CurrencyRupee style={{ transform: "scale(0.7)" }} />
              {info?.cost}
            </Price>
          </InformationContainer>
        </Container>
      </Link>
    </>
  );
};

export default SliderCard;
