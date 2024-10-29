import { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Contact = ({ contact }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const updated = new Date(contact.updatedAt).toLocaleString('de-DE', { day: 'numeric', month: 'long' });

    const handleEdit = () => {
        // Append location.search to retain filters
        navigate(`/dash/contacts/${contact.id}${location.search}`);
    };

    return (
        <tr className="table__row" onClick={handleEdit}>
            <td className="table__cell">{contact.firstname}</td>
            <td className="table__cell">{contact.lastname}</td>
            <td className="table__cell">{updated}</td>
            <td className="table__cell">{contact.email}</td>
        </tr>
    );
};

export default memo(Contact);