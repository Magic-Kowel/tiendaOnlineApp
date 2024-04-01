import { useEffect } from "react";
import { Navigate } from "react-router";
import { validateToken } from "../tools/validateToken";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { permissionsTypeUserLogin } from "../reducers/security/security";
function ProtectedRoute({ children, redirectTo="/", permission="" }){
    const dispatch = useDispatch();
    const {userPermissions} = useSelector((state)=>state.security);
    useEffect(()=>{
        dispatch(permissionsTypeUserLogin(sessionStorage.getItem("typeUser")))
    },[])
    const auth = validateToken();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    console.log(permission);
    const isAuthorized = userPermissions?.find((item)=> item.permission === permission);
    console.log(isAuthorized);
    if(userPermissions?.length > 0){
        if(!isAuthorized){
            return <Navigate to="/home"/>
        }
    }
    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.string,
    permission: PropTypes.string
};
export default ProtectedRoute;