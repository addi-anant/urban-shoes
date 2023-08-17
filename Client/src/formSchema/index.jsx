import * as Yup from "yup";

export const RegisterationSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const SignupSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const AddProductSchema = Yup.object({
  title: Yup.string().required("*Required"),
  brand: Yup.string().required("*Required"),
  description: Yup.string().required("*Required"),
  cost: Yup.string().required("*Required"),
  sizeAvailable: Yup.string().required("*Required"),
  colourAvailable: Yup.string().required("*Required"),
  gender: Yup.string().required("*Required"),
  type: Yup.string().required("*Required"),
  photo: Yup.string().required("*Required - Atleast 1."),
});
