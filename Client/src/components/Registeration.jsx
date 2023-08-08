import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { RegisterationSchema } from "../formSchema";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";

import { Google } from "@mui/icons-material";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 50px 0px;
  height: max-content;
  align-items: center;
  justify-content: center;
  background-color: #efedee;

  ${mobileXL({
    padding: "25px 0px",
  })}

  ${mobile({
    padding: "25px 0px",
  })}
`;

const Wrapper = styled.div`
  width: 60vw;
  height: 600px;
  display: flex;
  overflow: hidden;
  background: #fff;
  border-radius: 10px;

  ${laptop({
    width: "90vw",
  })}

  ${tablet({
    width: "60vw",
  })}

  ${mobileXL({
    width: "80vw",
  })}

  ${mobile({
    width: "90vw",
  })}
`;

const Left = styled.div`
  flex: 1.6;
  background: #fff;
  padding: 40px 30px 20px;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 42px;
  color: #55311c;
  padding-bottom: 20px;
`;

const Form = styled.form``;

const InputBlock = styled.div`
  display: flex;
  border-radius: 4px;
  margin-bottom: 20px;
  flex-direction: column;
  padding: 10px 10px 8px;
  border: 1px solid #ddd;
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid red;
  }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #8c7569;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  font-size: 16px;
  padding: 4px 0 0;
`;

const PartitionWrapper = styled.div`
  border: none;
  position: relative;
  border-top: 1px solid lightgray;
  margin: 30px 0px 0px 0px;
`;

const Or = styled.div`
  top: -18px;
  z-index: 1;
  width: 25px;
  height: 25px;
  padding: 5px;
  margin: auto;
  display: flex;
  font-size: 14px;
  position: relative;
  border-radius: 50%;
  align-items: center;
  border: 1px solid lightgray;
  justify-content: center;
  background-color: white;
`;

const GoogleAuthWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AuthText = styled.div`
  font-size: 16px;
  color: gray;
  font-weight: bold;
  padding-left: 15px;
  font-family: "Nunito", sans-serif;
`;

const Right = styled.div`
  flex: 2;
  overflow: hidden;

  ${tablet({
    display: "none",
  })}

  ${mobileXL({
    display: "none",
  })}

  ${mobile({
    display: "none",
  })}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  transform: scale(1);
  -o-object-fit: cover;
  object-fit: cover;
  transition-duration: 1.2s;
`;

const Button = styled.button`
  border: 0;
  width: 100%;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 4px;
  background: #8c7569;
  padding: 1.2rem 3.2rem;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-size: 16px;

  &:hover {
    background: #55311c;
  }
`;

const SignUp = styled.p`
  font-size: 13px;
  margin: 20px 0 0;
  text-align: center;
  font-family: "Nunito", sans-serif;
`;

const Registration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [error, setError] = useState(null);

  console.log(error);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterationSchema,
      onSubmit: (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );
  console.log(values);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((userCredentials) => {
      auth.onAuthStateChanged((credentials) => {
        credentials.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            console.log(data);
            // save user information in the database, only if no user with provided email already exists.
            // you have entire user data here, from Google => save it in redux and then redirect to the home page of the app.
          });
        });
      });
    });
  };

  const signUpWithEmailAndPasswordHandler = () => {
    const { name, email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        console.log(user);

        const jwtToken = user.accessToken;
        // you have entire user data here with JWT token, from Google => save it in both redux and database and then redirect to the home page of the app.
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError("Please fill all fields.");
        }
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Provided email is already in use.");
        }
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Title>Welcome!</Title>
            <Form onSubmit={handleSubmit}>
              {/* Name: */}
              <InputBlock child={errors.name && touched.name ? 1 : null}>
                <Label htmlFor="name" className="input-label">
                  Name
                </Label>

                <Input
                  type="name"
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {errors.name && touched.name ? (
                  <FormError>{errors.name}</FormError>
                ) : null} */}
              </InputBlock>

              {/* Email: */}
              <InputBlock child={errors.email && touched.email ? 2 : null}>
                <Label>Email</Label>
                <Input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {errors.email && touched.email ? (
                  <FormError>{errors.email}</FormError>
                ) : null} */}
              </InputBlock>

              {/* Password: */}
              <InputBlock
                child={errors.password && touched.password ? 3 : null}>
                <Label>Password</Label>
                <Input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {errors.password && touched.password ? (
                  <FormError>{errors.password}</FormError>
                ) : null} */}
              </InputBlock>

              {/* Submit Button */}
              <Button onClick={signUpWithEmailAndPasswordHandler}>
                Registration
              </Button>
            </Form>

            <SignUp>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/signin">
                Sign In
              </Link>
            </SignUp>

            <PartitionWrapper>
              {/* <Divider /> */}
              <Or>OR</Or>
            </PartitionWrapper>

            <GoogleAuthWrapper onClick={signInWithGoogle}>
              <Google style={{ color: "#16FF00", transform: "scale(1.2)" }} />
              <AuthText>Sign up with Google.</AuthText>
            </GoogleAuthWrapper>
          </Left>
          <Right>
            <Img
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};
export default Registration;
