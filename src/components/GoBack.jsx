import {
    Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors } from '../stylesConfig';
function GoBack(){
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const goBackPage = () =>{
        navigate(-1);
    }
    return(
        <>
            <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={goBackPage}
                sx={{
                    backgroundColor:colors.primaryColor,
                    '&:hover':{
                        backgroundColor:colors.primaryColor
                    }
                }} 
            >
                {t("go-back")}
            </Button>
        </>
    );
}
export default GoBack;