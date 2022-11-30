import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const location = useLocation();
    const {roles} = useAuth();
    const rolesArray = [roles]; //TODO: Fix this hack (need to convert string to array) for some function.

    return (
        rolesArray.some(role => allowedRoles.includes(role))
            ? <Outlet/>
            : <Navigate to="/" state={{from: location}} replace/>
    );
};
export default RequireAuth;