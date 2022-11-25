import {useEffect, useState} from "react";
import {useDeleteUserMutation, useUpdateUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";
import {Button, Col, Container, Form, Row, Stack} from "react-bootstrap";

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

            <Container>
                <h3 className={"title"}>Edit {username}</h3>
                <Stack direction={"horizontal"} gap={3}>
                    <Button
                        className="back-button"
                        title="Back"
                        onClick={() => navigate('/dash/users')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>

                    <Button
                        className="delete-button ms-auto"
                        title="Delete"
                        onClick={onDeleteUserClicked}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </Button>
                </Stack>

                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="username">
                            <Form.Label>Username [3-20 letters]</Form.Label>
                            <Form.Control placeholder="Username"
                                          autoComplete="off"
                                          type="text"
                                          value={String(username)}
                                          onChange={onUsernameChanged}/>
                        </Form.Group>

                        <Form.Group sm={6} as={Col} controlId="password">
                            <Form.Label>Password [6-20 chars incl. !@#$%]</Form.Label>
                            <Form.Control placeholder="Password [empty = no change]"
                                          type="password"
                                          value={password}
                                          onChange={onPasswordChanged}/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group sm={6} as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="Enter email"
                                          type="email"
                                          value={String(email)}
                                          onChange={onEmailChanged}/>
                        </Form.Group>

                        <Form.Group sm={3} as={Col} controlId="roles">
                            <Form.Label>Assigned Roles</Form.Label>
                            <Form.Select value={String(roles)}
                                         onChange={onRolesChanged}>
                                {/*//TODO: type error*/}
                                {options}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group sm={3} as={Col} id="user-active">
                            <Form.Check label="Active"
                                        type="checkbox"
                                        checked={Boolean(active)}
                                        onChange={onActiveChanged}/>
                        </Form.Group>
                    </Row>

                    <Button
                        className="save-button"
                        title="Save"
                        onClick={onSaveUserClicked}
                    >
                        <FontAwesomeIcon icon={faSave}/>
                    </Button>
                </Form>
            </Container>
        </>
    );
};
export default EditUserForm;