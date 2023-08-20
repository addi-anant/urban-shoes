import { useFormik } from "formik";
import styled from "styled-components";
import React, { useEffect } from "react";
import { SignupSchema } from "../formSchema";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { login } from "../utils/authentication";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../utils/constant";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 50px 0px;
  height: max-content;
  align-items: center;
  justify-content: center;
  background-color: #efedee;
`;

const Wrapper = styled.div`
  width: 50vw;
  height: 420px;
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
  padding: 50px 30px 20px;
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
  &:nth-child(${(props) => props.number}) {
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

const SignIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSuccess = () => toast("Logged in successfully.");
  const loginError = () => toast("Invalid username or password!");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: (values, action) => {
        const { email, password } = values;
        login(email, password, navigate, dispatch, loginError, loginSuccess);
        action.resetForm();
      },
    });

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Title>Welcome!</Title>
            <Form onSubmit={handleSubmit}>
              {/* Email: */}
              <InputBlock number={errors.email && touched.email ? 1 : null}>
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
              </InputBlock>

              {/* Password: */}
              <InputBlock
                number={errors.password && touched.password ? 2 : null}>
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
              </InputBlock>

              {/* Submit Button */}
              <Button>Sign in</Button>
            </Form>

            <SignUp>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/register">
                Register
              </Link>
            </SignUp>
          </Left>

          <Right>
            <Img src={signIn} />
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};
export default SignIn;
