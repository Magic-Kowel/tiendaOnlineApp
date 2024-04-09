import {
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { sizeTitle } from '../stylesConfig';
import PropTypes from 'prop-types';
function TitlePage({title}){
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Define el tamaño de la fuente basado en el tamaño de la pantalla
    const fontSize = isSmallScreen ? '10vmin' : sizeTitle;
    return(
        <>
            <Typography
                    sx={{
                        fontSize:fontSize,
                        textTransform:"uppercase"
                    }}
                    textAlign="center"
                    variant="h1"
                    gutterBottom
            >
                {title}
            </Typography>
        </>
    );
}
TitlePage.propTypes = {
    title: PropTypes.string.isRequired
};

export default TitlePage;