import React from 'react';
import { Link } from "react-router-dom";
import {Row, Col, Form, Button } from 'react-bootstrap';

class ForgotPassword extends React.Component {

    onForgotHandler = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="auth-main-content">
                <div className="d-table">
                    <div className="d-tablecell">
                        <div className="auth-box">
                            <Row className="justify-content-md-center">
                                <Col md={8}>
                                    <div className="form-content">
                                        <h1 className="heading">Forgot password</h1>
                                        <Form onSubmit={this.onForgotHandler}>
                                            <Form.Group>
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" />
                                            </Form.Group>
                                            
                                            <div className="text-center">
                                                <Button variant="primary" type="submit">
                                                    Send the Reset Instruction
                                                </Button>
                                                <Link to="/login/" className="fp-link">Log In</Link>
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
}

export default ForgotPassword;