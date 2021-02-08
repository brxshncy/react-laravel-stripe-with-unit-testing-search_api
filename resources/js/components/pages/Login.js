import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FormGroup,
    Label,
    Input,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap'

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import FlagMessage from './FlagMessage';

const Login = () => {

    const { handleLogin, setLoginData, loginData, error } = useContext(AuthContext)
    
    return(
        <Row className="mt-5 justify-content-center">
            <Col md={6}>
                <Card>
                    <CardHeader>Signup</CardHeader>
                        <Form onSubmit={ (e) => handleLogin(e) }>
                            <CardBody>
   
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input 
                                                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                                value={ loginData.email }
                                            />
                                        </FormGroup>
                                    </Col>    
                                </Row>       
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input 
                                                type="password"
                                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                                value={ loginData.password }
                                            />
                                        </FormGroup>
                                    </Col>   

                                </Row>     
                                <small>Not yet signed up? <Link to="/signup">Signup here</Link></small>
                                 {error &&
                                     <FlagMessage 
                                            error= {error.serverMessage} />}
                                <Row>
                                    <Col></Col>
                                    <Col className="text-right">
                                        <Button className="btn btn-block" color="success">Login</Button>
                                    </Col>    
                                </Row>            
                            </CardBody>
                        </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login