import React, { useEffect, useState, useContext } from 'react';
import './NavHeader.scss'
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { UserContext } from "../../context/UserContext.js"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from "./../../logo.svg"
import { logout } from "./../services/userService.js"
import { toast, useToast } from 'react-toastify';
const NavHeader = (props) => {
    const location = useLocation();
    const { user, logoutContext } = useContext(UserContext);
    const history = useHistory();
    const handleLogoutUser = async () => {
        let data = await logout();
        localStorage.removeItem("jwt");
        logoutContext();
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            history.push("/login");
        }
        else {
            toast.error(data.EM);
        }
        return;
    }
    if ((user && user.isAuthenticated === true) || location.pathname === '/') {
        return (
            <>
                {/* <div className="top-nav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users" exact>Users</NavLink>
                    <NavLink to="/projects" exact>projects</NavLink>
                    <NavLink to="/about" exact>about</NavLink>
                </div> */}
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
                        <Container>
                            <Navbar.Brand href="/" className='nav-brand'>
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                React-Bootstrap
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                                    <NavLink to="/users" exact className="nav-link">Users</NavLink>
                                    <NavLink to="/projects" exact className="nav-link">projects</NavLink>
                                    <NavLink to="/about" exact className="nav-link"> about</NavLink>

                                </Nav>
                                <Nav>
                                    {
                                        user && user.isAuthenticated === true ?
                                            <>
                                                <Nav.Item className='nav-link'>Welcome {user.account.username} !</Nav.Item>
                                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                    <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item onClick={() => { handleLogoutUser() }}>
                                                        Log out
                                                    </NavDropdown.Item>
                                                </NavDropdown>

                                            </>
                                            :
                                            <>
                                                <Link className='nav-link' to="/login">Login</Link>
                                            </>
                                    }



                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>

        );
    }
    else {
        return (<></>)
    }
}

export default NavHeader;