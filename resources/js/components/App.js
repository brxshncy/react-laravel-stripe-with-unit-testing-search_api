import React from 'react';
import { render } from 'react-dom';
import {
    Container,
    Row,
    Col,
    Card,
} from 'reactstrap'

import {
    BrowserRouter as
    Router,
    Switch,
    Route
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import {AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './route/PrivateRoute';


const App = () => {
    return(
       <Container>
              <Router>
                <AuthContextProvider>
                    <Switch>

                            <Route path="/login" exact  component = { Login }/>

                            <Route path="/signup" exact component = { Signup}/>

                            <PrivateRoute path="/" exact component = { Home }/>

                    </Switch>

                </AuthContextProvider>
           </Router>
       </Container>
    )
}

export default App;
render(<App />, document.getElementById('app'))