import {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "../contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import circleExclamation from "../../../img/circleExclamation.png";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";
import {errorHandlingContact} from "../ErrorHandlingContact";
import useAuth from "../../../hooks/useAuth";
import AddressFields from "./AddressFields";
import ContactFormFields from "./ContactFormFields";
import ContactInfoFields from "./ContactInfoFields";

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
    const [telephone, setTelephone] = useState(contact.telephone);
    const [role, setRole] = useState(contact.role);
    const [calendar, setCalendar] = useState(contact.calendar);
    const [annualReport, setAnnualReport] = useState(contact.annualReport);
    const [address, setAddress] = useState(contact.address);
    const [personal, setPersonal] = useState(contact.personal);
    const [Show, setShow] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setFirstname('');
            setLastname('');
            setEmail('');
            setTelephone('');
            setRole('');
            setCalendar('');
            setAddress('');
            navigate('/dash/contacts');
        }

    }, [isSuccess, isDelSuccess, navigate]);

    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onTelephoneChanged = e => setTelephone(e.target.value);
    const onRoleChanged = e => setRole(e.target.value);
    const onCalendarChanged = e => setCalendar(e.target.value);
    const onAnnualReportChanged = () => setAnnualReport(prev => !prev);
    const onStreetChanged = e => setAddress({...address, street: e.target.value});
    const onCityChanged = e => setAddress({...address, city: e.target.value});
    const onZipChanged = e => setAddress({...address, zip: e.target.value});
    const onPersonalChanged = () => setPersonal(prev => !prev);
    const handleCloseErrorModal = () => setShowErrorModal(false);


    function onCountryChanged(code) {
        setAddress({...address, country: code});
    }

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await updateContact({
            id: contact.id,
            firstname,
            lastname,
            email,
            telephone,
            role,
            calendar,
            annualReport,
            address,
            personal
        }).unwrap().catch(() => {
            setShowErrorModal(true);
        });
    };


    const onDeleteContactClicked = async () => {
        await deleteContact({id: contact.id});
    };

    const {
        errorContent,
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
                    <ContactFormFields
                        firstname={firstname}
                        onFirstnameChanged={onFirstnameChanged}
                        lastname={lastname}
                        onLastnameChanged={onLastnameChanged}
                        email={email}
                        onEmailChanged={onEmailChanged}
                        isAdmin={isAdmin}
                        personal={personal}
                        onPersonalChanged={onPersonalChanged}
                        telephone={telephone}
                        onTelephoneChanged={onTelephoneChanged}
                        role={role}
                        onRoleChanged={onRoleChanged}
                    />

                    <AddressFields
                        address={address}
                        onStreetChanged={onStreetChanged}
                        onCityChanged={onCityChanged}
                        onZipChanged={onZipChanged}
                        onCountryChanged={onCountryChanged}
                    />

                    <ContactInfoFields
                        calendar={calendar}
                        onCalendarChanged={onCalendarChanged}
                        annualReport={annualReport}
                        onAnnualReportChanged={onAnnualReportChanged}
                    />
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

                <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorContent}
                    </Modal.Body>
                </Modal>

            </Container>
        </>
    );
};

export default EditContactForm;