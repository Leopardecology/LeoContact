import {useGetUsersQuery} from "./usersApiSlice";
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';
import newTitle from "../../hooks/useTitle";
import {Button, Container, OverlayTrigger, Stack, Table, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const UsersList = () => {
    newTitle('LeoContacts - Users');

    const navigate = useNavigate();
    const onNewUserClicked = () => navigate('/dash/users/new');

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
                <h1 className={"title prevent-select"}>Users</h1>

                <Stack direction={"horizontal"} gap={3}>
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Back</strong>
                            </Tooltip>
                        }>
                        <Button
                            className="back-button"
                            onClick={() => navigate('/dash')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip id="my-tooltip-id">
                                <strong>Add New User</strong>
                            </Tooltip>
                        }>
                        <Button
                            className="icon-button ms-auto"
                            onClick={onNewUserClicked}
                        >
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </Button>
                    </OverlayTrigger>
                </Stack>

                <Table className={"prevent-select"} striped bordered hover>
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Roles</th>
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