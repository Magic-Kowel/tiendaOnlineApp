
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
function TabPanel({ children, value, index }){
    return(
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
} 
TabPanel.propTypes = {
    value:PropTypes.number.isRequired,
    index:PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
};
export default TabPanel;
