import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getSubMenus,getMenus,createSubMenu,getStatus } from "../../../reducers/security/security";
import TitlePage from "../../../components/TitlePage";
import getIdUser from "../../../tools/getIdUser";
import { useTranslation } from 'react-i18next';
import {
    Paper,
    Grid,
    Button,
    TextField,
    Container,
    useMediaQuery,
    useTheme,
    FormHelperText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "../../../stylesConfig";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import FormAutocomplete from "../../../components/FormAutocomplete";
import GoBack from "../../../components/goBack";
import DataTable from "../../../components/DataTable/DataTable";
import StackTable from "../../../components/DataTable/StackTable";
import MessageOnlyDeveloper from "../../../components/MessageOnlyDeveloper";
function SubMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [t] = useTranslation("global");
    const [subMenuData, setSubmenuData] = useState([]);
    const {status, submenu,menu } = useSelector((state)=>state.security)
    const [submenuForm,setSubmenuForm] = useState({
        name:"",
        url:"",
        idUser:getIdUser(),
        status:"",
        idMenu:""
    });
    const createSubMenuSchema = Yup.object().shape({
        idMenu: Yup.string().required(t("this-field-is-required")),
        name: Yup.string().required(t("this-field-is-required")),
        status: Yup.string().required(t("this-field-is-required")),
        url: Yup.string().required(t("this-field-is-required")),
        idUser: Yup.string().required(t("this-field-is-required")),
    });
    useEffect(()=>{
        formik.setValues({
            url:submenuForm.url || "",
            idMenu:submenuForm.idMenu || '',
            name: submenuForm.name || "",
            idUser: submenuForm.idUser || "",
            status: submenuForm.status || ""
        });
    },[submenuForm])

    const handleGetSubMenu = async () =>{
        await dispatch(getSubMenus())
    }
    const handleGetMenu = async () =>{
        await dispatch(getMenus());
    }
    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const handleCreateSubmenu = async () =>{
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
    const formik = useFormik({
        initialValues: {
            url:submenuForm.url,
            idMenu:submenuForm.idMenu,
            name: submenuForm.name,
            idUser: submenuForm.idUser,
            status: submenuForm.status
        },
        validationSchema: createSubMenuSchema, 
        onSubmit: handleCreateSubmenu,
    });
    const handleUpdateSubmenu = (id) =>{
        navigate(`/security/submenu/edit/${id}`)
    }
    useEffect(()=>{
        handleGetMenu();
        handleGetSubMenu();
        handleGeStatus();
    },[])
    useEffect(()=>{
        setSubmenuData(submenu);
    },[submenu])
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
                                    onSubmit={formik.handleSubmit}
                                    autoComplete="off"
                                    container 
                                    item 
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        <FormAutocomplete
                                            data={status}
                                            getData={(newValue) => 
                                                setSubmenuForm((prevMenu) => 
                                                ({ ...prevMenu,
                                                    status: newValue?.id
                                                })
                                            )}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("status")}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                            helperText={formik.touched.status && formik.errors.status}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormAutocomplete
                                            data={menu}
                                            getData={(newValue) => 
                                                setSubmenuForm((prevMenu) => 
                                                ({ ...prevMenu,
                                                    idMenu: newValue?.id
                                                })
                                            )}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("menu")}
                                            error={formik.touched.idMenu && Boolean(formik.errors.idMenu)}
                                            helperText={formik.touched.idMenu && formik.errors.idMenu}
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
                                            inputProps={{ maxLength: 30 }}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                        <FormHelperText>{submenuForm.name.length}/30</FormHelperText>

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
                                            inputProps={{ maxLength: 30 }}
                                            error={formik.touched.url && Boolean(formik.errors.url)}
                                            helperText={formik.touched.url && formik.errors.url}
                                        />
                                        <FormHelperText>{submenuForm.url.length}/50</FormHelperText>

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
                                    <Grid item xs={12}>
                                        <MessageOnlyDeveloper />
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
                            {!isMobile?(
                                <DataTable
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={subMenuData}
                                    listButtons={listButtons}
                                    id="idSubMenu"
                                />
                            ):(
                                <StackTable 
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={subMenuData}
                                    listButtons={listButtons}
                                    id="idSubMenu"
                                />
                            )}
                        </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SubMenu;