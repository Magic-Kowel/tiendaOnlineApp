import { NAME_TOKEN } from "../config";
import jwtDecode from "jwt-decode";
function getIdUser(){
    const token = sessionStorage.getItem(NAME_TOKEN);
    const decoded = jwtDecode(token);
    return decoded?.id;
}
export default getIdUser;