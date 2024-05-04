import {
    Pagination,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { colors } from '../stylesConfig';
import PropTypes from 'prop-types';
function PaginationBar({setPage,page,count=1}){
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const handleChange = (event, value) => {
        setPage(value);
        // Aquí puedes realizar alguna acción cuando cambie la página, como cargar datos de la nueva página, etc.
    };
    return(
        <>
            <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                shape="circular"
                color="primary"
                siblingCount={0}
                sx={{
                    "& .MuiPaginationItem-root": {
                        "&.Mui-selected": {
                            backgroundColor: colors.primaryColor,
                            color: "white",
                            '&:hover': {
                                backgroundColor: colors.primaryColor,
                                color: "white"
                            },
                        },
                        '&:hover': {
                            backgroundColor: colors.primaryColor,
                            color: "white"
                        },
                        }}
                    }
                    
                size={!onlySmallScreen ? "small": "large"}
            />
        </>
    )
}
PaginationBar.propTypes = {
    page:PropTypes.number.isRequired,
    setPage:PropTypes.func.isRequired,
    count:PropTypes.number.isRequired,
};
export default PaginationBar;