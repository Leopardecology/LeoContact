import {useEffect, useState} from "react";
import {useDeleteUserMutation, useUpdateUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";
import {Button} from "react-bootstrap";

const EditUserForm = ({user}) => {

    const [updateUser, {
        isSuccess,
        error,
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDelSuccess,
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);

    useEffect(() => {
        console.log(isSuccess);
        if (isSuccess || isDelSuccess) {
            setUsername('');
            setPassword('');
            setEmail('');
            setRoles([]);
            navigate('/dash/users');
        }

    }, [isSuccess, isDelSuccess, navigate]);

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onRolesChanged = e => setRoles(e.target.value);

    const onActiveChanged = () => setActive(prev => !prev);

    const onSaveUserClicked = async () => {
        await updateUser({id: user.id, username, password, email, roles, active});
    };

    const onDeleteUserClicked = async () => {
        await deleteUser({id: user.id});
    };

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option>
        );
    });

    //check if there is an error TODO: better error handling
    let errormessage = "";
    if (error) {
        if (error.data.errors) {
            errormessage = error.data.errors[0].msg;
        } else if (error.data.message !== null) {
            errormessage = error.data.message;
        }
    }

    return (
        <>
            <p className="error">{errormessage}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <Button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </Button>
                        <Button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Button>
                        <Button
                            className="icon-button"
                            title="Back"
                            onClick={() => navigate('/dash/users')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
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
                    value={String(username)}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[6-20 chars incl. !@#$%]</span></label>
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
                    value={String(email)}
                    onChange={onEmailChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={Boolean(active)}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select`}
                    value={String(roles)}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </form>
        </>
    );
};
export default EditUserForm;