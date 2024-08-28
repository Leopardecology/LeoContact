import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

const ExportContacts = ({ handleClose, selectedContacts, contacts, fieldLabels }) => {
    const [selectedFields, setSelectedFields] = useState({});

    const fields = Object.keys(fieldLabels);

    const handleFieldSelect = (field) => {
        setSelectedFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSelectAllFields = () => {
        const allSelected = fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {});
        setSelectedFields(allSelected);
    };

    const handleDeselectAllFields = () => {
        setSelectedFields({});
    };

    const getExportData = () => {
        if (!contacts?.entities) return [];
        return selectedContacts.map(id => {
            const contact = contacts.entities[id];
            const exportData = {};
            Object.keys(selectedFields).forEach(field => {
                if (selectedFields[field]) {
                    if (field.includes('.')) {
                        const [parent, child] = field.split('.');
                        exportData[fieldLabels[field]] = contact[parent] ? contact[parent][child] || '' : '';
                    } else {
                        exportData[fieldLabels[field]] = contact[field] || '';
                    }
                }
            });
            return exportData;
        });
    };

    return (
        <>
            <h5>Select Fields to Export</h5>
            <Button onClick={handleSelectAllFields} className="me-2 mb-3">Select All</Button>
            <Button onClick={handleDeselectAllFields} className="mb-3">Deselect All</Button>
            <Row>
                {fields.map(field => (
                    <Col key={field} xs={6} md={4} lg={3} className="mb-2">
                        <Form.Check
                            type="checkbox"
                            id={`field-${field}`}
                            label={fieldLabels[field]}
                            checked={!!selectedFields[field]}
                            onChange={() => handleFieldSelect(field)}
                        />
                    </Col>
                ))}
            </Row>
            <div className="mt-3">
                <CSVLink
                    data={getExportData()}
                    filename="exported_contacts.csv"
                    className="btn btn-primary"
                    target="_blank"
                    onClick={handleClose}
                >
                    Export
                </CSVLink>
            </div>
        </>
    );
};

export default ExportContacts;