import React from 'react';

import Login from '../components/login/Login.js';
import Register from '../components/register/Register.js';
import User from '../components/manage-users/User.js';
import PrivateRoutes from './PrivateRoutes.js';
import {
    Switch,
    Route
} from 'react-router-dom';
function AppRoutes(props) {
    return (
        <>
            <Switch>
                <PrivateRoutes path={"/users"} component={User} />

                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="/projects" exact>
                    project page
                </Route>
                <Route path="/about" exact>
                    about page
                </Route>
                <Route path="*" >
                    <h1>404 not found</h1>
                </Route>
            </Switch>
        </>
    );
}

export default AppRoutes;