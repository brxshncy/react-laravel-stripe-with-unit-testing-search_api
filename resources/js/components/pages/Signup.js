import React, { useState, useEffect, useContext } from 'react';
import {
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

const Signup = ({ match, history }) => {

  const   { signUpData, setSignUpData, handleRegister, error } = useContext(AuthContext)

    
   


    return(
        <Row className="mt-5 justify-content-center">
            <Col md={6}>
                <Card>
                    <CardHeader>Signup</CardHeader>
                        <Form onSubmit={(e) => handleRegister(e)}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input
                                                rt
                                                onChange = {(e) => setSignUpData({...signUpData, name: e.target.value})}
                                                value={signUpData.name}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>   
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input 
                                                 onChange = {(e) => setSignUpData({...signUpData, email: e.target.value})}
                                                 value={signUpData.email}
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
                                                 onChange = {(e) => setSignUpData({...signUpData, password: e.target.value})}
                                                 value={signUpData.password}
                                            />
                                        </FormGroup>
                                    </Col>   
                                    <Col>
                                        <FormGroup>
                                            <Label>Retype Password</Label>
                                            <Input 
                                                type="password"
                                                 onChange = {(e) => setSignUpData({...signUpData, retype_password: e.target.value})}
                                                 value={signUpData.retype_password}
                                            />
                                        </FormGroup>
                                    </Col> 
                                </Row>     

                                 { error && 
                                        <FlagMessage error={error.invalid} />}

                                <Row>
                                    <Col>
                                        <Link to="/login">
                                         <Button type="button" className="btn btn-block" color="secondary">Back</Button>
                                        </Link>
                                    </Col>
                                    <Col className="text-right">
                                        <Button type="submit" className="btn btn-block" color="success">Register</Button>
                                    </Col>    
                                </Row>            
                            </CardBody>
                        </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Signup