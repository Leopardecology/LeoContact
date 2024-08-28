import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Table, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ExportContacts from './ExportContacts';
import MailContacts from './MailContacts';
import PrintContacts from './PrintContacts';

const ManageSelectedContacts = ({
                                    showModal,
                                    handleClose,
                                    selectedContacts,
                                    contacts,
                                    fieldLabels
                                }) => {
    const [activeAction, setActiveAction] = useState(null);

    useEffect(() => {
        if (showModal) {
            setActiveAction(null);
        }
    }, [showModal]);

    const handleActionClick = (action) => {
        setActiveAction(action);
    };

    const handleActionClose = () => {
        setActiveAction(null);
    };

    const renderSelectedContacts = () => (
        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
            <Table striped bordered hover>
                <thead style={{position: 'sticky', top: 0, background: 'white'}}>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Country</th>
                    <th>Administration</th>
                </tr>
                </thead>
                <tbody>
                {selectedContacts.map(id => {
                    const contact = contacts.entities[id];
                    return (
                        <tr key={id}>
                            <td>
                                <strong>{`${contact.firstname} ${contact.lastname}`}</strong>
                            </td>
                            <td>
                                <div>
                                    <FontAwesomeIcon icon={faEnvelope} className="me-2"/>
                                    {contact.email}
                                </div>
                            </td>
                            <td>
                                {contact.address && contact.address.country && (
                                    <div>
                                        <FontAwesomeIcon icon={faGlobe} className="me-2"/>
                                        {contact.address.country}
                                    </div>
                                )}
                            </td>
                            <td>
                                {contact.administration && (
                                    <Badge bg="info">{contact.administration}</Badge>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );

    const renderActionContent = () => {
        switch (activeAction) {
            case 'export':
                return (
                    <ExportContacts
                        selectedContacts={selectedContacts}
                        contacts={contacts}
                        fieldLabels={fieldLabels}
                        handleClose={handleActionClose}
                    />
                );
            case 'mail':
                return <MailContacts handleClose={handleActionClose} />;
            case 'print':
                return <PrintContacts handleClose={handleActionClose} />;
            default:
                return null;
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {activeAction ? `${activeAction.charAt(0).toUpperCase() +
                    activeAction.slice(1)} Contacts` : 'Manage Selected Contacts'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!activeAction ? (
                    <>
                        <h5>Actions</h5>
                        <Row className="mb-4">
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
                        <h5>Selected Contacts ({selectedContacts.length})</h5>
                        {renderSelectedContacts()}
                    </>
                ) : (
                    renderActionContent()
                )}
            </Modal.Body>
            <Modal.Footer>
                {activeAction ? (
                    <Button variant="secondary" onClick={handleActionClose}>
                        Back
                    </Button>
                ) : (
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ManageSelectedContacts;