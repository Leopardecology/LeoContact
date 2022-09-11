import {useEffect, useState} from "react";
import {useDeleteUserMutation, useUpdateUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";

const USER_REGEX = /^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{6,20}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const EditUserForm = ({user}) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [validEmail, setValidEmail] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);


    useEffect(() => {
        setValidUsername(USER_REGEX.test(String(username)));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(String(email)));
    }, [email]);


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
        if (password) {
            await updateUser({id: user.id, username, password, email, roles, active});
        } else {
            await updateUser({id: user.id, username, email, roles, active});
        }
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

    let canSave;
    if (password) {
        canSave = [roles.length, validUsername, validPassword, validEmail].every(Boolean) && !isLoading;
    } else {
        canSave = [roles.length, validUsername, validEmail].every(Boolean) && !isLoading;
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validUserClass = !validUsername ? 'form__input--incomplete' : '';
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : '';
    const validEmailClass = !validEmail ? 'form__input--incomplete' : '';
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';

    const errContent = (error?.data?.message || delerror?.data?.message) ?? '';


    return (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
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
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[only Emails]</span></label>
                <input
                    className={`form__input ${validEmailClass}`}
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
                    className={`form__select ${validRolesClass}`}
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