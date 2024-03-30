import { useEffect } from "react";
import { Navigate } from "react-router";
import { validateToken } from "../tools/validateToken";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { getAccessControl } from "../reducers/security/security";
function ProtectedRoute({ children, redirectTo="/", permission="" }){
    const dispatch = useDispatch();
    // const {listAccessControl} = useSelector((state)=>state.security);
    // useEffect(()=>{
    //     dispatch(getAccessControl(sessionStorage.getItem("typeUser")))
    // },[])
    const auth = validateToken();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    // const isAuthorized = listAccessControl?.find((item)=> item.alias === permission);
    // if(listAccessControl?.length > 0){
    //     console.log("entro",!isAuthorized);
    //     if(!isAuthorized){
    //         return <Navigate to="/home"/>
    //     }
    // }
    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.string,
    permission: PropTypes.string
};
export default ProtectedRoute;