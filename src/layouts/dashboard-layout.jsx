import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout-wrapper">
      <div className="top-nav-wrapper"></div>
      <div className="content-wrapper">
        <div className="sidebar-wrapper"></div>
        <div className="content-inner-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
