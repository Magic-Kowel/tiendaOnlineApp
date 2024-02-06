import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PropTypes from 'prop-types';
function ItemMenuAdmin({item}){
    return(
        <ListItem disablePadding>
            <Accordion style={{ width: '100%' }}>
                <AccordionSummary
                style={{ width: '100%' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                {item?.name}
                </AccordionSummary>
                <AccordionDetails style={{ width: '100%' }}>
                    {item?.submenus?.map((submenu)=>(
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                <PowerSettingsNewIcon />
                                </ListItemIcon>
                                <ListItemText primary={submenu?.name}/>
                            </ListItemButton>
                        </>
                    ))}
                </AccordionDetails>
            </Accordion>

            
        </ListItem>
    );
}
ItemMenuAdmin.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      submenus: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
  };
export default ItemMenuAdmin;