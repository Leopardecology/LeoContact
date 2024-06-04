import {useParams} from 'react-router-dom';
import {useGetContactsQuery} from './contactsApiSlice';
import EditContactForm from './EditContactForm';
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import {Container} from "react-bootstrap";

const EditContact = () => {
    useTitle('LeoContacts - Edit Contact');

    const {id} = useParams();

    const {contact} = useGetContactsQuery("contactsList", {
        selectFromResult: ({data}) => ({
            contact: data?.entities[id]
        }),
    });

    if (!contact) return <PulseLoader color={"#FFF"}/>;

    return <EditContactForm contact={contact}/>;
};
export default EditContact;