import {useEffect, useState} from "react";
import {useAddNewContactMutation} from "../contactsApiSlice";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../../hooks/useTitle";
import {Button, Container, Form, OverlayTrigger, Stack, Tooltip, Modal} from "react-bootstrap";
import {errorHandlingContact} from "../ErrorHandlingContact";
import useAuth from "../../../hooks/useAuth";
import ContactFormFields from "./ContactFormFields";
import ContactInfoFields from "./ContactInfoFields";
import AddressFields from "./AddressFields";

const NewContactForm = () => {
    useTitle("LeoContacts - New Contact");

    const {isAdmin} = useAuth();

    const [
        addNewContact,
        {isSuccess, error}
    ] = useAddNewContactMutation();

    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        telephone: "",
        role: "",
        calendar: "",
        annualReport: false,
        address: {street: "", city: "", zip: "", country: ""},
        personal: false,
    });

    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setContactData({
                firstname: "",
                lastname: "",
                email: "",
                telephone: "",
                role: "",
                calendar: "",
                annualReport: false,
                address: {street: "", city: "", zip: "", country: ""},
                personal: false,
            });
            navigate("/dash/contacts");
        }
    }, [isSuccess, navigate]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setContactData({...contactData, [name]: value});
    };

    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setContactData({...contactData, [name]: checked});
    };

    const handleAddressChange = (name, value) => {
        setContactData({
            ...contactData,
            address: {...contactData.address, [name]: value},
        });
    };

    const onSaveContactClicked = async (e) => {
        e.preventDefault();
        await addNewContact(contactData).unwrap().catch(() => {
            setShowErrorModal(true);
        });
    };

    const handleCloseErrorModal = () => setShowErrorModal(false);

    const {errorContent} = errorHandlingContact(error);

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
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                    />

                    <AddressFields
                        addressData={contactData.address}
                        handleAddressChange={handleAddressChange}
                    />

                    <ContactInfoFields
                        calendar={contactData.calendar}
                        annualReport={contactData.annualReport}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
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
