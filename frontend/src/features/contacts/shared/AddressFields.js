import {Form, Col, Row} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";

const AddressFields = ({
                           addressData,
                           onStreetChanged,
                           onCityChanged,
                           onZipChanged,
                           onCountryChanged,
                       }) => {
    const handleCountryChanged = (code) => {
        onCountryChanged(null, "country", code);
    };

    return (
        <>
            <h5>Address</h5>
            <Row className="mb-3">
                <Form.Group sm={6} as={Col} controlId="street">
                    <Form.Label>Street:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="street"
                        value={addressData.street}
                        onChange={(e) => onStreetChanged(e, "street")}
                    />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group sm={4} as={Col} controlId="city">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="city"
                        value={addressData.city}
                        onChange={(e) => onCityChanged(e, "city")}
                    />
                </Form.Group>

                <Form.Group sm={4} as={Col} controlId="zip">
                    <Form.Label>Zip:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="zip"
                        value={addressData.zip}
                        onChange={(e) => onZipChanged(e, "zip")}
                    />
                </Form.Group>

                <Form.Group sm={4} as={Col} controlId="country">
                    <Form.Label>Country:</Form.Label>
                    <ReactFlagsSelect
                        searchable
                        searchPlaceholder="Search Country"
                        selected={addressData.country}
                        onSelect={handleCountryChanged}
                        selectButtonClassName="countrySelect"
                    />
                </Form.Group>
            </Row>
        </>
    );
};

export default AddressFields;
