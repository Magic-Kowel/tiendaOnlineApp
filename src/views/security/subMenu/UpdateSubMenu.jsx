import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import FormAutocomplete from '../../../components/FormAutocomplete';
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
    const [selectStatu,setSelectStatu] = useState([]);
    const [selectMenu,setSelectMenu] = useState([]);
    const [submenu,setSubmenu] = useState({
        idSubMenu:id,
        name:"",
        status:"",
        idMenu:"",
        url:"",
        icon:""
    });
    const createSubMenuSchema = Yup.object().shape({
        idMenu: Yup.string().required(t("this-field-is-required")),
        name: Yup.string().required(t("this-field-is-required")),
        status: Yup.string().required(t("this-field-is-required")),
        url: Yup.string().required(t("this-field-is-required")),
        idSubMenu: Yup.string().required(t("this-field-is-required")),
    });
    useEffect(()=>{
        formik.setValues({
            url:submenu.url || "",
            idMenu:submenu.idMenu || '',
            name: submenu.name || "",
            idSubMenu: submenu.idSubMenu || "",
            status: submenu.status || ""
        });
        console.log(submenu);
    },[submenu])
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
    const handleUpdateSubmenu = async () =>{
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
    const formik = useFormik({
        initialValues: {
            url:submenu.url,
            idMenu:submenu.idMenu,
            name: submenu.name,
            idUser: submenu.idUser,
            status: submenu.status
        },
        validationSchema: createSubMenuSchema, 
        onSubmit: handleUpdateSubmenu,
    });
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
                            onSubmit={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <Grid container spacing={2} >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <FormAutocomplete
                                            valueDefault={selectStatu ||null}
                                            data={menuData}
                                            getData={(newValue) => 
                                                setSubmenu((prevMenu) => 
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
                                            valueDefault={selectMenu || null}
                                            data={menuData}
                                            getData={(newValue) => 
                                                setSubmenu((prevMenu) => 
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
                                        <Paper sx={{ display: 'flex',justifyContent:"center", alignItems:"center"}}>
                                            <TextField
                                                value={submenu.icon}
                                                label={t("icon")}
                                                fullWidth
                                                variant="outlined"
                                                onChange={(e)=>{
                                                    setSubmenu({
                                                        ...submenu,
                                                        icon:e.target.value
                                                    })
                                                }}
                                            />
                                            <i 
                                                className={submenu.icon}
                                                style={{ marginRight:"1rem", marginLeft:"1rem", fontSize:"2rem", marginY: 0.5 }}
                                            ></i>
                                        </Paper>
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
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
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
                                            error={formik.touched.url && Boolean(formik.errors.url)}
                                            helperText={formik.touched.url && formik.errors.url}
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