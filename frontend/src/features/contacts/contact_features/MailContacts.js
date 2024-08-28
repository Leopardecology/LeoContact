import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MailContacts = ({ showModal, handleClose }) => {
    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Send Mail (Mockup)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This is a mockup for the mail functionality.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MailContacts;