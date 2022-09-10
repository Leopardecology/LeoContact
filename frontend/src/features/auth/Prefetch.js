import {store} from '../../app/store';
import {contactsApiSlice} from "../contacts/contactsApiSlice";
import {usersApiSlice} from '../users/usersApiSlice';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing');
        const contacts = store.dispatch(contactsApiSlice.endpoints.getContacts.initiate());
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

        return () => {
            console.log('unsubscribing');
            contacts.unsubscribe();
            users.unsubscribe();
        };
    }, []);

    return <Outlet/>;
};

export default Prefetch;