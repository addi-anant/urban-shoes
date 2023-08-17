import styled from "styled-components";
import { Link } from "react-router-dom";
import { Clear, CurrencyRupee } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  position: relative;
  height: max-content;
`;

const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Header = styled.p`
  padding: 5px 0px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  font-family: "Nunito", sans-serif;
  font-family: "Inter", sans-serif;
`;

const DeleteButton = styled.button`
  top: 10px;
  right: 10px;
  z-index: 100;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  background: transparent;
`;

const InformationContainer = styled.div`
  padding: 5px;
`;

const Price = styled.span`
  display: flex;
  font-size: 16px;
  color: #424242;
  font-weight: 600;
  align-items: center;
  font-family: "Nunito", sans-serif;
`;

const Explore = styled.div`
  width: 100%;
  height: 50px;
  bottom: 0px;
  display: flex;
  color: black;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-family: "Nunito", sans-serif;
  opacity: ${(props) => (props.visible === "true" ? "0.8" : "0.0")};
`;

const WishlistCard = ({ info }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Container>
        <DeleteButton
          onClick={() => dispatch(removeFromWishlist({ _id: info?._id }))}>
          <Clear />
        </DeleteButton>
        <ImgContainer>
          <Img
            alt="product"
            src={info?.photo[0]}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          />
          <Link
            to={`/product/${info?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}>
            <Explore
              visible={visible.toString()}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}>
              Explore
            </Explore>
          </Link>
        </ImgContainer>

        <Link
          to={`/product/${info?._id}`}
          style={{ textDecoration: "none", color: "inherit" }}>
          <InformationContainer>
            <Header>{info?.title}</Header>
            <Price>
              MRP:
              <CurrencyRupee style={{ transform: "scale(0.7)" }} />
              {info?.cost}
            </Price>
          </InformationContainer>
        </Link>
      </Container>
    </>
  );
};

export default WishlistCard;
