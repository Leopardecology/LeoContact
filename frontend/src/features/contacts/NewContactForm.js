import React, { useEffect, useState } from "react";
import {useAddNewContactMutation} from "./contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";
import {Button, Container, Form, OverlayTrigger, Stack, Tooltip, Modal} from "react-bootstrap";
import {errorHandlingContact} from "./ErrorHandlingContact";
import useAuth from "../../hooks/useAuth";
import ContactFormFields from "./shared/ContactFormFields";
import ContactInfoFields from "./shared/ContactInfoFields";
import AddressFields from "./shared/AddressFields";
import {handleContactChange, handleCheckboxChange, handleAddressChange} from "./shared/contactFormHandlers";


const NewContactForm = () => {
    useTitle("LeoContacts - New Contact");

    const {isAdmin} = useAuth();

    const [addNewContact, {isSuccess, error}] = useAddNewContactMutation();

    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        salutation: "",
        company: "",
        firstname: "",
        lastname: "",
        email: "",
        telephone: "",
        role: "",
        calendar: "",
        annualReport: "",
        comment: "",
        address: {street: "", city: "", zip: "", country: ""},
        personal: false,
    });

    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setContactData({
                salutation: "",
                company: "",
                firstname: "",
                lastname: "",
                email: "",
                telephone: "",
                role: "",
                calendar: "",
                annualReport: "",
                comment: "",
                address: {street: "", city: "", zip: "", country: ""},
                personal: false,
            });
            navigate("/dash/contacts");
        }
    }, [isSuccess, navigate]);

    const handleContactChangeWrapper = (e) => {
        handleContactChange(e, contactData, setContactData);
    };

    const handleCheckboxChangeWrapper = (e) => {
        handleCheckboxChange(e, contactData, setContactData);
    };

    const handleAddressChangeWrapper = (e, name, value) => {
        handleAddressChange(e, name, value, contactData, setContactData);
    };

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await addNewContact(contactData).unwrap().catch(() => {
            setShowErrorModal(true);
        });
    };

    const handleCloseErrorModal = () => setShowErrorModal(false);

    const {errorContent, classNames} = errorHandlingContact(error);

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
                        }
                    >
                        <Button className="back-button" onClick={() => navigate("/dash/contacts")}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </OverlayTrigger>
                </Stack>

                <Form onSubmit={(e) => e.preventDefault()}>
                    <ContactFormFields
                        contactData={contactData}
                        isAdmin={isAdmin}
                        onContactChange={handleContactChangeWrapper}
                        onCheckboxChange={handleCheckboxChangeWrapper}
                        classNames={classNames}
                    />

                    <AddressFields
                        addressData={contactData.address}
                        onStreetChanged={handleAddressChangeWrapper}
                        onCityChanged={handleAddressChangeWrapper}
                        onZipChanged={handleAddressChangeWrapper}
                        onCountryChanged={handleAddressChangeWrapper}
                        classNames={classNames}
                    />


                    <ContactInfoFields
                        calendar={contactData.calendar}
                        annualReport={contactData.annualReport}
                        comment={contactData.comment}
                        onCalendarChanged={(e) => handleContactChange(e, contactData, setContactData)}
                        onAnnualReportChanged={(e) => handleContactChange(e, contactData, setContactData)}
                        onCommentChanged={(e) => handleContactChange(e, contactData, setContactData)}
                        classNames={classNames}
                    />

                </Form>

                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="my-tooltip-id">
                            <strong>Save</strong>
                        </Tooltip>
                    }
                >
                    <Button className="save-button" onClick={onSaveContactClicked}>
                        <FontAwesomeIcon icon={faSave}/>
                    </Button>
                </OverlayTrigger>

                <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorContent}</Modal.Body>
                </Modal>
            </Container>
        </>
    );
};
export default NewContactForm;
