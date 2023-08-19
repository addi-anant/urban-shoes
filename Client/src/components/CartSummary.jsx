import { styled } from "styled-components";
import { CurrencyRupee } from "@mui/icons-material";
import { mobile, mobileXL } from "../utils/responsive";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

const PaymentWrapper = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const PaymentText = styled.p`
  margin: 0px;
  display: flex;
  font-size: 18px;
  font-weight: 500;
  align-items: center;
  font-family: "Nunito", sans-serif;
`;

const Hr = styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin: 20px 0px;
  font-weight: 600;
  border-radius: 50px;
  background-color: black;
  font-family: "Nunito", sans-serif;

  &:hover {
    opacity: 0.8;
  }
`;

const CartSummary = ({ cart, openPayment }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Heading> Summary </Heading>
      <PaymentWrapper>
        <Payment>
          <PaymentText>Subtotal</PaymentText>
          <PaymentText>
            <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
            {cart?.cartSummary}
          </PaymentText>
        </Payment>
        <Payment>
          <PaymentText>Estimated Shipping & Handling</PaymentText>
          <PaymentText>
            <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
            {cart?.cartSummary !== 0 ? 99 : 0}
          </PaymentText>
        </Payment>

        <Hr />
        <Payment>
          <PaymentText>Total</PaymentText>
          <PaymentText>
            <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
            {cart?.cartSummary + (cart?.cartSummary !== 0 ? 99 : 0)}
          </PaymentText>
        </Payment>
        <Hr />
      </PaymentWrapper>
      {width <= 1024 ? null : <Button onClick={openPayment}>Checkout</Button>}
    </>
  );
};

export default CartSummary;
