import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStatus, getSubMenu, updateSubMenu,getMenus } from '../../../reducers/security/security';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import TitlePage from '../../../components/TitlePage';
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import GoBack from '../../../components/goBack';
import {colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
function UpdateSubMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [t] = useTranslation("global");
    const [statusData,setStatusData] = useState([]);
    const [menuData,setMenuData] = useState([]);
    const [submenu,setSubmenu] = useState({
        idSubMenu:id,
        name:"",
        status:"",
        idMenu:"",
        url:""
    });
    const [selectStatu,setSelectStatu] = useState([]);
    const [selectMenu,setSelectMenu] = useState([]);
    const handleGeStatus = async () => {
        const response = await dispatch(getStatus());
        setStatusData(response.payload);
    }
    const handleGetSubmenu = async () =>{
        const response = await dispatch(getSubMenu(id));
        setSubmenu(response.payload[0]);
    }
    const handleGetMenu = async () =>{
        const response = await dispatch(getMenus());
        setMenuData(response.payload);
    }
    const handleUpdateSubmenu = async (e) =>{
        e.preventDefault();
        if(
            selectMenu.id,
            selectStatu.id,
            submenu.name.trim()==="" ||
            submenu.url.trim()==="" ||
            !submenu.status
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateSubMenu(submenu));
        console.log(response);
        if(response.payload.updated){
            Swal.fire({
                title:t("successfully-updated"),
                icon:'success',
                timer: 1500
            });
            navigate(-1);
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    useEffect(() => {
        if (statusData.length > 0 && submenu) {
            setSelectStatu(statusData.find((item) => item?.id === submenu.status));
        }
    }, [statusData,submenu]);
    useEffect(() => {
        if (menuData.length > 0 && submenu) {
            setSelectMenu(menuData.find((item) => item?.id === submenu.idMenu));
        }
    }, [menuData,submenu]);
    useEffect(()=>{
        handleGetSubmenu().then(()=>{
            handleGeStatus();
            handleGetMenu();
        });
    },[])
    return(
        <Container>
                <TitlePage 
                    title={t("edit-submenu")}
                />
                <GoBack />
                
                    <Paper
                        sx={{padding:"1rem"}}
                    >
                        <form
                            onSubmit={handleUpdateSubmenu}
                            autoComplete="off"
                        >
                            <Grid container spacing={2} >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            valueDefault={selectStatu?selectStatu:null}
                                            itemKey="status"
                                            itemKeyForId="id"
                                            data={statusData}
                                            getData={setSubmenu}
                                            getOptionSearch={(item)=>item?.name || ""}
                                            title={t("status")}
                                            isForm={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            valueDefault={selectMenu}
                                            itemKey="idMenu"
                                            itemKeyForId="id"
                                            isForm={true}
                                            data={menuData}
                                            getData={setSubmenu}
                                            getOptionSearch={(item)=>item?.name || ""}
                                            title={t("menu")}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={submenu.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setSubmenu({
                                                    ...submenu,
                                                    name:e.target.value
                                                })
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={submenu.url}
                                            label={t("url")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setSubmenu({
                                                    ...submenu,
                                                    url:e.target.value
                                                })
                                            }}
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
                                            {t("edit")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

            </Container>
    )
}
export default UpdateSubMenu;