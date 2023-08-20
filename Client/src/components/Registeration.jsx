import { useFormik } from "formik";
import styled from "styled-components";
import React, { useEffect } from "react";
import { RegisterationSchema } from "../formSchema";
import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/authentication";
import { signUp } from "../utils/constant";
import { toast } from "react-hot-toast";

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
  width: 56vw;
  height: 500px;
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
  padding-bottom: 10px;
`;

const Form = styled.form``;

const InputBlock = styled.div`
  display: flex;
  margin-top: 10px;
  border-radius: 4px;
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

const ConditionWrapper = styled.div``;

const Text = styled.p`
  margin: 0px;
  color: red;
  font-size: 13px;
  font-weight: 600;
  margin: 10px 0px 20px 0px;
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

  /* Form Validation: */
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();
  const registerFailure = () =>
    toast("Error while registering, Please try again!");
  const registerSuccess = () =>
    toast("Registeration successfull, Please Login.");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterationSchema,
      onSubmit: (values, action) => {
        const { name, email, password } = values;
        register(
          name,
          email,
          password,
          navigate,
          registerFailure,
          registerSuccess
        );
        action.resetForm();
      },
    });

  return (
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
            </InputBlock>

            {/* Password: */}

            <InputBlock child={errors.password && touched.password ? 3 : null}>
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
            <ConditionWrapper>
              <Text>** Min. password length: 6</Text>
            </ConditionWrapper>

            {/* Submit Button */}
            <Button type="submit" onClick={handleSubmit}>
              Sign up
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
        </Left>
        <Right>
          <Img src={signUp} alt="" />
        </Right>
      </Wrapper>
    </Container>
  );
};
export default Registration;
