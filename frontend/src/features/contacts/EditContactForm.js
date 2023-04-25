import React, {useEffect, useState} from "react";
import {useDeleteContactMutation, useUpdateContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import circleExclamation from "../../img/circleExclamation.png";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Stack, Tooltip} from "react-bootstrap";
import {errorHandlingContact} from "./ErrorHandlingContact";
import useAuth from "../../hooks/useAuth";
import AddressFields from "./shared/AddressFields";
import ContactFormFields from "./shared/ContactFormFields";
import ContactInfoFields from "./shared/ContactInfoFields";
import {handleContactChange, handleCheckboxChange, handleAddressChange} from "./shared/contactFormHandlers";


const EditContactForm = ({contact}) => {
    const {isAdmin} = useAuth();

    const [
        updateContact,
        {isSuccess, error},
    ] = useUpdateContactMutation();

    const navigate = useNavigate();

    const [
        deleteContact,
        {isSuccess: isDelSuccess},
    ] = useDeleteContactMutation();

    const [contactData, setContactData] = useState({...contact});
    const [Show, setShow] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            navigate("/dash/contacts");
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const handleContactChangeWrapper = (e) => {
        handleContactChange(e, contactData, setContactData);
    };

    const handleCheckboxChangeWrapper = (e) => {
        handleCheckboxChange(e, contactData, setContactData);
    };

    const handleAddressChangeWrapper = (e, name, value) => {
        handleAddressChange(e, name, value, contactData, setContactData);
    };


    const handleCloseErrorModal = () => setShowErrorModal(false);

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await updateContact(contactData)
            .unwrap()
            .catch(() => {
                setShowErrorModal(true);
            });
    };

    const onDeleteContactClicked = async () => {
        await deleteContact({id: contact.id});
    };

    const {errorContent} = errorHandlingContact(error);

    return (
        <>
            <Container className={"prevent-select"}>
                <h3 className={"title"}>Contact {contact.lastname}</h3>

                <Stack direction={"horizontal"} gap={3}>
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="right"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Back</strong>
                            </Tooltip>
                        }
                    >
                        <Button
                            className="back-button"
                            onClick={() => navigate("/dash/contacts")}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="left"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Delete</strong>
                            </Tooltip>
                        }
                    >
                        <Button
                            className="delete-button ms-auto"

                            onClick={() => setShow(true)}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
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
                                        onClick={() => setShow(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="danger"
                                        className="delete-contact-button"
                                        onClick={onDeleteContactClicked}
                                    >
                                        Delete Contact
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>

                <Form onSubmit={e => e.preventDefault()}>
                    <ContactFormFields
                        contactData={contactData}
                        isAdmin={isAdmin}
                        onContactChange={handleContactChangeWrapper}
                        onCheckboxChange={handleCheckboxChangeWrapper}
                    />

                    <AddressFields
                        addressData={contactData.address}
                        onStreetChanged={handleAddressChangeWrapper}
                        onCityChanged={handleAddressChangeWrapper}
                        onZipChanged={handleAddressChangeWrapper}
                        onCountryChanged={handleAddressChangeWrapper}
                    />

                    <ContactInfoFields
                        calendar={contactData.calendar}
                        onCalendarChanged={handleContactChange}
                        annualReport={contactData.annualReport}
                        onAnnualReportChanged={handleCheckboxChange}
                    />
                </Form>

                <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="right"
                    overlay={<Tooltip id="my-tooltip-id">
                        <strong>Save</strong>
                    </Tooltip>}
                >
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