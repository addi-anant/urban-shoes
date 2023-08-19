import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Home from "./Home";

const Authorized = () => {
  const { user } = useSelector((store) => store.user);

  return !user ? <Home /> : <Outlet />;
};

export default Authorized;
