import {useEffect, useState} from "react";
import {useAddNewUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";
import newTitle from "../../hooks/useTitle";

const NewUserForm = () => {
    newTitle('LeoContacts - New User');

    const [addNewUser, {
        isSuccess,
        error,
    }] = useAddNewUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState("User");

    useEffect(() => {
        if (isSuccess) {
            setUsername('');
            setPassword('');
            setEmail('');
            setRoles('');
            navigate('/dash/users');
        }
    }, [isSuccess, navigate]);

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection
            (option) => option.value
        );
        setRoles(values); //TODO: fix this
    };

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        await addNewUser({username, password, email, roles});
    };

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option>
        );
    });

    return (
        <>
            <p className="error">{error?.data?.errors[0]?.msg}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-20 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[only Emails]</span></label>
                <input
                    className={`form__input`}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select`}
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </form>
        </>
    );
};
export default NewUserForm;