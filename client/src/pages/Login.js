import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux
import { setAlert, clearAlerts } from '../actions/alert';
import { login } from '../actions/auth';

// Components
import Alert from '../components/Common/Alert';

// Fields validation
import { loginValidation } from '../validation/auth';

const Login = ({ login, isAuthenticated, setAlert, clearAlerts }) => {

    useEffect(() => {
        clearAlerts();
    }, []);

    const [formData, setFormData] = useState({ email: '', password: ''});

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { errors } = loginValidation(email, password);

        // Check validation
        if(errors.length > 0) {
            return errors.forEach(error => setAlert(error.msg, 'danger', 20000));
        }

        login(email, password);
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="auth-main-content">
            <div className="d-table">
                <div className="d-tablecell">
                    <div className="auth-box">
                        <Row className="justify-content-md-center">
                            <Col md={8}>
                                <div className="form-content">
                                    <Alert />
                                    <h1 className="heading">Log In</h1>
                                    <Form onSubmit={(e) => onSubmit(e)}>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                value={email}
                                                onChange={(e) => onChange(e)}
                                                name="email"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                value={password}
                                                onChange={(e) => onChange(e)}
                                                name="password"
                                            />
                                        </Form.Group>

                                        <div className="text-center">
                                            <Button variant="primary" type="submit">
                                                Log In
                                            </Button>

                                            <Link 
                                                to="/forgot-password/" 
                                                className="fp-link">
                                                Forgot Password?
                                            </Link>
                                            <Link 
                                                to="/signup/" 
                                                className="fp-link">
                                                Sign up
                                            </Link>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.prototypes = {
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, setAlert, clearAlerts })(Login);