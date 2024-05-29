import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = ({ contact }) => {
    const navigate = useNavigate();
    const updated = new Date(contact.updatedAt).toLocaleString('de-DE', { day: 'numeric', month: 'long' });

    const handleEdit = () => {
        navigate(`/dash/contacts/${contact.id}`);
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
