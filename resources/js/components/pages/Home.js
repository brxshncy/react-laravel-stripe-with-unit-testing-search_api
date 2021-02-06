import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Input,
    CardBody,
} from 'reactstrap'

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import FlagMessage from './FlagMessage';
import PaidUser from './PaidUser';
import SearchUser from './SearchUser';


const stripeKey = 'pk_test_51HTQZqGxwQufiUoYUN0coCdDhbgWivP0hLhITwPM13KVkUWx4mcwpqrQtsc2qvL0GijszWOU36AHkJrIJe4LSBD800LXiJuBP3';


const Home = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    const [paymentData, setpaymentData] = useState(
        {
            user_id: user.id,
            name: user.name,
            amount:'',   
        }
    );
    
   
    const [charges, setCharges] = useState([])
    
    const [flagError, setFlagError] = useState("")

    const [loading, setLoading] = useState(false);
    


    const handleToken = (token, addresses) => {

        let data =  {
            stripeToken: token.id,
            amount: paymentData.amount,
            name:token.card.name,
            email:token.email,
            currency: 'PHP',
            customer: paymentData.user_id,
            description: 'Just a random payment for testing',
            address: token.card.address_city ,
            address_country: token.card.address_country,
            address_line1: token.card.address_line_1

        }   

        if (paymentData.amount !=='') {
            setLoading(true)

            axios.post('/api/payment', data, headers)
            .then(res =>{
               
                if (res.data.success) {
                    fetchUserPaid()
                    setLoading(false)
                }
            })
            .catch(err => {

                console.log(err)

            })
        }
        else {
            setFlagError("Please enter an amount!");
        }
            
    }

    
    const fetchUserPaid = () => {
        
        setLoading(true)
        axios.get('/api/payment', headers)
        .then(res => {
           
            if (res.data.success) {

                setCharges(res.data.data.data)
                
             

                 setLoading(false)
            }
        })
        .catch(err => {
            console.log(err);
        })

    }
    
    useEffect(() => {

        fetchUserPaid()

    }, [])

  
    return(
        <Row className="justify-content-center mt-5 mb-5">

            <Col md={8}>

           
                <Card className="mt-5 mb-2">

                    <CardBody>
                        <Row className="justify-content-center">

                            <Col md={7}>
                                <Input 
                                type="number" 
                                onChange={(e) => setpaymentData({...paymentData, amount: e.target.value})}
                                value={paymentData.amount}
                                placeholder="Enter an amount"/>
                            </Col>

                            <Col md={4}>
                                <StripeCheckout 
                                    token={handleToken}
                                    stripeKey={stripeKey}
                                    amount={paymentData.amount * 100}
                                    currency="PHP"
                                    billingAddress
                                    shippingAddress
                                    customer={user.id}
                                />
                            </Col>

                        </Row>

                    </CardBody>
                </Card>
               { flagError && 
                    <FlagMessage noAmount = {flagError} />}

                <PaidUser loading = {loading} charges= { charges }/>
                
                <SearchUser />
            </Col>

                
        </Row>
    )
}

export default Home