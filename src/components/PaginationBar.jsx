import {
    Pagination
} from '@mui/material';
import { colors } from '../stylesConfig';
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
                sx={{ "& .MuiPaginationItem-root": { // Aplica estilos a los elementos MuiPaginationItem
                    color: colors.secondaryColor, // Cambia el color del texto de las páginas
                    "&.Mui-selected": { // Estilos cuando una página está seleccionada
                        backgroundColor: colors.primaryColor, // Cambia el color de fondo cuando la página está seleccionada
                        color: "white" // Cambia el color del texto cuando la página está seleccionada
                    }
                }}}
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