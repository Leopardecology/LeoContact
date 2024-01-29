import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactFormFields = ({
                               contactData,
                               isAdmin,
                               onContactChange,
                               onCheckboxChange,
                           }) => {
    const {
        salutation,
        company,
        firstname,
        lastname,
        email,
        personal,
        telephone,
        role
    } = contactData;

    return (
        <>
            <Row className="mb-3">
                <Form.Group sm={2} as={Col} controlId="salutation">
                    <Form.Label>Salutation:</Form.Label>
                    <Form.Select
                        placeholder=""
                        autoComplete="off"
                        name="salutation"
                        value={salutation}
                        onChange={onContactChange}
                    >
                        <option value="">Select Salutation</option>
                        {['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']
                            .map((salutationOption) => (
                                <option key={salutationOption}
                                        value={salutationOption}>
                                    {salutationOption}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group sm={4} as={Col} controlId="company">
                    <Form.Label>Company:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="company"
                        value={company}
                        onChange={onContactChange}
                    />
                </Form.Group>
            </Row>

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
                    <Form.Group sm={3} as={Col} id="personal"
                                className="large-checkbox">
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
