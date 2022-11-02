import {Link} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useTitle from '../../hooks/useTitle';

const Welcome = () => {

    const {username, isAdmin} = useAuth();

    useTitle('LeoContacts - Welcome');

    const date = new Date();
    const today = new Intl.DateTimeFormat('de-DE', {dateStyle: 'full', timeStyle: 'long'}).format(date);

    return (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/contacts">View Contacts</Link></p>

            <p><Link to="/dash/contacts/new">Add New Contacts</Link></p>

            {(isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    );
};

export default Welcome;