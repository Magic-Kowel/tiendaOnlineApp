import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function Loader(){
    const [t]= useTranslation("global");
    return(
        <Box sx={{ display: 'flex',
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:"center",
        height: '100vh'
    }}
        >
            <CircularProgress 
                size={100}
            />
            <Typography variant="h6">
                {t("loading")}
            </Typography>
        </Box>
    );
}
export default Loader;