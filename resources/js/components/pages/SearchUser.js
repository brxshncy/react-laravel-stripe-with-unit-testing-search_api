import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Input
} from 'reactstrap';
import UserList from './UserList';


const SearchUser = () =>{

    const [userResult, setUserResult] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const header = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
  
    const handleUserSearch = (userSearchKeyword) => {
        setLoading(true)
        axios.get('/api/search',{ 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                userSearchKeyword: userSearchKeyword
            }
        } )
        .then(res => {
          
            if (res.data.success) {
               
                setUserResult(res.data.data);
                setLoading(false)
            }
        })
        .catch( err => 
            console.log(err)
        )
    }

    const fetchUser = () => {

          setLoading(true)
          axios.get('/api/user', header)
          .then(res => {
            
            if (res.data.success) { 
                
                setUsers(res.data.data)
                setLoading(false)
            }

          })
          .catch(err => console.log(err))
    }
    

    useEffect(() => {

        fetchUser();

    }, [])




    return(
        <>
        <Row className="justify-content-center mt-3">
            <Col>
                <Card>
                        <Input
                             placeholder="Search registed user, Powered by Algolia"
                             onChange= {(e) => handleUserSearch(e.target.value) }
                            
                             />
                </Card>
            </Col>
        </Row>

            <UserList
                     loading = {loading}
                     users= { users } 
                     userResult = {userResult}/>
        </>
    )
}

export default SearchUser;