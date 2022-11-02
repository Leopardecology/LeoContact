import {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFilePen,
    faRightFromBracket,
    faUserGear,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import PulseLoader from 'react-spinners/PulseLoader';

import {useSendLogoutMutation} from '../features/auth/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const CONTACTS_REGEX = /^\/dash\/contacts(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {

    const {isAdmin} = useAuth();

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
    const onContactsClicked = () => navigate('/dash/contacts');
    const onUsersClicked = () => navigate('/dash/users');

    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !CONTACTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small";
    }

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

    let userButton = null;
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear}/>
                </button>
            );
        }
    }

    let contactsButton = null;
    if (!CONTACTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        contactsButton = (
            <button
                className="icon-button"
                title="Contacts"
                onClick={onContactsClicked}
            >
                <FontAwesomeIcon icon={faFilePen}/>
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

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    );

    const errClass = isError ? "error" : "offscreen";

    let buttonContent;
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"}/>;
    } else {
        buttonContent = (
            <>
                {newContactButton}
                {contactsButton}
                {userButton}
                {newUserButton}
                {logoutButton}
            </>
        );
    }

    return (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">techContacts</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    );
};
export default DashHeader;