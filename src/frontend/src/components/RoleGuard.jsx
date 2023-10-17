import React from "react";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("schoolSoftUser"));

  if (user?.roles?.length === 1 && user.roles[0] === "sales") {
    return <Navigate to="/sales" />;
  }

  if (user?.roles?.length === 1 && user.roles[0] === "stock") {
    return <Navigate to="/stock" />;
  }

  const hasAllowedRole = user && user?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleGuard;
