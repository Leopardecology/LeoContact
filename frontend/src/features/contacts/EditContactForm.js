import {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import circleExclamation from "../../img/circleExclamation.png";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import {errorHandlingContact} from "./ErrorHandlingContact";
import useAuth from "../../hooks/useAuth";

const EditContactForm = ({contact}) => {

    const {isAdmin} = useAuth();

    const [updateContact, {
        isSuccess,
        error,
    }] = useUpdateContactMutation();

    const [deleteContact, {
        isSuccess: isDelSuccess,
    }] = useDeleteContactMutation();

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState(contact.firstname);
    const [lastname, setLastname] = useState(contact.lastname);
    const [email, setEmail] = useState(contact.email);
    const [address, setAddress] = useState(contact.address);
    const [personal, setPersonal] = useState(contact.personal);
    const [Show, setShow] = useState(false);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setFirstname('');
            setLastname('');
            setEmail('');
            setAddress('');
            navigate('/dash/contacts');
        }

    }, [isSuccess, isDelSuccess, navigate]);

    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onStreetChanged = e => setAddress({...address, street: e.target.value});
    const onCityChanged = e => setAddress({...address, city: e.target.value});
    const onZipChanged = e => setAddress({...address, zip: e.target.value});
    const onPersonalChanged = () => setPersonal(prev => !prev);

    function onCountryChanged(code) {
        setAddress({...address, country: code});
    }

    const onSaveContactClicked = async () => {
        await updateContact({id: contact.id, firstname, lastname, email, address, personal});
    };

    const onDeleteContactClicked = async () => {
        await deleteContact({id: contact.id});
    };

    const {
        errorContent,
        firstnameClassName,
        lastnameClassName,
        emailClassName,
        streetClassName,
        cityClassName,
        zipClassName,
        countryClassName
    } = errorHandlingContact(error);

    return (
        <>
            <Container className={"prevent-select"}>
                <h3 className={"title"}>Contact {contact.lastname}</h3>

                <Stack direction={"horizontal"} gap={3}>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="right"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Back</strong>
                            </Tooltip>
                        }>
                        <Button
                            className="back-button"
                            onClick={() => navigate('/dash/contacts')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="right"
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
                                <h4>Delete this Contact?</h4>
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
                                        onClick={onDeleteContactClicked}>
                                        Delete Contact
                                    </Button>
                                </Col>

                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>

                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="firstname">
                            <Form.Label>Firstname:</Form.Label>
                            <Form.Control placeholder="Firstname"
                                          className={firstnameClassName}
                                          autoComplete="off"
                                          type="text"
                                          value={String(firstname)}
                                          onChange={onFirstnameChanged}/>
                        </Form.Group>

                        <Form.Group sm={6} as={Col} controlId="lastname">
                            <Form.Label>Lastname:</Form.Label>
                            <Form.Control placeholder="Lastname"
                                          className={lastnameClassName}
                                          autoComplete="off"
                                          type="text"
                                          value={String(lastname)}
                                          onChange={onLastnameChanged}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Enter email"
                                          className={emailClassName}
                                          type="email"
                                          value={String(email)}
                                          onChange={onEmailChanged}/>
                        </Form.Group>

                        {(isAdmin) && <Form.Group sm={3} as={Col} id="personal">
                            <Form.Check label="Personal"
                                        type="checkbox"
                                        className={"personal-checkbox"}
                                        checked={Boolean(personal)}
                                        onChange={onPersonalChanged}/>
                        </Form.Group>}
                    </Row>

                    {/*ADDRESS*/}

                    <h5>Address</h5>

                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="street">
                            <Form.Label>Street:</Form.Label>
                            <Form.Control placeholder="Street"
                                          className={streetClassName}
                                          autoComplete="off"
                                          type="street"
                                          value={String(address.street)}
                                          onChange={onStreetChanged}/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group sm={4} as={Col} controlId="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control placeholder="City"
                                          className={cityClassName}
                                          autoComplete="off"
                                          type="city"
                                          value={String(address.city)}
                                          onChange={onCityChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="zip">
                            <Form.Label>Zip:</Form.Label>
                            <Form.Control placeholder="Zip"
                                          className={zipClassName}
                                          autoComplete="off"
                                          type="zip"
                                          value={String(address.zip)}
                                          onChange={onZipChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="country">
                            <Form.Label>Country:</Form.Label>
                            <ReactFlagsSelect searchable
                                              searchPlaceholder="Search Country"
                                              selected={String(address.country)}
                                              onSelect={(code) => onCountryChanged(code)}
                                              className={countryClassName}
                                              selectButtonClassName="countrySelect"/>
                        </Form.Group>
                    </Row>
                </Form>
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="right"
                    overlay={
                        <Tooltip id="my-tooltip-id">
                            <strong>Save</strong>
                        </Tooltip>
                    }>
                    <Button
                        className="save-button"
                        onClick={onSaveContactClicked}
                    >
                        <FontAwesomeIcon icon={faSave}/>
                    </Button>
                </OverlayTrigger>

                {errorContent}

            </Container>
        </>
    );
};

export default EditContactForm;