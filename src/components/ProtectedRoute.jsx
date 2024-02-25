import { Navigate } from "react-router";
import { validateToken } from "../tools/validateToken";
import PropTypes from 'prop-types';
function ProtectedRoute({ children, redirectTo="/" }){
    const auth = validateToken();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.string
};
export default ProtectedRoute;