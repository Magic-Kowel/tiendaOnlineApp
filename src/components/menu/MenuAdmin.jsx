import {useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { NAME_PAGE, MENU_USER ,NAME_USER } from '../../config';
import { getMenuUser } from '../../reducers/user/user';
import { colors } from '../../stylesConfig';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import getIdUser from '../../tools/getIdUser';
import ItemMenuAdmin from './ItemMenuAdmin';
import PropTypes from 'prop-types';
import Footer  from './../Footer';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    flex:1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
import { useNavigate } from "react-router-dom";

export default function MenuAdmin({children}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [t]= useTranslation("global");
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [userData, setUserData] = useState([]);
    useEffect(()=>{
      const user= sessionStorage.getItem(NAME_USER)
      setUserData(user)
    },[])
    useEffect(()=>{
      const resMenu = JSON.parse(sessionStorage.getItem(MENU_USER));
      if(!resMenu){
        const idUser = getIdUser();
        dispatch(getMenuUser(idUser)).then((response)=>{
          console.log(response.payload);
          setMenu(response.payload);
          const encriptMenu = JSON.stringify(response.payload);
          sessionStorage.setItem(MENU_USER,encriptMenu);
        });
      }
      setMenu(resMenu);
    },[]);
    const menuItems = [];
    menu?.forEach(menu => {
      // console.log("Entrada del bucle:", menu);

      const existingMenu = menuItems.find(item => item.id === menu.idMenu);

      if (existingMenu) {
        // El menú ya existe, agregar submenú
        // console.log("Agregando submenú a menú existente:", existingMenu);
        existingMenu.submenus.push({ 
            id: menu.idItemMenu,
            name: menu.itemMenu,
            url: menu.url,
            icon:menu.icon
        });
      } else {
        // Menú nuevo, crear un nuevo objeto de menú
        // console.log("Creando nuevo menú:", menu);
        menuItems.push({
          id: menu.idMenu,
          name: menu.Menu,
          submenus: [{ 
              id: menu.idItemMenu,
              name: menu.itemMenu,
              url: menu.url,
              icon:menu.icon
          }],
        });
      }
    });
    function exitSistem(){
        sessionStorage.clear();
        navigate("/");
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

      return (
        <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <AppBar sx={{backgroundColor:colors.primaryColor}} position="fixed" open={open}>
              <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {NAME_PAGE}
                </Typography>
                <Typography variant="h6" noWrap component="div">
                  {userData}
                </Typography>
              </Toolbar>
          </AppBar>
          <Drawer
              sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
              },
              }}
              variant="persistent"
              anchor="left"
              open={open}
          >
              <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                  <ListItem disablePadding>
                    <ListItemButton
                        onClick={exitSistem}
                    >
                        <ListItemIcon>
                        <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("exit")}/>
                    </ListItemButton>
                  </ListItem>
                  {
                    menuItems?.map((item,index)=>(
                        <ItemMenuAdmin 
                          key={index}
                          item={item}
                        />
                      )
                    )
                  }
                  
              </List>
          </Drawer>
          <Main open={open}>
                <DrawerHeader />
                  <Box
                  component="main"
                    sx={{minHeight: "100vh"}}
                  >
                    {children}
                  </Box>
                <Footer />
          </Main>
        </Box>
      );
}
MenuAdmin.propTypes = {
  children: PropTypes.node, // Propiedad children válida
};