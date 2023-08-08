import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { logout } from "../utils/authentication";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const OuterContainer = styled.div`
  width: 94%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Container = styled.div`
  gap: 12px;
  height: 100%;
  padding: 10px 0px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.p`
  margin: 0px;
  font-size: 12px;
  font-family: "Nunito", sans-serif;
`;

const Strip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  return (
    <Wrapper>
      <OuterContainer>
        {!user ? (
          <Container>
            <Text> Find a store </Text>
            <Text> | </Text>
            <Text> Help </Text>
            <Text> | </Text>

            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}>
              <Text> Register </Text>
            </Link>
            <Text> | </Text>
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}>
              <Text> Sign In </Text>
            </Link>
          </Container>
        ) : (
          <Container>
            <Text> {user?.name} </Text>
            <Text> | </Text>

            <Text onClick={() => logout(navigate, dispatch)}> Logout </Text>
          </Container>
        )}
      </OuterContainer>
    </Wrapper>
  );
};

export default Strip;
