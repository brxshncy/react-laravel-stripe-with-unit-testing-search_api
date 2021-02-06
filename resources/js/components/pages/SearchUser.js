import React from 'react';
import {
    Row,
    Col,
    Card,
    Input
} from 'reactstrap';

const SearchUser = () =>{
    return(
        <Row className="justify-content-center mt-3">
            <Col col={6}>
                <Card>
                        <Input placeholder="Search registered user"/>
                </Card>
            </Col>
        </Row>
    )
}

export default SearchUser;