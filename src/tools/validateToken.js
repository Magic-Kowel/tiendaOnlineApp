import jwtDecode from 'jwt-decode';
import {NAME_TOKEN} from "./../config";
export function validateToken(){
    const token = sessionStorage.getItem(NAME_TOKEN);
    if(!token){
        return false;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if(decoded.exp > currentTime){
        return true;
    }
    return false;
}