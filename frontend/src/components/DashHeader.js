import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const DashHeader = () => {
    const { username, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [sendLogout, {
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const errClass = isError ? "error" : "offscreen";

    return (
        <>
            <Navbar className="top-navbar prevent-select" expand="sm">
                <Container>
                    <Navbar.Brand href="/dash">
                        <img
                            src="../../img/LECLogo.jpg"
                            width="50"
                            height="50"
                            className="d-inline-block align-center prevent-select"
                            alt="LEC Logo"
                        />
                        &nbsp;LeoContact
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav>
                            <Link className="nav-link" to="/dash/contacts">Contacts</Link>
                            <Link className="nav-link" to="/dash/contacts/export">Export Contacts</Link>
                            {isAdmin && <Link className="nav-link" to="/dash/users">Users</Link>}
                            <NavDropdown title={username} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#ComingSoon">
                                    Coming Soon...
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={sendLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <p className={errClass}>{error?.data?.message}</p>
        </>
    );
};

export default DashHeader;