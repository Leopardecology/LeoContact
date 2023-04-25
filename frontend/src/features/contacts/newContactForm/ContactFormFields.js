import {Form, Col, Row} from "react-bootstrap";

const ContactFormFields = ({contactData, isAdmin, handleInputChange, handleCheckboxChange}) => {
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
                        value={contactData.firstname}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group sm={6} as={Col} controlId="lastname">
                    <Form.Label>Lastname:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="lastname"
                        value={contactData.lastname}
                        onChange={handleInputChange}
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
                        value={contactData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {isAdmin && (
                    <Form.Group sm={3} as={Col} id="personal">
                        <Form.Check
                            label="Personal"
                            type="checkbox"
                            name="personal"
                            checked={contactData.personal}
                            onChange={handleCheckboxChange}
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
                        value={contactData.telephone}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group sm={6} as={Col} controlId="role">
                    <Form.Label>Role:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="role"
                        value={contactData.role}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Row>
        </>
    );
};

export default ContactFormFields;
