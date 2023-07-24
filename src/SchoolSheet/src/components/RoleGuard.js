import React from "react";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("schoolSoftUser"));

  const hasAllowedRole = user && user?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleGuard;
