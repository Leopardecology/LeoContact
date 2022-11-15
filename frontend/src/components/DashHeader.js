import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileCirclePlus, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import PulseLoader from 'react-spinners/PulseLoader';

import {useSendLogoutMutation} from '../features/auth/authApiSlice';

const CONTACTS_REGEX = /^\/dash\/contacts(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {

    const {username, isAdmin} = useAuth();

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onNewContactClicked = () => navigate('/dash/contacts/new');
    const onNewUserClicked = () => navigate('/dash/users/new');

    let newContactButton = null;
    if (CONTACTS_REGEX.test(pathname)) {
        newContactButton = (
            <button
                className="icon-button"
                title="New Contact"
                onClick={onNewContactClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus}/>
            </button>
        );
    }

    let newUserButton = null;
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus}/>
            </button>
        );
    }

    const errClass = isError ? "error" : "offscreen";

    let buttonContent;
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"}/>;
    } else {
        buttonContent = (
            <>
                {newContactButton}
                {newUserButton}
            </>
        );
    }

    return (
        <>
            <Navbar className="top-navbar" expand="sm">
                <Container>
                    <Navbar.Brand href="/dash">
                        <img
                            src="../img/LECLogo.jpg"
                            width="50"
                            height="50"
                            className="d-inline-block align-center"
                            alt="LEC Logo"
                        />{' '}
                        LeoContact
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/dash/contacts">Contacts</Nav.Link>
                            {(isAdmin) && <Nav.Link href="/dash/users">Users</Nav.Link>}
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

            <Container>
                {buttonContent}
            </Container>

            <p className={errClass}>{error?.data?.message}</p>
        </>
    );
};
export default DashHeader;