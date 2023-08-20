import { axiosInstance } from "./axiosInstance";
import { userLogin, clearInfo } from "../redux/userSlice";
import { clearCart, storeCart } from "../redux/cartSlice";
import { clearWishlist, storeWishlist } from "../redux/wishlistSlice";

// Register:
export const register = async (
  name,
  email,
  password,
  navigate,
  registerFailure,
  registerSuccess
) => {
  try {
    await axiosInstance.post("auth/register", {
      name,
      email,
      password,
    });

    registerSuccess();
    navigate("/signin");
  } catch (Error) {
    registerFailure();
    console.log(`Register Failure Error: ${Error}`);
  }
};

// Login:
export const login = async (
  email,
  password,
  navigate,
  dispatch,
  loginError,
  loginSuccess
) => {
  try {
    const userInfo = await axiosInstance.post("auth/login", {
      email,
      password,
    });

    const { cart, wishlist, cartSummary, ...user } = userInfo?.data;

    const cartInfo = cart?.productList.map((product) => {
      const { selectedQuantity, selectedColour, selectedSize, productInfo } =
        product;

      const obj = {
        selectedSize: selectedSize,
        selectedColour: selectedColour,
        selectedQuantity: selectedQuantity,
        ...productInfo,
      };

      return obj;
    });

    /* Storing Info in Redux: */
    dispatch(userLogin(user));
    dispatch(storeWishlist(wishlist));
    dispatch(storeCart({ cartInfo, cartSummary }));

    loginSuccess();
    navigate("/");
  } catch (Error) {
    loginError();
    console.log(`Register Failure Error: ${Error}`);
  }
};

// Logout:
export const logout = async (
  id,
  navigate,
  dispatch,
  wishlistProductId,
  cartProductId,
  cartSummary,
  signOut
) => {
  try {
    await axiosInstance.post("/auth/logout", {
      id,
      cartProductId,
      wishlistProductId,
      cartSummary,
    });

    dispatch(clearInfo());
    dispatch(clearCart());
    dispatch(clearWishlist());

    signOut();
    navigate("/");
  } catch (Error) {
    console.log(`Logout Failure Error: ${Error}`);
  }
};
