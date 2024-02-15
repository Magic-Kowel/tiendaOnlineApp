import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { 
    getStatus,
    createMenu,
    getMenus 
} from '../../../reducers/security/security';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import DataTable from '../../../components/DataTable/DataTable';
import EditIcon from '@mui/icons-material/Edit';
import {colors} from "../../../stylesConfig"
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import { useTranslation } from 'react-i18next';
import getIdUser from '../../../tools/getIdUser';
import Swal from 'sweetalert2';
import GoBack from '../../../components/goBack';
import TitlePage from '../../../components/TitlePage';
function Menu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, menu} = useSelector((state)=>state.security);
    const [statusData,setStatusData] = useState([]);
    const [menuData,setMenuData] = useState([]);
    const [menuForm,setMenuForm] = useState({
        name:"",
        idUser:"",
        status:""
    });
    const [t] = useTranslation("global");
    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const handleGetMenu = async () =>{
        await dispatch(getMenus());
    }
    const handleUpdate = (id) =>{
        navigate(`/security/menu/edit/${id}`);
    }
    const handleCreateMenu = async (e) =>{
        e.preventDefault();
        console.log("menuForm",menuForm.status);
        if(
            !menuForm.status||
            menuForm.name.trim() === ""
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createMenu(menuForm));
        if(response.payload.created){
            handleGetMenu();
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
    useEffect(()=>{
        handleGetMenu();
        handleGeStatus();
    },[])
    useEffect(()=>{
        setMenuForm((prevState) => ({
            ...prevState,
            idUser:getIdUser(),
            status: statusData[0]?.id
        }));
    },[statusData]);
    const listTitles = [t("name"),t("status"),t("actions")];
    const listKeys = ["name","status"];
    const listButtons = [
        {
            tooltipTitle: t("update"),
            onClick: (id) => handleUpdate(id),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("menu")}
                />
                <GoBack />
                <Grid container spacing={2} >
                    <Grid item xs={12} md={5}>
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={handleCreateMenu}
                                autoComplete="off"
                            >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            data={status}
                                            getData={setStatusData}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("status")}
                                            isForm={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={menuForm.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setMenuForm({
                                                    ...menuForm,
                                                    name:e.target.value
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
                                            {t("create")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <SearchAutoComplete
                            data={menu}
                            getData={setMenuData}
                            getOptionSearch={(item)=>item.name}
                        />
                        <DataTable
                            listTitles={listTitles}
                            listKeys={listKeys}
                            dataList={menuData}
                            listButtons={listButtons}
                            id="id"
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Menu;