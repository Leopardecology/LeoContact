import {useSelector} from 'react-redux';
import {selectCurrentToken} from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let status = "User";

    if (token) {
        const decoded = jwtDecode(token);
        const {username, roles} = decoded.UserInfo;

        isAdmin = roles.includes('Admin');
        status = isAdmin ? "Admin" : "User";

        return {username, roles, isAdmin, status};
    }

    return {username: '', roles: [], isAdmin, status};
};

export default useAuth;