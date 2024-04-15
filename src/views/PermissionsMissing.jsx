import Container from '@mui/material/Container';
import {Box} from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import TitlePage from '../components/TitlePage';
import { useTranslation } from 'react-i18next';
function PermissionsMissing(){
    const [t] = useTranslation("global");
    return(
        <>
            <Container>
                <TitlePage
                    title={t("no-permission-enter-part")}
                />
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width: "100rvw", // Establecer al 100% de la altura de la ventana
                }}>
                    <PersonOffIcon sx={{fontSize:"20vw"}} />
                </Box>
            </Container>
        </>
    )
}
export default PermissionsMissing;