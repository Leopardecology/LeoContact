import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactFormFields = ({
                               contactData,
                               isAdmin,
                               onContactChange,
                               onCheckboxChange,
                           }) => {
    const {firstname, lastname, email, personal, telephone, role} = contactData;

    return (
        <>
            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="firstname">
                    <Form.Label>Firstname:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={onContactChange}
                    />
                </Form.Group>

                <Form.Group sm={6} as={Col} controlId="lastname">
                    <Form.Label>Lastname:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={onContactChange}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        placeholder=""
                        type="email"
                        name="email"
                        value={email}
                        onChange={onContactChange}
                    />
                </Form.Group>

                {isAdmin && (
                    <Form.Group sm={3} as={Col} id="personal">
                        <Form.Check
                            label="Personal"
                            type="checkbox"
                            name="personal"
                            checked={personal}
                            onChange={onCheckboxChange}
                        />
                    </Form.Group>
                )}
            </Row>

            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="telephone">
                    <Form.Label>Telephone:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="telephone"
                        name="telephone"
                        value={telephone}
                        onChange={onContactChange}
                    />
                </Form.Group>

                <Form.Group sm={6} as={Col} controlId="role">
                    <Form.Label>Role:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="role"
                        value={role}
                        onChange={onContactChange}
                    />
                </Form.Group>
            </Row>
        </>
    );
};

export default ContactFormFields;
