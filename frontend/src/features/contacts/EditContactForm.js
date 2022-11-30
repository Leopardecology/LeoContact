import {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Alert, Button, Col, Container, Form, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";

const EditContactForm = ({contact}) => {

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

    useEffect(() => {
        console.log(isSuccess);
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
    const onCountryChanged = e => setAddress({...address, country: e.target.value});

    const onSaveContactClicked = async () => {
        await updateContact({id: contact.id, firstname, lastname, email, address});
    };

    const onDeleteContactClicked = async () => {
        await deleteContact({id: contact.id});
    };

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
            <Container className={"prevent-select"}>
                <h3 className={"title"}>Contact {contact.lastname}</h3>

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
                            onClick={() => navigate('/dash/contacts')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Delete</strong>
                            </Tooltip>
                        }>
                        <Button
                            className="delete-button ms-auto"
                            onClick={onDeleteContactClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Button>
                    </OverlayTrigger>
                </Stack>

                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="firstname">
                            <Form.Label>Firstname: [3-20]</Form.Label>
                            <Form.Control placeholder="Firstname"
                                          autoComplete="off"
                                          type="text"
                                          value={String(firstname)}
                                          onChange={onFirstnameChanged}/>
                        </Form.Group>

                        <Form.Group sm={6} as={Col} controlId="lastname">
                            <Form.Label>Lastname: [3-20]</Form.Label>
                            <Form.Control placeholder="Lastname"
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
                                          type="email"
                                          value={String(email)}
                                          onChange={onEmailChanged}/>
                        </Form.Group>
                    </Row>

                    {/*ADDRESS*/}

                    <h5>Address</h5>

                    <Row className="mb-3">
                        <Form.Group sm={6} as={Col} controlId="street">
                            <Form.Label>Street:</Form.Label>
                            <Form.Control placeholder="Street"
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
                                          autoComplete="off"
                                          type="city"
                                          value={String(address.city)}
                                          onChange={onCityChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="zip">
                            <Form.Label>Zip:</Form.Label>
                            <Form.Control placeholder="Zip"
                                          autoComplete="off"
                                          type="zip"
                                          value={String(address.zip)}
                                          onChange={onZipChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="country">
                            <Form.Label>Country:</Form.Label>
                            <Form.Control placeholder="Country"
                                          autoComplete="off"
                                          type="country"
                                          value={String(address.country)}
                                          onChange={onCountryChanged}/>
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
                        onClick={onSaveContactClicked}
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
    );
};

export default EditContactForm;