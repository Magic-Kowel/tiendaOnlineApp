import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
function ItemMenuAdmin({item}){
    return(
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary={item?.Menu}/>
            </ListItemButton>
        </ListItem>
    );
}
export default ItemMenuAdmin;