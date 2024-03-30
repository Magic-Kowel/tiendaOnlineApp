import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessControl } from "../reducers/security/security";
function UserValidate({
    children,
    permission=""
}){
    const dispatch = useDispatch();
    const {listAccessControl} = useSelector((state)=>state.security);
    useEffect(()=>{
        dispatch(getAccessControl(sessionStorage.getItem("typeUser")))
    },[])
    const isAuthorized = listAccessControl?.find((item)=> item.alias === permission);
    if(listAccessControl?.length > 0){
        console.log("entro",!isAuthorized);
        if(!isAuthorized){
            return <Navigate to="/home"/>
        }
    }
    return children
}
UserValidate.propTypes = {
    children: PropTypes.node,
    permission: PropTypes.string
};
export default UserValidate;