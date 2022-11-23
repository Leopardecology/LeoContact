import {useNavigate} from 'react-router-dom';
import {memo} from "react";

import {useGetUsersQuery} from "./usersApiSlice";

const User = ({userId}) => {

    const {user} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[userId]
        }),
    });

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`);

        const userRolesString = user.roles.toString().replaceAll(',', ', ');

        const cellStatus = user.active ? '' : 'table__cell--inactive';

        return (
            <tr className="table__row" onClick={handleEdit}>
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            </tr>
        );

    } else return null;
};

const memoizedUser = memo(User);

export default memoizedUser;