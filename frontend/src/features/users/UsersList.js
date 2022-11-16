import {useGetUsersQuery} from "./usersApiSlice";
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';
import newTitle from "../../hooks/useTitle";
import {Container, Table} from "react-bootstrap";

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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Roles</th>
                        <th scope="col">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </Table>
            </Container>
        );
    }
    return content;
};
export default UsersList;