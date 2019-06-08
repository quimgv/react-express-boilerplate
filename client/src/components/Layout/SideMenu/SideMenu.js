import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import * as Icon from "react-feather";
import "./SideMenu.css";

// Redux 
import { connect } from 'react-redux';

const SideMenu = ({ sideMenu }) => {
  return (
    <div
      className={`sidemenu-area sidemenu-light ${
        sideMenu ? "sidemenu-toggle" : ""
      }`}
    >
      <Navbar
        className={`sidemenu ${sideMenu ? "hide-nav-title" : ""}`}
      >
        <Navbar.Collapse>
          <Nav>
            <NavDropdown
              title={
                <div className="dropdown-title">
                  <Icon.User className="icon" />
                  <span className="title">
                    User
                    <Icon.ChevronRight className="icon fr" />
                  </span>
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavLink to="/signup/" className="dropdown-item">
                <Icon.UserPlus className="icon" />
                Sign Up
              </NavLink>
              <NavLink to="/login/" className="dropdown-item">
                <Icon.UserCheck className="icon" />
                Login
              </NavLink>
              <NavLink to="/forgot-password/" className="dropdown-item">
                <Icon.Unlock className="icon" />
                Forgot Password
              </NavLink>
            </NavDropdown>

            <NavLink to="/error-404/" className="nav-link">
              <Icon.ChevronRight className="icon" />
              <span className="title">Error 404</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
    sideMenu: state.sideMenu
})

export default connect(mapStateToProps)(SideMenu);
