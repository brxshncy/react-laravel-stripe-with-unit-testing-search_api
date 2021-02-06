import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col
} from 'reactstrap'

import UserTable from './UserTable';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const UserList = ( { userResult, users, loading} ) => {

    return(
        <Row className="justify-content-center mt-3">

            <Col>
                <Card>
                    <CardHeader className="text-center">User Lists</CardHeader>
                        <CardBody>
                                { loading ? 
                                    <Row className="text-center">
                                        <Col>
                                            <Loader
                                                type="Rings"
                                                color="#00BFFF"
                                                height={50}
                                                width={50}
                                            />
                                        </Col>
                                    </Row>
                                    :
                                    
                                    <UserTable 
                                    users = { userResult.length  > 0 ? userResult : users } />
                                            
                                }
                               
                        </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default UserList;