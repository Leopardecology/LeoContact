import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";

const AddressFields = ({address, onStreetChanged, onCityChanged, onZipChanged, onCountryChanged}) => {
    return (
        <>
            <h5>Address</h5>

            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="street">
                    <Form.Label>Street:</Form.Label>
                    <Form.Control placeholder=""
                                  autoComplete="off"
                                  type="street"
                                  value={String(address.street)}
                                  onChange={onStreetChanged}/>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group sm={4} as={Col} controlId="city">
                    <Form.Label>City:</Form.Label>
                    <Form.Control placeholder=""
                                  autoComplete="off"
                                  type="city"
                                  value={String(address.city)}
                                  onChange={onCityChanged}/>
                </Form.Group>

                <Form.Group sm={4} as={Col} controlId="zip">
                    <Form.Label>Zip:</Form.Label>
                    <Form.Control placeholder=""
                                  autoComplete="off"
                                  type="zip"
                                  value={String(address.zip)}
                                  onChange={onZipChanged}/>
                </Form.Group>

                <Form.Group sm={4} as={Col} controlId="country">
                    <Form.Label>Country:</Form.Label>
                    <ReactFlagsSelect searchable
                                      searchPlaceholder="Search Country"
                                      selected={String(address.country)}
                                      onSelect={(code) => onCountryChanged(code)}
                                      selectButtonClassName="countrySelect"/>
                </Form.Group>
            </Row>
        </>
    );
};

export default AddressFields;
