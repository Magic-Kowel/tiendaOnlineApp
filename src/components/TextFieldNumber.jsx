import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
function TextFieldNumber({
  label,
  value,
  onChange,
  error,
  helperText,
  onKeyEnter
}){
    const handleInputChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        onChange(inputValue);
    };
    const handleKeyPress = (event) => {
      console.log("key");
      if (event.key === 'Enter') {
        console.log("key enter");
        onKeyEnter()
      }
    };
    return (
        <TextField
          label={label}
          fullWidth
          margin="dense"
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          error={error}
          helperText={helperText}
        />
    );
}
TextFieldNumber.propTypes = {
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    label:PropTypes.string,
    error:PropTypes.bool,
    helperText:PropTypes.string,
    onKeyEnter:PropTypes.func,
};

export default TextFieldNumber;