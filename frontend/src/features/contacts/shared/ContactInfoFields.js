import React from "react";
import {Col, Form, Row} from "react-bootstrap";

const ContactInfoFields = ({
                               calendar,
                               onCalendarChanged,
                               annualReport,
                               onAnnualReportChanged,
                               comment,
                               onCommentChanged,
                               classNames
                           }) => {
    return (
        <>
            <h5>Info</h5>

            <Row className="mb-3">
                <Form.Group sm={2} as={Col} controlId="calendar">
                    <Form.Label>Calendar:</Form.Label>
                    <Form.Control
                        placeholder="Amount"
                        className={classNames.calendarClassName}
                        autoComplete="off"
                        type="text"
                        name="calendar"
                        value={calendar}
                        onChange={onCalendarChanged}/>
                </Form.Group>

                <Form.Group sm={2} as={Col} controlId="annualReport">
                    <Form.Label>Annual Report:</Form.Label>
                    <Form.Control
                        placeholder="Amount"
                        className={classNames.annualReportClassName}
                        autoComplete="off"
                        type="text"
                        name="annualReport"
                        value={annualReport}
                        onChange={onAnnualReportChanged}/>
                </Form.Group>

                <Form.Group sm={6} as={Col} controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control
                        placeholder=""
                        autoComplete="off"
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={onCommentChanged}/>
                </Form.Group>
            </Row>

        </>
    );
};

export default ContactInfoFields;
