import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { clearAlerts } from '../../actions/alert';

// Components
import Navigation from '../Layout/Navigation/Navigation';
import Footer from '../Layout/Footer/Footer';
import SideMenu from '../Layout/SideMenu/SideMenu';
import Alert from '../Common/Alert';


const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, sideMenu, alerts, clearAlerts, ...rest } ) => {

    useEffect(() => {
        if(alerts.length > 0) {
            clearAlerts();
        }
    }, [Component]);

    return (
        <div className="page-wrapper">
            <Navigation />
            <SideMenu />
            <div className={`main-content d-flex flex-column ${!sideMenu ? '' : 'hide-sidemenu'}`}>
                <Alert />
                <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)} />
                <Footer /> 
            </div>
        </div>
);
    }

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    sideMenu: state.sideMenu,
    alerts: state.alert
})

export default connect(mapStateToProps, { clearAlerts })(PrivateRoute);