import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
import { useAppContext } from "../hooks/useAppContext";
import { dashboardSideBarLinks } from "../utils/constants";

const DashboardLayout = () => {
  const [dropdown, setDropdown] = useState(false);
  const {
    isOpen: navbarIsOpen,
    toggle: toggleNavbar,
    closeSidebar,
    user,
    logout,
  } = useAppContext();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !sidebarRef?.current?.contains(event.target) &&
        document.body.getBoundingClientRect().width < 900
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-layout-wrapper">
      <div
        ref={sidebarRef}
        className={`sidebar-wrapper ${navbarIsOpen ? "toggle-navbar" : ""}`}
      >
        <div className="d-flex justify-content-end p-3 close-nav-button-wrapper">
          <button type="button" className="btn" onClick={toggleNavbar}>
            <FontAwesomeIcon icon={faClose} className="me-2" /> Close
          </button>
        </div>
        <div className="sidebar-top-wrapper">
          <ProfileImage
            wrapperClassName="school-image"
            src={user?.school?.schlogo}
          />
          <p title={user?.school?.schname}>{user?.school?.schname}</p>
        </div>
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
            <p className="ms-3">Welcome {user?.firstname}</p>
          </Nav>
          <Nav className="ms-auto" navbar>
            <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
              <DropdownToggle tag="div">
                <ProfileImage src={user.image} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link
                    className="py-3 nav-dropdown-link"
                    to="/app/change-password"
                  >
                    Change Password
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="py-3 nav-dropdown-link" to="/app/profile">
                    My Profile
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="py-3" onClick={logout}>
                  Logout
                </DropdownItem>
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
