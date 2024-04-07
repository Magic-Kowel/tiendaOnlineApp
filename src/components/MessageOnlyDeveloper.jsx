import {
    Alert
} from '@mui/material';
import { colors } from '../stylesConfig';
import { useTranslation } from 'react-i18next';
function MessageOnlyDeveloper(){
    const [t] = useTranslation("global");
    return(
        <Alert variant="filled" severity="info" sx={{ backgroundColor: colors.primaryColor }}>
            {t("MessageOnlyDeveloper")}
        </Alert>
    )
}
export default MessageOnlyDeveloper;