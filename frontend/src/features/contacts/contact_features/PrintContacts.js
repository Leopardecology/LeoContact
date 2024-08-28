import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PrintContacts = ({ showModal, handleClose }) => {
    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Print Address (Mockup)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This is a mockup for the print functionality.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PrintContacts;
