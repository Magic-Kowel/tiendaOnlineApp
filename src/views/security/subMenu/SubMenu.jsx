import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getSubMenus,getMenus,createSubMenu,getStatus } from "../../../reducers/security/security";
import TitlePage from "../../../components/TitlePage";
import getIdUser from "../../../tools/getIdUser";
import { useTranslation } from 'react-i18next';
import {
    Paper,
    Grid,
    Button,
    TextField,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "../../../stylesConfig";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import GoBack from "../../../components/goBack";
import DataTable from "../../../components/DataTable/DataTable";
function SubMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subMenuData, setSubmenuData] = useState([]);
    const {status, submenu,menu } = useSelector((state)=>state.security)
    const [selectedStatus,setSelectedStatus] = useState("");
    const [selectedMenu,setSelectedMenu] = useState("");
    const [submenuForm,setSubmenuForm] = useState({
        name:"",
        url:"",
        idUser:"",
        status:"",
        idMenu:""
    });
    const handleGetSubMenu = async () =>{
        await dispatch(getSubMenus())
    }
    const handleGetMenu = async () =>{
        await dispatch(getMenus());
    }
    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const handleCreateSubmenu = async (e) =>{
        e.preventDefault();
        if(
            submenuForm.idMenu,
            submenuForm.status,
            submenuForm.name.trim() === "" ||
            submenuForm.url.trim() === "" ||
            !submenuForm.status
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createSubMenu(submenuForm));
        if(response.payload.created){
            handleGetSubMenu();
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
    const handleUpdateSubmenu = (id) =>{
        navigate(`/security/submenu/edit/${id}`)
    }
    useEffect(()=>{
        handleGetMenu();
        handleGetSubMenu();
        handleGeStatus();
    },[])
    useEffect(()=>{
        setSubmenuForm((prevState) => ({
            ...prevState,
            idUser:getIdUser(),
            status: selectedStatus[0]?.id,
            idMenu:selectedMenu[0]?.id
        }));
    },[selectedMenu,selectedStatus]);
    useEffect(()=>{
        setSubmenuData(submenu);
    },[submenu])
    const [t] = useTranslation("global");
    const listTitles=[t("name"),t("url"),t("status"),t("menu"),t("edit")];
    const listKeys=["name","url","status","nameMenu"];
    const listButtons = [
        {
            tooltipTitle: t("update"),
            onClick: (idSubMenu) => handleUpdateSubmenu(idSubMenu),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>

                <TitlePage
                    title={t("submenu")}
                />
                <Grid container spacing={2} >
                        <Grid item xs={12} md={5}>
                            <GoBack />
                            <Paper
                                sx={{padding:"1rem"}}
                            >
                                <Grid
                                    component="form"
                                    onSubmit={handleCreateSubmenu}
                                    autoComplete="off"
                                    container 
                                    item 
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            data={status}
                                            getData={setSelectedStatus}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("status")}
                                            isForm={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SearchAutoComplete
                                            data={menu}
                                            getData={setSelectedMenu}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("menu")}
                                            isForm={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            value={submenuForm.name}
                                            onChange={(e)=>{
                                                setSubmenuForm({
                                                    ...submenuForm,
                                                    name:e.target.value
                                                })
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label={t("url")}
                                            fullWidth
                                            variant="outlined"
                                            value={submenuForm.url}
                                            onChange={(e)=>{
                                                setSubmenuForm({
                                                    ...submenuForm,
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
                                            {t("create")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <SearchAutoComplete
                                data={submenu}
                                getData={setSubmenuData}
                                getOptionSearch={(item)=>item.name}
                            />
                            <DataTable
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={subMenuData}
                                listButtons={listButtons}
                                id="idSubMenu"
                            />
                        </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SubMenu;