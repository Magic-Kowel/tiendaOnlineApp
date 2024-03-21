import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';
 
function TextFieldPassword({
        label,
        onChange,
        value,
        error,
        helperText
    }){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return(
        <>
                <FormControl 
                    error={error}
                    fullWidth 
                    sx={{ my: 1 }} 
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                    <OutlinedInput
                    fullWidth
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                    />
                    {/* Agregar el helperText aquí */}
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
      
        </>
    )
}
TextFieldPassword.propTypes = {
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    label:PropTypes.string,
    error:PropTypes.bool,
    helperText:PropTypes.string
};
export default TextFieldPassword;