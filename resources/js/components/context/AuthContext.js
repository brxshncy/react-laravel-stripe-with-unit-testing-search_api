import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import {useHistory,Redirect} from 'react-router-dom';

export const AuthContext = createContext();


export const AuthContextProvider = ( props ) => {

    const [signUpData, setSignUpData] = useState({
        email: '',
        name: '',
        password: '',
        retype_password: ''
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
  
    const history = useHistory();

    const [error, setError] = useState({

        invalid: '',
        serverMessage: ''
    })

    const errorHandler = (data) => {

        

        if (data.password != data.retype_password) {
            setError({...error,
                invalid: "Password don't match"
            })

            return false

        }

        if (data.response && data.response.status === 401) {

            console.log(data.response.data.data)

            setError({...error,
                serverMessage: data.response.data.data

            })
            return false
        }

        return true;
        
    }

  
    const handleRegister = (e) =>{
        e.preventDefault();

        if (errorHandler(signUpData)) {

            setError({...error,
                invalid:''
            })

            axios.post('/api/register', signUpData)
            .then( res => {
                if (res.data.success) {

                  
                    history.push('/login');
                }
                
            })
            .catch( err =>{
                console.log(err)
            })
        }
        
    }
    
    const handleLogin = (e) => {

        e.preventDefault();
        axios.post('/api/login', loginData)
        .then( res => {
           if(res.data.success) {

               localStorage.setItem('accessToken', res.data.data.accessToken)

               localStorage.setItem('user', JSON.stringify(res.data.data.user))

               history.push('/')
           }
        })
        .catch( err => {
            errorHandler(err)
         
        })

    }
  

    return(

        <AuthContext.Provider value={{ signUpData, setSignUpData, handleRegister, error, loginData, setLoginData, handleLogin }}>

            { props.children }

        </AuthContext.Provider>

    )
}