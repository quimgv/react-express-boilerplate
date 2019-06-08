import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

// Redux
import { setAlert, clearAlerts } from '../actions/alert';
import { register } from '../actions/auth';

// Components
import Alert from '../components/Common/Alert';

// Fields validation
import { signupValidation } from '../validation/auth';

const Signup = ({ register, isAuthenticated, setAlert, clearAlerts }) => {

    useEffect(() => {
        clearAlerts();
    }, []);

    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {

        e.preventDefault();

        const { errors } = signupValidation(name, email, password, password2);

        // Check validation
        if(errors.length > 0) {
            return errors.forEach(error => setAlert(error.msg, 'danger', 20000));
        }

        // Register user
        register({name, email, password});
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
                            <Col md={10}>
                                <div className="form-content">
                                    <Alert />
                                    <h1 className="heading">Sign Up</h1>
                                    <Form onSubmit={(e) => onSubmit(e)}>
                                        <Form.Group>
                                            <Form.Label>Your name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="name"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                name="email"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                name="password"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Confirm password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                name="password2"
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Form.Group>

                                        <div className="text-center">
                                            <Button variant="primary" type="submit">
                                                Sign Up
                                            </Button>

                                            <Link 
                                                to="/login/" 
                                                className="fp-link">
                                                Already have an account?
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

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, { setAlert, register, clearAlerts })(Signup);