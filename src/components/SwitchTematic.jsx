import {
    Switch
} from "@mui/material";
import PropTypes from 'prop-types';
function SwitchTematic({
    checked,
    onChange,
    colorRielCheck,
    icon
}){
    return(
        <Switch 
            checked={checked}
            onChange={onChange}
            icon={icon}
            checkedIcon={icon}
            sx={{
                width: 100,
                height: 50, // Altura del interruptor
                '& .MuiSwitch-switchBase': {
                    padding: 1.2, // Doble del espaciado interno original
                    '&.Mui-checked': {
                    transform: 'translateX(50px)', // Doble del desplazamiento original cuando está activado
                    },
                    textAlign: 'center', // Centra el contenido horizontalmente
                    verticalAlign: 'middle', // Centra el contenido verticalmente
                    // color:  colors.primaryColor,//cambiar el color del icono
                },
                '&:active': {
                    '& .MuiSwitch-thumb': {
                      width: 15,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      transform: 'translateX(9px)',
                    },
                    color: `${colorRielCheck}`,
                },
                '& .MuiSwitch-thumb': {
                    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                },
                '& .MuiSwitch-track': {
                    borderRadius: 16 / 2,
                    boxSizing: 'border-box',
                },
                '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':{
                    backgroundColor:colorRielCheck
                }
            }}
        />
    )
}
SwitchTematic.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange:PropTypes.func.isRequired,
    colorRielCheck: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
export default SwitchTematic;