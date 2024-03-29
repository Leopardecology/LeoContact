import {useEffect, useState} from "react";
import {useDeleteUserMutation, useUpdateUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from "../../config/roles";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";
import {errorHandlingUser} from "./ErrorHandlingUser";
import useAuth from "../../hooks/useAuth";
import circleExclamation from "../../img/circleExclamation.png";

const EditUserForm = ({user}) => {

    const {loggedInUser} = useAuth();

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
    const [Show, setShow] = useState(false);

    useEffect(() => {
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

    const {
        errorContent,
        userClassName,
        passwordClassName,
        emailClassName
    } = errorHandlingUser(error);

    // don't show delete button if user is himself
    const deleteButton = user.username !== loggedInUser ? (
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="my-tooltip-id">
                    <strong>Delete</strong>
                </Tooltip>
            }>
            <Button
                className="delete-button ms-auto"
                onClick={() => setShow(true)}
            >
                <FontAwesomeIcon icon={faTrashCan}/>
            </Button>
        </OverlayTrigger>
    ) : null;

    return (
        <>
            <Container className={"prevent-select"}>
                <h3 className={"title"}>Edit {user.username}</h3>

                <Stack direction={"horizontal"} gap={3}>
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

                    {deleteButton}
                </Stack>

                <Modal
                    show={Show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Body>
                        <Container>
                            <Row>
                                <img className={"delete-symbol"} alt={"Warning"} src={circleExclamation}/>
                                <h4>Delete this User?</h4>
                            </Row>
                            <Row>

                                <Col>
                                    <Button
                                        className="cancel-button"
                                        onClick={() => setShow(false)}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="danger"
                                        className="delete-contact-button"
                                        onClick={onDeleteUserClicked}>
                                        Delete User
                                    </Button>
                                </Col>

                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>

                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control placeholder="Username"
                                          className={userClassName}
                                          autoComplete="off"
                                          type="text"
                                          value={String(username)}
                                          onChange={onUsernameChanged}/>
                        </Form.Group>

                        <Form.Group sm={6} as={Col} controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control placeholder="Password [empty = no change]"
                                          className={passwordClassName}
                                          type="password"
                                          value={password}
                                          onChange={onPasswordChanged}/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group sm={6} as={Col} controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Enter email"
                                          className={emailClassName}
                                          type="email"
                                          value={String(email)}
                                          onChange={onEmailChanged}/>
                        </Form.Group>

                        <Form.Group sm={3} as={Col} controlId="roles">
                            <Form.Label>Role:</Form.Label>
                            <Form.Select value={String(roles)}
                                         onChange={onRolesChanged}>
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

                {errorContent}

            </Container>
        </>
    );
};
export default EditUserForm;