import {store} from '../../app/store';
import {contactsApiSlice} from '../contacts/contactsApiSlice';
import {usersApiSlice} from '../users/usersApiSlice';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(contactsApiSlice.util.prefetch('getContacts', 'contactsList', {force: true}));
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}));
    }, []);

    return <Outlet/>;
};
export default Prefetch;