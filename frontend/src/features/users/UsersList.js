import {useGetUsersQuery} from "./usersApiSlice";
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';
import newTitle from "../../hooks/useTitle";
import {Container} from "react-bootstrap";

const UsersList = () => {
    newTitle('LeoContacts - Users');

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) content = <PulseLoader color={"#FFF"}/>;

    if (isError) {
        content = <p className="error">{error?.data?.message}</p>;
    }

    if (isSuccess) {

        const {ids} = users;

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId}/>);

        content = (
            <Container>
                <table className="table table--users">
                    <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </table>
            </Container>
        );
    }
    return content;
};
export default UsersList;