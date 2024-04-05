import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
const TextLimit = ({ text, maxLength }) => {
  // Trunca el texto si excede la longitud máxima y agrega puntos suspensivos al final
  const textoTruncado = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {textoTruncado}
    </Typography>
  );
}
TextLimit.propTypes = {
    text: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired,
};
export default TextLimit;