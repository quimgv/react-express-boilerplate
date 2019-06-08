import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from '../components/Routing/PrivateRoute';
import PublicRoute from '../components/Routing/PublicRoute';

// Pages
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import ProfileSettings from '../pages/ProfileSettings';
import FourHandedFourError from '../pages/FourHandedFourError';

// Styles
import '../assets/css/style.css';
import '../assets/css/responsive.css';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

// Auth
import setAuthToken from '../utils/setAuthToken';

if (localStorage.Authorization) {
    setAuthToken(localStorage.Authorization);
}

const AppRouter = () => {

    useEffect(()=> {
        store.dispatch(loadUser());
    }, [])

    return (
        <Provider store={store}>
            <Switch>
                <PublicRoute exact path="/" component={Home} />
                <PrivateRoute path="/dashboard/" exact component={Dashboard} />
                <PrivateRoute path="/profile/" component={Profile} />
                <PrivateRoute path="/profile-settings/" component={ProfileSettings} />
                <Route path="/signup/" render={props => <Signup {...props} />} />
                <Route path="/login/" render={props => <Login {...props} />} />
                <Route path="/forgot-password/" render={props => <ForgotPassword {...props} />} />
                <Route path="*" render={props => <FourHandedFourError {...props} />} /> 
            </Switch> 
        </Provider>
    );
};

export default AppRouter;