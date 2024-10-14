import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = (): React.ReactElement => {
  const token = window.localStorage.getItem("token");
  return token ? <Navigate to="/" /> : <Outlet />;
};
