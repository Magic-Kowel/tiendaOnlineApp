import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';
import { colors,sizeTitleForm } from "../stylesConfig";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
function MainCard({
    title,
    handleSubmit,
    children
}){
    const [t] = useTranslation("global");
    return(
            <Card
                component="form"
                autoComplete="off"
                fullWidth
            >
                <CardContent>
                    {title && (
                        <Typography
                            sx={{
                                fontSize:sizeTitleForm,
                            }}
                            textAlign="center"
                            variant="h2"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                    )}
                    {children}
                </CardContent>
                {(handleSubmit)&&(
                    <CardActions>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor:colors.primaryColor,
                                '&:hover':{
                                    backgroundColor:colors.primaryColor
                                }
                            }}
                        >
                            {t("create")}
                        </Button>
                    </CardActions>
                )}
            </Card>
    )
}
MainCard.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    handleSubmit: PropTypes.func
};
export default MainCard;