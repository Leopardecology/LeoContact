import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactFormFields = ({
                               firstname,
                               lastname,
                               email,
                               personal,
                               telephone,
                               role,
                               isAdmin,
                               onFirstnameChanged,
                               onLastnameChanged,
                               onEmailChanged,
                               onPersonalChanged,
                               onTelephoneChanged,
                               onRoleChanged,
                           }) => {
    return (<>
        <Row className="mb-3">
            <Form.Group sm={6} as={Col} controlId="firstname">
                <Form.Label>Firstname:</Form.Label>
                <Form.Control
                    placeholder=""
                    autoComplete="off"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={onFirstnameChanged}
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
                    onChange={onLastnameChanged}
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
                    onChange={onEmailChanged}
                />
            </Form.Group>

            {isAdmin && (<Form.Group sm={3} as={Col} id="personal">
                <Form.Check
                    label="Personal"
                    type="checkbox"
                    name="personal"
                    checked={personal}
                    onChange={onPersonalChanged}
                />
            </Form.Group>)}
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
                    onChange={onTelephoneChanged}
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
                    onChange={onRoleChanged}
                />
            </Form.Group>
        </Row>
    </>);
};

export default ContactFormFields;
