import { Drawer,Stack, Box, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
function DrawerForm({children,open,onClose}){
    return(
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{"& .MuiDrawer-paper":{
                height:"100vh", 
                width:'80%',
                transition: "all 0.3 ease-in-out"
                
            }}}
            >
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <IconButton
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            </Stack>
            <Box mt={5} >
                {children}
            </Box>
        </Drawer>
    )
}
DrawerForm.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default DrawerForm