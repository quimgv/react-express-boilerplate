import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Image } from "react-bootstrap";
import * as Icon from "react-feather";

const NavigationLinks = ({ isAuthenticated, logout, user, userImage }) => {

  switch (isAuthenticated) {
    case null:
      return <div></div>;
    case false:
      return (
        <div className="qg-menu-links">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </div>
      );
    default:
      return (
        <NavDropdown
          title={
            <div className="menu-profile">
              <span className="name">{user && user.name}</span>
              <Image src={user && user.avatar ? `/users/${user._id}/avatar` : userImage} alt="Profile Image" roundedCircle />
            </div>
          }
          id="basic-nav-dropdown"
          className="profile-nav-item"
        >
          <NavLink to="/profile/" className="dropdown-item">
            <Icon.User className="icon" />
            Profile
          </NavLink>
          <NavLink to="/profile-settings/" className="dropdown-item">
            <Icon.Settings className="icon" />
            Settings
          </NavLink>
          <NavLink exact to="/" className="dropdown-item" onClick={logout}>
            <Icon.LogOut className="icon" />
            Logout
          </NavLink>
        </NavDropdown>
      );
  }
};

export default NavigationLinks;
