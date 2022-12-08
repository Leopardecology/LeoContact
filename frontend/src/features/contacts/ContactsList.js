import {useGetContactsQuery} from "./contactsApiSlice";
import Contact from "./Contact";
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from "../../hooks/useTitle";
import {Button, Container, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ContactsList = () => {
    useTitle('LeoContacts - Contacts');

    const {isAdmin} = useAuth();
    const navigate = useNavigate();
    const onNewContactClicked = () => navigate('/dash/contacts/new');

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
    let tableContent;

    if (isSuccess) {
        const {ids, entities} = contacts;

        let filteredIds;

        if (isAdmin) {
            filteredIds = [...ids];
        } else {
            filteredIds = ids.filter(contactId => entities[contactId].personal === false);
        }

        tableContent = ids?.length && filteredIds.map(contactId => <Contact key={contactId}
                                                                            contactId={contactId}/>);
    }

    if (isError) {
        tableContent = <tr>
            <td colSpan="5">{error}</td>
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
            <OverlayTrigger
                placement="right"
                overlay={
                    <Tooltip id="my-tooltip-id">
                        <strong>Add New Contact</strong>
                    </Tooltip>
                }>
                <Button
                    className="icon-button"
                    onClick={onNewContactClicked}
                >
                    <FontAwesomeIcon icon={faFileCirclePlus}/>
                </Button>
            </OverlayTrigger>
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
};

export default ContactsList;