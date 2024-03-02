import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { colors } from '../stylesConfig';
function LoadingButton({
    isLoading,
    children,
    click,
    icon
}){
    return(
        <Button
            fullWidth
            disabled={isLoading}
            onClick={click}
            endIcon={icon}
            variant="contained"
            sx={{
                backgroundColor:colors.primaryColor,
                '&:hover':{
                    backgroundColor:colors.primaryColor
                },
                gap:2
            }}
        >
            {isLoading && (
            <CircularProgress size={24} color="inherit" />
            )}
            {children}
      </Button>
    )
}
LoadingButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node
};
export default LoadingButton;