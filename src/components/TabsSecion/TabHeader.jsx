import {
    Tabs,
    Tab
} from '@mui/material';
import PropTypes from 'prop-types';
function TabHeader({
    value,
    handleChange,
    listTitles
}){
    return (
        <Tabs value={value} onChange={handleChange} centered>
          {listTitles.map((title, index) => (
            <Tab key={index} label={title} />
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