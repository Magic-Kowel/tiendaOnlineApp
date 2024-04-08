import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
function TextFieldNumber({
  label,
  value,
  onChange,
  error,
  helperText,
  onKeyEnter,
  limit
}){
    const handleInputChange = (event) => {
      if (!limit || event.target.value.length <= limit) {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        onChange(inputValue);
      }
    };
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
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
    limit:PropTypes.number,
};

export default TextFieldNumber;