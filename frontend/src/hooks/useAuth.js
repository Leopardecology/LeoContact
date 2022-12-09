import {useSelector} from 'react-redux';
import {selectCurrentToken} from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let loggedInUser = "";
    let status = "User";

    if (token) {
        const decoded = jwtDecode(token);
        const {username, roles} = decoded.UserInfo;

        isAdmin = roles.includes('Admin');
        loggedInUser = username;
        status = isAdmin ? "Admin" : "User";

        return {username, roles, isAdmin, status, loggedInUser};
    }

    return {username: '', roles: [], isAdmin, status, loggedInUser};
};

export default useAuth;