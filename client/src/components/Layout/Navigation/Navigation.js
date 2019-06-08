import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./Navigation.css";
import { Navbar, Nav, Image } from "react-bootstrap";
import PropTypes from "prop-types";

// Components
import NavigationLinks from "./NavigationLinks";

// Logo image path
import Logo from "../../../assets/img/logo.png";
import SmallLogo from "../../../assets/img/small-logo.png";

// Redux
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { setSideMenu } from "../../../actions/sideMenu";

// User Images
import userImage from "../../../assets/img/user/undefined.gif";

const Navigation = ({
  sideMenu,
  logout,
  setSideMenu,
  isAuthenticated,
  user
}) => {
  const toggleClass = () => {
    setSideMenu(!sideMenu);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="page-wrapper">
      <Navbar fixed="top" className="top-menu">
        <Link
          to="/dashboard"
          className={`navbar-brand ${sideMenu ? "navbar-logo" : ""}`}
        >
          {/* Large logo */}
          <Image src={Logo} alt="Logo" className="large-logo" />
          {/* Small logo */}
          <Image src={SmallLogo} alt="Small Logo" className="small-logo" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Burger menu */}
        {isAuthenticated && (
          <div
            className={`burger-menu ${sideMenu ? "toggle-menu" : ""}`}
            onClick={() => toggleClass()}
          >
            <span className="top-bar" />
            <span className="middle-bar" />
            <span className="bottom-bar" />
          </div>
        )}
        {/* End Burger menu */}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto right-nav">
            <NavigationLinks
              isAuthenticated={isAuthenticated}
              logout={handleLogout}
              user={user}
              userImage={userImage}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

Navigation.propTypes = {
  setSideMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sideMenu: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  sideMenu: state.sideMenu,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, setSideMenu }
  )(Navigation)
);
