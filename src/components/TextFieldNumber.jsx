import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
function TextFieldNumber({label, value, onChange}){
    const handleInputChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        onChange(inputValue);
    };    
    return (
        <TextField
          label={label}
          fullWidth
          type="text"
          value={value}
          onChange={handleInputChange}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
    );
}
TextFieldNumber.propTypes = {
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    label:PropTypes.string
};

export default TextFieldNumber;