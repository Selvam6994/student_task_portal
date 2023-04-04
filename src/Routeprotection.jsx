import React from "react";
import { Navigate } from "react-router-dom";

function Routeprotection({ children }) {
  const token = sessionStorage.getItem("token");
  return token ? (
    <section>{children}</section>
  ) : (
    <Navigate replace to="/"></Navigate>
  );
}

export default Routeprotection;
