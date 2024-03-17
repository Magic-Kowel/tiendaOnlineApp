import {
    Pagination
} from '@mui/material';
import PropTypes from 'prop-types';
function PaginationBar({setPage,page}){

    const handleChange = (event, value) => {
        setPage(value);
        // Aquí puedes realizar alguna acción cuando cambie la página, como cargar datos de la nueva página, etc.
    };
    return(
        <>
            <Pagination
                count={10} // Número total de páginas
                page={page} // Página actual
                onChange={handleChange} // Manejador de cambio de página
                shape="circular" // Forma de los botones
                color="primary" // Color del paginador
                size="large" // Tamaño del paginador
            />
        </>
    )
}
PaginationBar.propTypes = {
    page:PropTypes.number.isRequired,
    setPage:PropTypes.func.isRequired
};
export default PaginationBar;