import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { UserContext } from "./../../context/UserContext.js"
const Nav = (props) => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    if ((user && user.isAuthenticated === true) || location.pathname === '/') {
        return (
            <>
                <div className="top-nav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users" exact>Users</NavLink>
                    <NavLink to="/projects" exact>projects</NavLink>
                    <NavLink to="/about" exact>about</NavLink>
                </div>

            </>

        );
    }
    else {
        return (<></>)
    }
}

export default Nav;