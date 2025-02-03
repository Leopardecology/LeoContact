import React from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

const PrintContacts = ({ selectedContacts, contacts, handleClose }) => {
    const formatAddressForPDF = (contact) => {
        const address = contact.address || {};
        const lines = [];
        
        lines.push(`${contact.salutation} ${contact.firstname} ${contact.lastname}`);
        if (contact.company) lines.push(contact.company);
        if (address.street) lines.push(address.street);
        if (address.zip || address.city) {
            lines.push(`${address.zip || ''} ${address.city || ''}`);
        }
        if (address.country) lines.push(address.country);
        
        return lines;
    };

    const handleGeneratePDF = () => {
        const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4'
        });

        const labelWidth = 70;
        const labelHeight = 37;
        const cols = 3;
        const rows = 8;
        const marginLeft = 0;
        const marginTop = 0;
        const fontSize = 10;

        pdf.setFontSize(fontSize);

        let currentPage = 1;
        const labelsPerPage = cols * rows;

        selectedContacts.forEach((id, index) => {
            const contact = contacts.entities[id];
            if (!contact) return;

            // Calculate position
            const pageIndex = Math.floor(index / labelsPerPage);
            const labelIndex = index % labelsPerPage;
            const col = labelIndex % cols;
            const row = Math.floor(labelIndex / cols);

            // Add new page if needed
            if (pageIndex + 1 > currentPage) {
                pdf.addPage();
                currentPage = pageIndex + 1;
            }

            // Calculate x and y positions
            const x = marginLeft + (col * labelWidth) + 5; // 5mm padding
            const y = marginTop + (row * labelHeight) + 10; // 10mm initial padding

            // Add address lines
            const addressLines = formatAddressForPDF(contact);
            addressLines.forEach((line, lineIndex) => {
                pdf.text(line, x, y + (lineIndex * 5));
            });
        });

        // Download the PDF
        pdf.save('address-labels.pdf');
    };

    return (
        <div>
            <div className="print-controls">
                <h5>Generate Address Labels PDF</h5>
                <p>Selected contacts will be formatted for 70mm x 37mm labels (24 per page)</p>
                <Button onClick={handleGeneratePDF} variant="primary" className="me-2">
                    Download PDF
                </Button>
                <Button onClick={handleClose} variant="secondary">
                    Back
                </Button>
            </div>
        </div>
    );
};

export default PrintContacts;
