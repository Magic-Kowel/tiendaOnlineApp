import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
function UserMenuHeader({userData}){
    const navigate = useNavigate();
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [t]= useTranslation("global");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function exitSistem(){
        console.log("exit");
        sessionStorage.clear();
        navigate("/");
    }
    return(
        <>
            <Box>
                {
                    onlySmallScreen  ? (
                        <Typography
                            onClick={handleClick}
                            variant="h6" 
                            noWrap 
                            component="div" 
                            style={{ display: 'flex', alignItems: 'center' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            {userData}
                            <AccountCircleIcon sx={{fontSize:32}} />
                        </Typography>
                    ):( 
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AccountCircleIcon sx={{fontSize:32, color:"#fff"}} />
                        </IconButton>
                    )
                }
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={exitSistem}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon fontSize="small" />
                    </ListItemIcon>
                    {t("exit")} 
                </MenuItem>
            </Menu>
        </>
    )
}
UserMenuHeader.propTypes = {
    userData: PropTypes.array.isRequired,
};
export default UserMenuHeader