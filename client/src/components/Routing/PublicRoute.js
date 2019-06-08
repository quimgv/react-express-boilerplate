import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navigation from '../Layout/Navigation/Navigation';

const PublicRoute = ({ component: Component, auth: { isAuthenticated, loading }, sideMenu, ...rest }) => {
    return (
        <div className="page-wrapper">
            <Navigation />
            <div className={`main-content d-flex flex-column ${!sideMenu ? '' : 'hide-sidemenu'}`}>
                <Route {...rest} render={props => isAuthenticated && !loading ? (<Redirect to="/dashboard" />) : (<Component {...props} />)} />
            </div>
        </div>
);
    }

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    sideMenu: state.sideMenu
})

export default connect(mapStateToProps)(PublicRoute);