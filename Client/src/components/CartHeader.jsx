import { styled } from "styled-components";
import { CurrencyRupee } from "@mui/icons-material";
import { mobile, mobileXL } from "../utils/responsive";

const TopHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: max-content;
  height: max-content;
  padding: 0px 0px 25px 0px;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "24px",
  })}

  ${mobile({
    fontSize: "20x",
  })}
`;

const TextWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;

  ${mobileXL({
    fontSize: "17px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const Hr = styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
`;

const ProductCost = styled.p`
  margin: 0px;
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  display: flex;
  align-items: center;

  ${mobileXL({
    fontSize: "17px",
  })}

  ${mobile({
    fontSize: "15px",
  })}
`;

const CartHeader = ({ length, cartSummary }) => {
  return (
    <TopHeadingWrapper>
      <TopHeadingContainer>
        <Heading> Bag </Heading>
        <TextWrapper>
          <Text>{length} Items</Text>
          <Text>|</Text>
          <Text>
            <ProductCost>
              <CurrencyRupee style={{ transform: "scale(0.7)" }} />
              {cartSummary}
            </ProductCost>
          </Text>
        </TextWrapper>
      </TopHeadingContainer>
      <Hr />
    </TopHeadingWrapper>
  );
};

export default CartHeader;
