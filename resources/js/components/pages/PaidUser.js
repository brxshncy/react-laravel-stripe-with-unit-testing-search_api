import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col
} from 'reactstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const PaidUser = ( { charges, loading }) =>{
    return(

        <Card className="mt-3">
            <CardHeader>
                Paid Users
            </CardHeader>
                <CardBody>
                { 
                loading ?
                            <Row className="justify-content-center text-center">
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
                    <Table className="text-center" striped bordered>
                    <thead>
                        <tr>
                            <td>Customer</td>
                            <td>Amount</td>
                            <td>Receipt Email</td>
                        </tr>
                    </thead>
                        <tbody>
                      
                            { charges.length > 0 ? charges.map(charge => {
                            
                                return(       
                                    <tr key={charge.id}>
                                        <td>
                                            {charge.billing_details.name}
                                        </td>
                                        <td>
                                            { charge.amount}
                                        </td>
                                        <td>
                                            { charge.receipt_email  }
                                        </td>
                                    </tr>
                                )

                            }) : <tr><td colSpan="3">No Paid user yet.</td></tr>}
                        </tbody>
                    </Table>   
                }

                </CardBody>
        </Card>
    )
}

export default PaidUser;