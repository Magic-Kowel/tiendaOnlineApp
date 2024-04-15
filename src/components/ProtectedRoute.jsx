import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { validateToken } from "../tools/validateToken";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { permissionsTypeUserLogin } from "../reducers/security/security";
function ProtectedRoute({ children, redirectTo="/", permission="" }){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userPermissions} = useSelector((state)=>state.security);
    let permissions;
    useEffect(() => {
        console.log("permission",permission);
        console.log("permission",permission);
        dispatch(permissionsTypeUserLogin(sessionStorage.getItem("typeUser"))).then((response) => {
            const permissionsList = response.payload;
            console.log("permissionsList", response);
            const isAuthorized = permissionsList?.find((item) => item.permission === permission);
            console.log("isAuthorized", isAuthorized);
            if (!isAuthorized) {
                console.log("No está autorizado");
                navigate("/permission/missing");
            }
        });
    }, []);
    const auth = validateToken();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.string,
    permission: PropTypes.string
};
export default ProtectedRoute;