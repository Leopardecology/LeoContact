import {useGetContactsQuery} from "./contactsApiSlice";
import Contact from "./Contact";
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from "../../hooks/useTitle";
import {Button, Container, OverlayTrigger, Stack, Table, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from 'react';

const ContactsList = () => {
    useTitle('LeoContacts - Contacts');

    const {isAdmin} = useAuth();
    const navigate = useNavigate();
    const onNewContactClicked = () => navigate('/dash/contacts/new');

    const {
        data: contacts, isLoading, isSuccess, isError, error
    } = useGetContactsQuery('contactsList', {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true
    });

    const [sortConfig, setSortConfig] =
        useState({ key: 'firstname', direction: 'ascending' });


    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
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

        if (ids.length === 0) {
            tableContent = <tr><td colSpan="4">No contacts found.</td></tr>;
        } else {
            let filteredIds = isAdmin ? ids : ids.filter(id => !entities[id].personal);
            let sortedIds = sortedContacts(filteredIds, entities);

            tableContent = sortedIds.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ));
        }
    }

    if (isError) {
        console.error('API Error:', error);
        const errorMessage = error.data.message ? error.data.message : 'An error occurred. Please check the console for details.';
        tableContent = <tr>
            <td colSpan="5">{errorMessage}</td>
        </tr>;
    }

    if (isLoading) {
        tableContent = <tr>
            <td colSpan="5"><PulseLoader color={"#FFF"}/></td>
        </tr>;
    }

    content = (
        <Container>
            <h1 className={"title prevent-select"}>Contacts</h1>
            <Stack direction={"horizontal"} gap={3}>
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="back-tooltip">Back</Tooltip>}>
                    <Button className="back-button" onClick={() => navigate('/dash')}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id="add-tooltip">Add New Contact</Tooltip>}>
                    <Button className="icon-button ms-auto" onClick={onNewContactClicked}>
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