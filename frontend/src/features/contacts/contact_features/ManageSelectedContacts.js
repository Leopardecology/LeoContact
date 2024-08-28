import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap';
import ExportContacts from './ExportContacts';
import MailContacts from './MailContacts';
import PrintContacts from './PrintContacts';

const ManageSelectedContacts = ({ showModal, handleClose, selectedContacts, contacts, fieldLabels }) => {
    const [activeAction, setActiveAction] = useState(null);

    const selectedContactList = selectedContacts.map(id => {
        const contact = contacts.entities[id];
        return `${contact.firstname} ${contact.lastname} (${contact.email})`;
    });

    const handleActionClick = (action) => {
        setActiveAction(action);
    };

    const handleActionClose = () => {
        setActiveAction(null);
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Manage Selected Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Actions</h5>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => handleActionClick('export')}
                                className="w-100"
                            >
                                Export Contacts
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="info"
                                onClick={() => handleActionClick('mail')}
                                className="w-100"
                            >
                                Send Mail
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="secondary"
                                onClick={() => handleActionClick('print')}
                                className="w-100"
                            >
                                Print Address
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <h5>Selected Contacts:</h5>
                    <ListGroup>
                        {selectedContactList.map((contact, index) => (
                            <ListGroup.Item key={index}>
                                {contact}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {activeAction === 'export' && (
                <ExportContacts
                    showModal={true}
                    handleClose={handleActionClose}
                    selectedContacts={selectedContacts}
                    contacts={contacts}
                    fieldLabels={fieldLabels}
                />
            )}

            {activeAction === 'mail' && (
                <MailContacts
                    showModal={true}
                    handleClose={handleActionClose}
                />
            )}

            {activeAction === 'print' && (
                <PrintContacts
                    showModal={true}
                    handleClose={handleActionClose}
                />
            )}
        </>
    );
};

export default ManageSelectedContacts;