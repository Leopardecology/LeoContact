import {Link} from 'react-router-dom';

const Welcome = () => {

    const date = new Date();
    const today = new Intl.DateTimeFormat('de-DE', {dateStyle: 'full', timeStyle: 'long'}).format(date);

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/contacts">View Contacts</Link></p>

            <p><Link to="/dash/contacts/new">Add New Contacts</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

            <p><Link to="/dash/users/new">Add New User</Link></p>

        </section>
    );
    return content;
};

export default Welcome;