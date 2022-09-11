import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectContactById} from './contactsApiSlice';
import EditContactForm from './EditContactForm';

const EditContact = () => {
    const {id} = useParams();

    const contact = useSelector(state => selectContactById(state, id));

    const content = contact ? <EditContactForm contact={contact}/> : <p>Loading...</p>;

    return content;
};
export default EditContact;