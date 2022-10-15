import {useParams} from 'react-router-dom';
import {useGetUsersQuery} from './usersApiSlice';
import EditUserForm from './EditUserForm';
import PulseLoader from "react-spinners/PulseLoader";
import newTitle from "../../hooks/useTitle";

const EditUser = () => {
    newTitle('LeoContacts - Edit User');

    const {id} = useParams();

    const {user} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        }),
    });

    if (!user) return <PulseLoader color={"#FFF"}/>;

    return <EditUserForm user={user}/>;
};
export default EditUser;