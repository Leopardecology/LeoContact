import {useEffect, useState} from "react";
import {useAddNewContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";
import {Button, Col, Container, Form, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import {errorHandlingContact} from "./ErrorHandlingContact";

const NewContactForm = () => {
    useTitle('LeoContacts - New Contact');

    const [addNewContact, {
        isSuccess,
        error
    }] = useAddNewContactMutation();

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (isSuccess) {
            setFirstname('');
            setLastname('');
            setEmail('');
            setAddress('');
            navigate('/dash/contacts');
        }
    }, [isSuccess, navigate]);

    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onStreetChanged = e => setAddress({...address, street: e.target.value}); //TODO: fix this
    const onCityChanged = e => setAddress({...address, city: e.target.value});
    const onZipChanged = e => setAddress({...address, zip: e.target.value});

    function onCountryChanged(code) {
        setAddress({...address, country: code});
    }

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await addNewContact({firstname, lastname, email, address});
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
                <h3 className={"title"}>New Contact</h3>

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
                </Stack>

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
                                          value={address.street}
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
                                          value={address.city}
                                          onChange={onCityChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="zip">
                            <Form.Label>Zip:</Form.Label>
                            <Form.Control placeholder="Zip"
                                          className={zipClassName}
                                          autoComplete="off"
                                          type="zip"
                                          value={address.zip}
                                          onChange={onZipChanged}/>
                        </Form.Group>

                        <Form.Group sm={4} as={Col} controlId="country">
                            <Form.Label>Country:</Form.Label>
                            <ReactFlagsSelect searchable
                                              searchPlaceholder="Search Country"
                                              selected={address.country}
                                              onSelect={(code) => onCountryChanged(code)}
                                              selectButtonClassName={countryClassName + " countrySelect"}/>
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

                {errorContent}

            </Container>
        </>
    );
};
export default NewContactForm;