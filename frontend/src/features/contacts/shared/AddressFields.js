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
        onCountryChanged(code);
    };

    return (<>
        <h5>Address</h5>
        <Row className="mb-3">
            <Form.Group sm={6} as={Col} controlId="street">
                <Form.Label>Street:</Form.Label>
                <Form.Control
                    placeholder=""
                    autoComplete="off"
                    type="text"
                    value={addressData.street}
                    onChange={onStreetChanged}
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
                    value={addressData.city}
                    onChange={onCityChanged}
                />
            </Form.Group>

            <Form.Group sm={4} as={Col} controlId="zip">
                <Form.Label>Zip:</Form.Label>
                <Form.Control
                    placeholder=""
                    autoComplete="off"
                    type="text"
                    value={addressData.zip}
                    onChange={onZipChanged}
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
    </>);
};

export default AddressFields;
