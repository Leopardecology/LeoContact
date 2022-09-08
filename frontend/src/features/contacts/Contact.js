import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectContactById } from './contactsApiSlice'

const Contact = ({ contactId }) => {

    const contact = useSelector(state => selectContactById(state, contactId))

    const navigate = useNavigate()

    if (contact) {
        const updated = new Date(contact.updatedAt).toLocaleString('de-DE', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/contacts/${contactId}`)

        return (
            <tr className="table__row">
                <td className="table__cell contact__username">{contact.name}</td>
                <td className="table__cell contact__created">{contact.surname}</td>
                <td className="table__cell contact__updated">{updated}</td>
                <td className="table__cell contact__title">{contact.email}</td>


                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Contact