import {useGetContactsQuery} from "./contactsApiSlice";
import Contact from "./Contact";
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from "../../hooks/useTitle";
import {Container, Table} from "react-bootstrap";

const ContactsList = () => {
    useTitle('LeoContacts - Contacts');

    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery('contactsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) content = <PulseLoader color={"#FFF"}/>;

    if (isError) {
        content = <p className="error">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const {ids} = contacts;

        const tableContent = ids?.length
            ? ids.map(contactId => <Contact key={contactId} contactId={contactId}/>)
            : null;

        content = (
            <Container>

                <Table className={"prevent-select"} striped bordered hover>
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Updated</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </Table>
            </Container>
        );
        return content;
    }
};
export default ContactsList;