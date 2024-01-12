import { Navigate } from "react-router";
import { validateToken } from "../tools/validateToken";
function ProtectedRoute({ children, redirectTo="/" }){

    const auth = validateToken();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    return children;
}
export default ProtectedRoute;