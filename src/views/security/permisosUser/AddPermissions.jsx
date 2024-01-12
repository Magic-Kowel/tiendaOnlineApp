import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { getMenusActive, getSubMenusActive, createViewUser } from '../../../reducers/security/security';
import {
    Container,
    Grid,
    Paper,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import { colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import GoBack from '../../../components/goBack';
function AddPermissions(){
    const dispatch = useDispatch();
    const {idUser} = useParams();
    const [t] = useTranslation("global");
    const {menu, submenu} = useSelector((state)=>state.security);
    const [menuData, setMenuData] = useState([]);
    const [submenuData, setSubmenuData] = useState([]);
    const [userView, setUserView] = useState({
        idMenu:"",
        idSubmenu:"",
        idUser:""
    });
    const handleCreate = async (e) =>{
        e.preventDefault();
        const response = await dispatch(createViewUser(userView));
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const handleGetMenus = async () =>{
        await dispatch(getMenusActive());
    }
    const handleGetSubmenus = async () =>{
        await dispatch(getSubMenusActive());
    }
    useEffect(()=>{
        handleGetMenus();
        handleGetSubmenus();
    },[])
    useEffect(()=>{
        setUserView({
            idMenu:menuData[0]?.id,
            idSubmenu:submenuData[0]?.id,
            idUser:idUser
        });
    },[menuData,submenuData])
    return(
        <>
            <Container>
           
                <GoBack />
                <Grid container spacing={2} >
                    <Grid item xs={12} md={5} direction="column">
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={handleCreate}
                                autoComplete="off"
                            >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            data={menu}
                                            getData={setMenuData}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("menu")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            data={submenu}
                                            getData={setSubmenuData}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("submenu")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                backgroundColor:colors.primaryColor,
                                                '&:hover':{
                                                    backgroundColor:colors.primaryColor
                                                }
                                            }}
                                        >
                                            {t("create")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default AddPermissions;