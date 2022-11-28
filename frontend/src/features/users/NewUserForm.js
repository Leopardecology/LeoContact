import {useEffect, useState} from "react";
import {useAddNewUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";
import newTitle from "../../hooks/useTitle";
import {Alert, Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

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

    //check if there is an error TODO: better error handling
    let errormessage = "";
    let isError = false;
    if (error) {
        isError = true;
        if (error.data.errors) {
            errormessage = error.data.errors[0].msg;
        } else if (error.data.message !== null) {
            errormessage = error.data.message;
        }
    }

    return (
        <>
            <Container>
                <h3 className={"title"}>New User</h3>

                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="my-tooltip-id">
                            <strong>Back</strong>
                        </Tooltip>
                    }>
                    <Button
                        className="back-button"
                        onClick={() => navigate('/dash/users')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>
                </OverlayTrigger>

                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="username">
                            <Form.Label>Username: [3-20]</Form.Label>
                            <Form.Control placeholder="Username"
                                          autoComplete="off"
                                          type="text"
                                          value={String(username)}
                                          onChange={onUsernameChanged}/>
                        </Form.Group>

                        <Form.Group sm={6} as={Col} controlId="password">
                            <Form.Label>Password: [6-20]</Form.Label>
                            <Form.Control placeholder="Password"
                                          type="password"
                                          value={password}
                                          onChange={onPasswordChanged}/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group sm={6} as={Col} controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Enter email"
                                          type="email"
                                          value={String(email)}
                                          onChange={onEmailChanged}/>
                        </Form.Group>

                        <Form.Group sm={3} as={Col} controlId="roles">
                            <Form.Label>Role:</Form.Label>
                            <Form.Select value={String(roles)}
                                         onChange={onRolesChanged}>
                                {/*//TODO: type error*/}
                                {options}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>

                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="my-tooltip-id">
                            <strong>Save</strong>
                        </Tooltip>
                    }>
                    <Button
                        className="save-button"
                        onClick={onSaveUserClicked}
                    >
                        <FontAwesomeIcon icon={faSave}/>
                    </Button>
                </OverlayTrigger>

                <Col className={"text-center"}>
                    <Alert show={isError} variant="danger">
                        {errormessage}
                    </Alert>
                </Col>
            </Container>
        </>
    )
        ;
};
export default NewUserForm;