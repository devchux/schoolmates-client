import React from "react";
import { Outlet } from 'react-router-dom'
import logoImage from "../assets/images/logo.jpeg";
import { AuthBannerIcon } from "../assets/svgs";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout-wrapper">
      <div className="auth-layout-image-wrapper">
        <div className="auth-layout-image-inner-wrapper">
          <div>
            <img src={logoImage} alt="logo" />
          </div>
          <div>
            <AuthBannerIcon />
          </div>
        </div>
      </div>
      <div className="auth-layout-form-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
