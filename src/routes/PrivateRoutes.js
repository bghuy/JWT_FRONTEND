import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { useHistory, Redirect } from 'react-router-dom';
import {
    Route
} from 'react-router-dom';
function PrivateRoutes(props) {
    const { user } = useContext(UserContext);
    const history = useHistory();
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    }
    else {
        return (
            <>
                <Redirect to='/login'></Redirect>
            </>
        );
    }

}

export default PrivateRoutes;