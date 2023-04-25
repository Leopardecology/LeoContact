import {Form, Col, Row} from "react-bootstrap";

const ContactInfoFields = ({
                               calendar,
                               annualReport,
                               handleInputChange,
                               handleCheckboxChange,
                           }) => {
    return (
        <>
            <h5>Info</h5>
            <Row className="mb-3">
                <Form.Group sm={2} as={Col} controlId="calendar">
                    <Form.Label>Calendar:</Form.Label>
                    <Form.Control
                        placeholder="Amount of Calendar"
                        autoComplete="off"
                        type="text"
                        name="calendar"
                        value={calendar}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group sm={3} as={Col} id="annualReport">
                    <Form.Check
                        label="Annual Report"
                        type="checkbox"
                        name="annualReport"
                        checked={annualReport}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
            </Row>
        </>
    );
};

export default ContactInfoFields;
