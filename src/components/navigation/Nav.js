import React, { useEffect, useState } from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
const Nav = (props) => {
    const [isShow, setShow] = useState(true)
    let location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShow(false);
        }
    }, [])
    return (
        <>
            {isShow &&
                <div className="top-nav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users" exact>Users</NavLink>
                    <NavLink to="/projects" exact>projects</NavLink>
                    <NavLink to="/about" exact>about</NavLink>
                </div>
            }
        </>

    );
}

export default Nav;