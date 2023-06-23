import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactInfoFields = ({
                               calendar,
                               onCalendarChanged,
                               annualReport,
                               onAnnualReportChanged,
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
                        onChange={onCalendarChanged}/>
                </Form.Group>

                <Form.Group sm={3} as={Col} className="large-checkbox" id="annualReport">
                    <Form.Check
                        label="Annual Report"
                        type="checkbox"
                        name="annualReport"
                        checked={annualReport}
                        onChange={onAnnualReportChanged}/>
                </Form.Group>
            </Row>

        </>
    );
};

export default ContactInfoFields;
