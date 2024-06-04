import { useState } from 'react';
import { useGetContactsQuery } from "./contactsApiSlice";
import Contact from "./Contact";
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from "../../hooks/useTitle";
import { Button, Container, OverlayTrigger, Stack, Table, Tooltip, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const ContactsList = () => {
    useTitle('LeoContacts - Contacts');
    const navigate = useNavigate();
    const onNewContactClicked = () => navigate('/dash/contacts/new');
    const [sortConfig, setSortConfig] = useState({ key: 'firstname', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');

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

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filterContacts = (ids, entities) => {
        return ids.filter(id => {
            const contact = entities[id];
            if (!contact) return false; // Check if the contact is undefined

            // Format the date to include day, month, and year
            const updatedDate = contact.updatedAt ? new Date(contact.updatedAt).toLocaleDateString('de-DE', {
                year: 'numeric', month: 'long', day: 'numeric'
            }).toLowerCase() : '';

            const searchString = searchTerm.toLowerCase();

            return (
                (contact.firstname && contact.firstname.toLowerCase().includes(searchString)) ||
                (contact.lastname && contact.lastname.toLowerCase().includes(searchString)) ||
                (contact.email && contact.email.toLowerCase().includes(searchString)) ||
                updatedDate.includes(searchString)
            );
        });
    };


    const sortedContacts = (ids, entities) => {
        return ids.map(id => entities[id]).sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    let content;
    let tableContent;

    if (isSuccess) {
        const { ids, entities } = contacts;
        let filteredIds =  ids

        // Apply search filter
        filteredIds = filterContacts(filteredIds, entities);

        // Sort the contacts
        let sortedIds = sortedContacts(filteredIds, entities);

        tableContent = sortedIds.map(contact => (
            <Contact key={contact.id} contact={contact} />
        ));
    }

    if (isError) {
        console.error('API Error:', error);
        const errorMessage = error.data.message ? error.data.message : 'An error occurred. Please check the console for details.';
        tableContent = <tr><td colSpan="5">{errorMessage}</td></tr>;
    }

    if (isLoading) {
        tableContent = <tr><td colSpan="5"><PulseLoader color={"#FFF"}/></td></tr>;
    }

    content = (
        <Container>
            <h1 className={"title prevent-select"}>Contacts</h1>

            <Stack direction={"horizontal"} gap={3}>
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="back-tooltip">Back</Tooltip>}>
                    <Button className="back-button"
                            onClick={() => navigate('/dash')}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>
                </OverlayTrigger>

                <Form.Control
                    type="text"
                    placeholder="Search Contacts"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '15%', position: 'relative', left: '0%'}}
                />

                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id="add-tooltip">Add New
                        Contact</Tooltip>}>
                    <Button className="icon-button ms-auto"
                            onClick={onNewContactClicked}>
                        <FontAwesomeIcon icon={faFileCirclePlus}/>
                    </Button>
                </OverlayTrigger>
            </Stack>
            <Table className={"prevent-select"} striped bordered hover>
                <thead>
                <tr>
                    <th scope="col" onClick={() => requestSort('firstname')}>First Name</th>
                    <th scope="col" onClick={() => requestSort('lastname')}>Last Name</th>
                    <th scope="col" onClick={() => requestSort('updatedAt')}>Updated</th>
                    <th scope="col" onClick={() => requestSort('email')}>Email</th>
                </tr>
                </thead>
                <tbody>
                {tableContent}
                </tbody>
            </Table>
        </Container>
    );

    return content;
};

export default ContactsList;