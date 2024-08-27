import React, { useState } from 'react';
import { useGetContactsQuery } from "./contactsApiSlice";
import { Container, Table, Form, Button, Row, Col, Modal } from "react-bootstrap";
import PulseLoader from 'react-spinners/PulseLoader';
import { CSVLink } from 'react-csv';

const ExportContacts = () => {
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

    // Field name to nice label mapping
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

    const handleSelectContact = (contactId) => {
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
        const { ids, entities } = contacts;

        const tableContent = ids?.length
            ? ids.map(contactId => {
                const contact = entities[contactId];
                if (contact) {
                    return (
                        <tr key={contactId}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedContacts.includes(contactId)}
                                    onChange={() => handleSelectContact(contactId)}
                                />
                            </td>
                            <td>{contact.firstname}</td>
                            <td>{contact.lastname}</td>
                            <td>{contact.email}</td>
                        </tr>
                    )
                }
                return null;
            })
            : null;

        content = (
            <>
                <Row className="mb-3">
                    <Col>
                        <Button onClick={handleSelectAll} className="me-2">Select All</Button>
                        <Button onClick={handleDeselectAll} className="me-2">Deselect All</Button>
                        <Button onClick={() => setShowModal(true)} className="me-2">Export Selected ({selectedContacts.length})</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
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
            <h1>Export Contacts</h1>
            {content}
        </Container>
    );
};

export default ExportContacts;