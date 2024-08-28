import React, {useState} from 'react';
import {useGetContactsQuery} from "../contactsApiSlice";
import {
    Container,
    Table,
    Form,
    Button,
    Row,
    Stack,
    Col,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";
import PulseLoader from 'react-spinners/PulseLoader';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faFilterCircleXmark,
    faTasks
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom';
import useTitle from "../../../hooks/useTitle";
import ManageSelectedContacts from "./ManageSelectedContacts";
import ReactFlagsSelect from "react-flags-select";

const SelectContacts = () => {
    useTitle('LeoContacts - Select Contacts');
    const navigate = useNavigate();
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedAdministration, setSelectedAdministration] = useState('');

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

    const fieldLabels = {
        'salutation': 'Salutation',
        'firstname': 'First Name',
        'lastname': 'Last Name',
        'company': 'Company',
        'email': 'Email',
        'telephonePrivate': 'Private Phone',
        'telephoneBusiness': 'Business Phone',
        'role': 'Role',
        'calendarEnglish': 'English Calendar',
        'calendarGerman': 'German Calendar',
        'annualReport': 'Annual Report',
        'address.street': 'Street',
        'address.streetAddition': 'Street Addition',
        'address.city': 'City',
        'address.zip': 'ZIP',
        'address.country': 'Country',
        'comment': 'Comment',
        'personal': 'Personal',
        'administration': 'Administration'
    };

    const handleSelectContact = (contactId, event) => {
        if (event.target.type === 'checkbox') return;

        setSelectedContacts(prev =>
            prev.includes(contactId)
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
    };

    const handleCheckboxChange = (contactId, event) => {
        event.stopPropagation();
        setSelectedContacts(prev =>
            prev.includes(contactId)
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
    };

    const handleSelectAll = () => {
        if (isSuccess && contacts?.ids) {
            const {ids, entities} = contacts;
            const filteredIds = filterContacts(ids, entities);

            // Merge filtered contacts with already selected contacts
            setSelectedContacts(prev => [...new Set([...prev, ...filteredIds])]);
        }
    };

    const handleDeselectAll = () => {
        if (isSuccess && contacts?.ids) {
            const {ids, entities} = contacts;
            const filteredIds = filterContacts(ids, entities);
            setSelectedContacts(prev => prev.filter(id => !filteredIds.includes(id)));
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCountry('');
        setSelectedAdministration('');
    };

    const filterContacts = (ids, entities) => {
        return ids.filter(id => {
            const contact = entities[id];
            if (!contact) return false;

            const searchString = searchTerm.toLowerCase();

            const matchesSearchTerm =
                (contact.firstname && contact.firstname.toLowerCase().includes(searchString)) ||
                (contact.lastname && contact.lastname.toLowerCase().includes(searchString)) ||
                (contact.email && contact.email.toLowerCase().includes(searchString));

            const matchesCountry =
                selectedCountry === '' || (contact.address && contact.address.country === selectedCountry);

            const matchesAdministration =
                selectedAdministration === '' || contact.administration === selectedAdministration;

            return matchesSearchTerm && matchesCountry && matchesAdministration;
        });
    };

    let content;

    if (isLoading) {
        content = <PulseLoader color={"#FFF"}/>;
    } else if (isError) {
        content = <p>{error?.data?.message || "An error occurred"}</p>;
    } else if (isSuccess) {
        const {ids, entities} = contacts;
        let filteredIds = filterContacts(ids, entities);

        const tableContent = filteredIds.map(contactId => {
            const contact = entities[contactId];
            return (
                <tr
                    key={contactId}
                    onClick={(event) => handleSelectContact(contactId, event)}
                    style={{cursor: 'pointer'}}
                >
                    <td onClick={(e) => e.stopPropagation()}>
                        <Form.Check
                            type="checkbox"
                            checked={selectedContacts.includes(contactId)}
                            onChange={(event) => handleCheckboxChange(contactId, event)}
                        />
                    </td>
                    <td>{contact.firstname}</td>
                    <td>{contact.lastname}</td>
                    <td>{contact.email}</td>
                </tr>
            );
        });

        content = (
            <>
                <Row className="mb-3 align-items-center">
                    <Stack direction={"horizontal"} gap={3}>
                        <OverlayTrigger placement="top" overlay={<Tooltip
                            id="back-tooltip">Back</Tooltip>}>
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
                                width: '15%',
                                position: 'relative',
                                left: '0%',
                            }}
                        />

                        <Row className="g-3">
                            <Col xs={6}>
                                <Form.Group controlId="country">
                                    <ReactFlagsSelect
                                        searchable
                                        searchPlaceholder="Search Country"
                                        selected={selectedCountry}
                                        onSelect={(code) => setSelectedCountry(code)}
                                        className="countrySearch"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group controlId="administration">
                                    <Form.Select
                                        value={selectedAdministration}
                                        onChange={(e) => setSelectedAdministration(e.target.value)}
                                        className="administrationSearch"
                                    >
                                        <option value="">All Administrations
                                        </option>
                                        <option
                                            value="Switzerland">Switzerland
                                        </option>
                                        <option value="Botswana">Botswana
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <OverlayTrigger placement="top" overlay={<Tooltip
                            id="clear-filters-tooltip">Clear
                            Filters</Tooltip>}>
                            <Button className="clear-filters-button"
                                    onClick={clearFilters}>
                                <FontAwesomeIcon icon={faFilterCircleXmark}/>
                            </Button>
                        </OverlayTrigger>

                        {/* Use ms-auto to push this button to the right */}
                        <OverlayTrigger placement="top"
                                        overlay={<Tooltip id="add-tooltip">Continue
                                            with Selected Contacts</Tooltip>}>
                            <Button onClick={() => setShowModal(true)}
                                    className="ms-auto">
                                <FontAwesomeIcon icon={faTasks}/> Continue
                                ({selectedContacts.length})
                            </Button>
                        </OverlayTrigger>
                    </Stack>
                </Row>


                {/* New Row for Select All and Deselect All Filtered */}
                <Row className="mb-3">
                    <Col xs="auto">
                        <Button onClick={handleSelectAll} className="me-2">
                            Select All Filtered
                        </Button>
                    </Col>
                    <Col xs="auto" className="ms-auto">
                        <Button onClick={handleDeselectAll} className="me-2">
                            Deselect All Filtered
                        </Button>
                    </Col>
                </Row>

                <Table className={"prevent-select"} striped bordered hover>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </Table>

                <ManageSelectedContacts
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    selectedContacts={selectedContacts}
                    contacts={contacts}
                    fieldLabels={fieldLabels}
                />
            </>
        );
    }

    return (
        <Container>
            <h1 className={"title prevent-select"}>Select Contacts</h1>
            {content}
        </Container>
    );
};

export default SelectContacts;