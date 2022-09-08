import {useGetContactsQuery} from "./contactsApiSlice";
import Contact from "./Contact";

const ContactsList = () => {
    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const {ids} = contacts;

        const tableContent = ids?.length
            ? ids.map(contactId => <Contact key={contactId} contactId={contactId}/>)
            : null;

        content = (
            <table className="table table--contacts">
                <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th contact__status">Name</th>
                    <th scope="col" className="table__th contact__created">Surname</th>
                    <th scope="col" className="table__th contact__updated">Updated</th>
                    <th scope="col" className="table__th contact__title">Email</th>

                    <th scope="col" className="table__th contact__edit">Edit</th>
                </tr>
                </thead>
                <tbody>
                {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
};
export default ContactsList;