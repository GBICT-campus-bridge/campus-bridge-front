import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = (): React.ReactElement => {
  const token = window.localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
