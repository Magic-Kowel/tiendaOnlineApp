import {
    Tabs,
    Tab
} from '@mui/material';
import { colors } from '../../stylesConfig';
import PropTypes from 'prop-types';
function TabHeader({
    value,
    handleChange,
    listTitles
}){
    return (
        <Tabs 
        value={value} 
        onChange={handleChange} 
        centered
        textColor={colors.primaryColor} // Color del texto cuando está inactivo
        sx={{ 
            '& .Mui-selected': { // Estilo del tab seleccionado
              color: colors.primaryColor, // Color del texto personalizado
            },
            '& .MuiTabs-indicator': { // Estilo de la línea indicadora
              backgroundColor: colors.primaryColor, // Color de la línea indicadora personalizado
            },
        }}>
          {listTitles.map((title, index) => (
            <Tab key={index} label={title}  sx={{color:colors.primaryColor}} />
          ))}
        </Tabs>
    );
}
TabHeader.propTypes = {
    value:PropTypes.number.isRequired,
    handleChange:PropTypes.func.isRequired,
    listTitles: PropTypes.array.isRequired
};
export default TabHeader;