import {
    Typography
} from '@mui/material';
import { sizeTitle } from '../stylesConfig';
import PropTypes from 'prop-types';
function TitlePage({title}){
    return(
        <>
            <Typography
                    sx={{
                        fontSize:sizeTitle,
                        textTransform:"uppercase"
                    }}
                    textAlign="center"
                    component="h1" 
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