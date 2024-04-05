import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
const NoRecordsFound = ({title}) => {
  const [t] = useTranslation("global");
  return (
    <Box display="flex" justifyContent="center" flexDirection="row" alignItems="center" height="100vh">
      <Typography variant="h4" textAlign="center" color="textSecondary">
        {title ?  title : t("no-records-found")}
      </Typography>
    </Box>
  );
};
NoRecordsFound.propTypes = {
  title:PropTypes.string
};
export default NoRecordsFound;