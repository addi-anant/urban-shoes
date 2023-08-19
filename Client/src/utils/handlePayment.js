import { clearCart } from "../redux/cartSlice";
import { axiosInstance } from "./axiosInstance";

export const handlePayment = async (
  user,
  cart,
  dispatch,
  navigate,
  loginPayment,
  orderSuccessful
) => {
  if (!user) {
    loginPayment();
    return;
  }

  const key = await axiosInstance.get("/payment/key");

  const order = await axiosInstance.post("/payment", {
    amount: cart.cartSummary,
  });

  /* ID for the product bought: */
  const orderDetail = cart?.products?.map((product) => [
    product?._id,
    product?.selectedColour,
    product?.selectedSize,
    product?.selectedQuantity,
  ]);

  const options = {
    key: key?.data?.key,
    amount: order?.data?.amount,
    currency: "INR",
    name: "URBAN SHOES",
    image:
      "https://res.cloudinary.com/additya/image/upload/v1692425970/urban%20shoes/ygzxubdafzwwoqytm3hv.png",
    order_id: order?.data?.id,
    handler: async function (response) {
      await axiosInstance.post("/payment/verify", {
        orderDetail: orderDetail /* Required -> Colour, Size, Quantity, _id */,
        userId: user?._id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      /* Clear Cart, handle Success Message and Navigate to ORDERS page: */
      orderSuccessful();
      dispatch(clearCart());
      navigate("/order");
    },
    prefill: {
      name: user?.name,
      email: user?.email,
    },
    theme: {
      color: "#000000",
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};
