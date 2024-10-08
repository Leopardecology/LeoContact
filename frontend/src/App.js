import {Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./components/Home";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import ContactsList from "./features/contacts/ContactsList";
import SelectContacts from "./features/contacts/contact_features/SelectContacts";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditContact from "./features/contacts/EditContact";
import NewContactForm from "./features/contacts/NewContactForm";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import useTitle from "./hooks/useTitle";
import {ROLES} from "./config/roles";


function App() {
    useTitle('LeoContacts');
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* Home Routes */}
                <Route index element={<Home/>}/>

                {/* Protected Routes */}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                        <Route element={<Prefetch/>}>
                            <Route path="dash" element={<DashLayout/>}>

                                <Route index element={<Welcome/>}/>

                                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                                    <Route path="users">
                                        <Route index element={<UsersList/>}/>
                                        <Route path=":id" element={<EditUser/>}/>
                                        <Route path="new" element={<NewUserForm/>}/>
                                    </Route>
                                </Route>

                                <Route path="contacts">
                                    <Route index element={<ContactsList/>}/>
                                    <Route path=":id" element={<EditContact/>}/>
                                    <Route path="new" element={<NewContactForm/>}/>
                                    <Route path="select" element={<SelectContacts/>}/>
                                </Route>

                            </Route> {/*End Dash*/}
                        </Route>
                    </Route>
                </Route> {/*End Protected Routes*/}
            </Route>
        </Routes>
    );
}

export default App;