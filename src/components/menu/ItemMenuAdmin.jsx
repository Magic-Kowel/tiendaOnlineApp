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
import '@fortawesome/fontawesome-free/css/all.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
function ItemMenuAdmin({ item }) {
    const navigate = useNavigate();
    const handleNavigateMenu = (url) =>{
        navigate(`/${url}`)
    }
    return (
        <ListItem disablePadding key={item?.name}>
            <Accordion style={{ width: '100%' }}>
                <AccordionSummary
                    style={{ width: '100%' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                >
                    {item?.name}
                </AccordionSummary>
                <AccordionDetails sx={{ width: '100%' }}>
                    {item?.submenus?.map((submenu) => (
                        <ListItemButton onClick={()=>handleNavigateMenu(submenu.url)} 
                        key={submenu.name}>
                            <ListItemIcon>
                                <i className={submenu.icon}></i>
                            </ListItemIcon>
                            <ListItemText primary={submenu.name} />
                        </ListItemButton>
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
                name: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
};

export default ItemMenuAdmin;