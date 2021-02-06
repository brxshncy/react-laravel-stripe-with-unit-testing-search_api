import React  from 'react';

import { Route, Redirect } from 'react-router-dom';


const  PrivateRoute = ( {component: Component, exact, ...rest} ) => {
    
    let token = localStorage.getItem('accessToken');


    return(

        <Route  exact render= {props => {
            return  token ? <Component {...props }/> : <Redirect to="/login"/>
        }} />
    )
}

export default PrivateRoute