import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
} from "reactstrap";
import Hamburger from "../components/common/hamburger";
import ProfileImage from "../components/common/profile-image";
import { NavbarContext } from "../context/navbar";
import { UserContext } from "../context/user";
import { dashboardSideBarLinks } from "../utils/constants";

const DashboardLayout = () => {
  const [dropdown, setDropdown] = useState(false);
  const { isOpen: navbarIsOpen, toggle: toggleNavbar } =
    useContext(NavbarContext);
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard-layout-wrapper">
      <div className={`sidebar-wrapper ${navbarIsOpen ? "toggle-navbar" : ""}`}>
        <div className="sidebar-top-wrapper"></div>
        <div className="sidebar-links-wrapper">
          {dashboardSideBarLinks[user?.designation_name]?.map((item, i) => (
            <NavLink key={i} to={item?.to}>
              <FontAwesomeIcon icon={item?.icon} />
              <p>{item.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="content-wrapper">
        <Navbar color="light" expand="md" className="px-4 py-3" light>
          <Nav className="align-items-center">
            <Hamburger onClick={toggleNavbar} />
            <p className="ms-3">Welcome Onyedika</p>
          </Nav>
          <Nav className="ms-auto" navbar>
            <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
              <DropdownToggle tag="div">
                <ProfileImage />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="py-3">Change Password</DropdownItem>
                <DropdownItem className="py-3">My Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="py-3">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
        <div className="content-inner-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
