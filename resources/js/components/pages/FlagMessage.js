import React from 'react';
import {
    Row,
    Col,
    Alert
  
} from 'reactstrap'

const FlagMessage = ( { error, noAmount } ) => {

    
    return (
        
        <Row>
            <Col>
                <Alert 
                    className="text-center"
                    isOpen = { error || noAmount ? true : false} 
                    color={ error && "danger" || noAmount && "danger" }>
                                     {  error   } { noAmount }
                </Alert>
            </Col>
        </Row>
        
        
    )
    
}

export default FlagMessage;