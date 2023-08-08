import { userLogin, clearInfo } from "../redux/userSlice";
import { axiosInstance } from "./axiosInstance";

// Register:
export const register = async (name, email, password, navigate) => {
  try {
    await axiosInstance.post("auth/register", {
      name,
      email,
      password,
    });

    navigate("/signin");
  } catch (Error) {
    console.log(`Register Failure Error: ${Error}`);
  }
};

// Login:
export const login = async (email, password, navigate, dispatch) => {
  try {
    const user = await axiosInstance.post("auth/login", {
      email,
      password,
    });

    /* Storing userInfo in Redux: */
    dispatch(userLogin(user.data));

    navigate("/");
  } catch (Error) {
    console.log(`Register Failure Error: ${Error}`);
  }
};

// Logut:
export const logout = async (navigate, dispatch) => {
  try {
    dispatch(clearInfo());
    await axiosInstance.get("/auth/logout");
    navigate("/");
  } catch (Error) {
    console.log(`Logout Failure Error: ${Error}`);
  }
};
