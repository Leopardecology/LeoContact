import React, {useState} from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import * as XLSX from 'xlsx';

const ExportContacts = ({
                            handleClose,
                            selectedContacts,
                            contacts,
                            fieldLabels
                        }) => {
    const fields = Object.keys(fieldLabels);
    const [selectedFields, setSelectedFields] = useState(() =>
        fields.reduce((acc, field) => {
            acc[field] = true; // Default selected all fields
            return acc;
        }, {})
    );
    const [exportFormat, setExportFormat] = useState('csv');

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

    const exportToExcel = () => {
        const data = getExportData();
        console.log(data);
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contacts");
        XLSX.writeFile(wb, "exported_contacts.xlsx");
        handleClose();
    };

    const handleExport = () => {
        if (exportFormat === 'excel') {
            exportToExcel();
        }
        // For CSV, we'll use the existing CSVLink component
    };

    return (
        <>
            <h5>Select Fields to Export</h5>
            <Button onClick={handleSelectAllFields} className="me-2 mb-3">Select
                All</Button>
            <Button onClick={handleDeselectAllFields} className="mb-3">Deselect
                All</Button>
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
            <div
                className="mt-3 d-flex align-items-center justify-content-between">
                <Form.Select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="me-2"
                    style={{width: 'auto'}}
                >
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                </Form.Select>
                <div className="ms-auto">
                    {exportFormat === 'csv' ? (
                        <CSVLink
                            data={getExportData()}
                            filename="exported_contacts.csv"
                            className="btn btn-primary"
                            target="_blank"
                            onClick={handleClose}
                        >
                            Export
                        </CSVLink>
                    ) : (
                        <Button onClick={handleExport}
                                className="btn btn-primary">
                            Export
                        </Button>
                    )}
                </div>
            </div>

        </>
    );
};

export default ExportContacts;