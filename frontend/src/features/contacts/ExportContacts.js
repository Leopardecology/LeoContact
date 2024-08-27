import React, { useState } from 'react';
import { useGetContactsQuery } from "./contactsApiSlice";
import { Container, Table, Form, Button, Row, Col, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import PulseLoader from 'react-spinners/PulseLoader';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

const ExportContacts = () => {
    useTitle('LeoContacts - Export Contacts');
    const navigate = useNavigate();
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFields, setSelectedFields] = useState({});

    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery('contactsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const fieldLabels = {
        'salutation': 'Salutation',
        'firstname': 'First Name',
        'lastname': 'Last Name',
        'company': 'Company',
        'email': 'Email',
        'telephonePrivate': 'Private Phone',
        'telephoneBusiness': 'Business Phone',
        'role': 'Role',
        'calendarEnglish': 'English Calendar',
        'calendarGerman': 'German Calendar',
        'annualReport': 'Annual Report',
        'address.street': 'Street',
        'address.streetAddition': 'Street Addition',
        'address.city': 'City',
        'address.zip': 'ZIP',
        'address.country': 'Country',
        'comment': 'Comment',
        'personal': 'Personal',
        'administration': 'Administration'
    };

    const fields = Object.keys(fieldLabels);

    const handleSelectContact = (contactId, event) => {
        // If the event originated from the checkbox, don't toggle twice
        if (event.target.type === 'checkbox') return;

        setSelectedContacts(prev =>
            prev.includes(contactId)
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
    };

    const handleCheckboxChange = (contactId, event) => {
        event.stopPropagation(); // Prevent the row click event from firing
        setSelectedContacts(prev =>
            prev.includes(contactId)
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
    };

    const handleSelectAll = () => {
        if (isSuccess && contacts?.ids) {
            setSelectedContacts([...contacts.ids]);
        }
    };

    const handleDeselectAll = () => {
        setSelectedContacts([]);
    };

    const handleFieldSelect = (field) => {
        setSelectedFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSelectAllFields = () => {
        const allSelected = fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {});
        setSelectedFields(allSelected);
    };

    const handleDeselectAllFields = () => {
        setSelectedFields({});
    };

    const getExportData = () => {
        if (!isSuccess || !contacts?.entities) return [];
        return selectedContacts.map(id => {
            const contact = contacts.entities[id];
            const exportData = {};
            Object.keys(selectedFields).forEach(field => {
                if (selectedFields[field]) {
                    if (field.includes('.')) {
                        const [parent, child] = field.split('.');
                        exportData[fieldLabels[field]] = contact[parent] ? contact[parent][child] || '' : '';
                    } else {
                        exportData[fieldLabels[field]] = contact[field] || '';
                    }
                }
            });
            return exportData;
        });
    };

    let content;

    if (isLoading) {
        content = <PulseLoader color={"#FFF"}/>;
    } else if (isError) {
        content = <p>{error?.data?.message || "An error occurred"}</p>;
    } else if (isSuccess) {
        const tableContent = contacts.ids.map(contactId => {
            const contact = contacts.entities[contactId];
            return (
                <tr
                    key={contactId}
                    onClick={(event) => handleSelectContact(contactId, event)}
                    style={{ cursor: 'pointer' }}
                >
                    <td onClick={(e) => e.stopPropagation()}>
                        <Form.Check
                            type="checkbox"
                            checked={selectedContacts.includes(contactId)}
                            onChange={(event) => handleCheckboxChange(contactId, event)}
                        />
                    </td>
                    <td>{contact.firstname}</td>
                    <td>{contact.lastname}</td>
                    <td>{contact.email}</td>
                </tr>
            );
        });

        content = (
            <>
                <Row className="mb-3 align-items-center">
                    <Col xs="auto">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="back-tooltip">Back</Tooltip>}>
                            <Button className="back-button"
                                    onClick={() => navigate('/dash')}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col>
                        <Button onClick={handleSelectAll} className="me-2">Select All</Button>
                        <Button onClick={handleDeselectAll} className="me-2">Deselect All</Button>
                    </Col>
                    <Col xs="auto">
                        <Button onClick={() => setShowModal(true)} className="me-2">
                            <FontAwesomeIcon icon={faFileExport}/> Export ({selectedContacts.length})
                        </Button>
                    </Col>
                </Row>

                <Table className={"prevent-select"} striped bordered hover>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Select Fields to Export</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={handleSelectAllFields} className="me-2 mb-3">Select All Fields</Button>
                        <Button onClick={handleDeselectAllFields} className="mb-3">Deselect All Fields</Button>
                        <Row>
                            {fields.map(field => (
                                <Col key={field} xs={6} md={4} lg={3} className="mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        id={`field-${field}`}
                                        label={fieldLabels[field]}
                                        checked={!!selectedFields[field]}
                                        onChange={() => handleFieldSelect(field)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <CSVLink
                            data={getExportData()}
                            filename="exported_contacts.csv"
                            className="btn btn-primary"
                            target="_blank"
                            onClick={() => setShowModal(false)}
                        >
                            Export
                        </CSVLink>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <Container>
            <h1 className={"title prevent-select"}>Export Contacts</h1>
            {content}
        </Container>
    );
};

export default ExportContacts;