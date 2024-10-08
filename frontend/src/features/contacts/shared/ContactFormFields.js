import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactFormFields = ({
                               contactData,
                               isAdmin,
                               onContactChange,
                               onCheckboxChange,
                               classNames

                           }) => {
    const {
        salutation,
        company,
        firstname,
        lastname,
        email,
        personal,
        administration,
        telephonePrivate,
        telephoneBusiness,
        role
    } = contactData;

    return (
        <>
            <Row className="mb-3">
                <Form.Group sm={2} as={Col} controlId="salutation">
                    <Form.Label>Salutation:</Form.Label>
                    <Form.Select
                        placeholder=""
                        className={classNames.salutationClassName}
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
                        className={classNames.companyClassName}
                        autoComplete="off"
                        type="text"
                        name="company"
                        value={company}
                        onChange={onContactChange}
                    />
                </Form.Group>

                <Form.Group sm={3} as={Col} controlId="administration">
                    <Form.Label>Administration:</Form.Label>
                    {isAdmin ? (
                        <Form.Select
                            placeholder=""
                            autoComplete="off"
                            name="administration"
                            value={administration}
                            onChange={onContactChange}
                        >
                            <option value="">Select Administration</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Botswana">Botswana</option>
                        </Form.Select>
                    ) : (
                        <Form.Control
                            readOnly
                            value={administration || "Not specified"}
                            className={`${classNames.administrationClassName} form-control`}
                        />
                    )}
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="firstname">
                    <Form.Label>Firstname:</Form.Label>
                    <Form.Control
                        placeholder=""
                        className={classNames.firstnameClassName}
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
                        className={classNames.lastnameClassName}
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
                        className={classNames.emailClassName}
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
                            label="Personal Telephone"
                            type="checkbox"
                            name="personal"
                            checked={personal}
                            onChange={onCheckboxChange}
                        />
                    </Form.Group>
                )}
            </Row>

            <Row className="mb-3">
                {(!personal || isAdmin) && (
                    <Form.Group sm={6} as={Col} controlId="telephonePrivate">
                        <Form.Label>Private Telephone:</Form.Label>
                        <Form.Control
                            placeholder=""
                            className={classNames.telephonePrivateClassName}
                            autoComplete="off"
                            type="telephone"
                            name="telephonePrivate"
                            value={telephonePrivate}
                            onChange={onContactChange}
                        />
                    </Form.Group>
                )}

                <Form.Group sm={6} as={Col} controlId="telephoneBusiness">
                    <Form.Label>Business Telephone:</Form.Label>
                    <Form.Control
                        placeholder=""
                        className={classNames.telephoneBusinessClassName}
                        autoComplete="off"
                        type="telephone"
                        name="telephoneBusiness"
                        value={telephoneBusiness}
                        onChange={onContactChange}
                    />
                </Form.Group>
            </Row>


            <Row className="mb-3">
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
