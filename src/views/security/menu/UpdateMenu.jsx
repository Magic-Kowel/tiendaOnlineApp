import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getStatus, getMenu, updateMenu } from '../../../reducers/security/security';
import { useParams, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import TitlePage from '../../../components/TitlePage';
import GoBack from '../../../components/goBack';
import {colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
import FormAutocomplete from '../../../components/FormAutocomplete';
import MessageOnlyDeveloper from '../../../components/MessageOnlyDeveloper';
function UpdateMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [t] = useTranslation("global");
    const {status} = useSelector((state)=>state.security)
    const [statusData,setStatusData] = useState([]);
    const [menuData,setMenuData] = useState({
        idMenu:"",
        name:"",
        status:""
    });
    const [selectStatu,setSelectStatu] = useState([]);
    const createMenuSchema = Yup.object().shape({
        idMenu: Yup.string().required(t("this-field-is-required")),
        name: Yup.string().required(t("this-field-is-required")),
        status: Yup.string().required(t("this-field-is-required")),
    });
    useEffect(()=>{
        formik.setValues({
            name:menuData?.name || "",
            idMenu:menuData?.idMenu || "",
            status:menuData?.status || ""
        });
    },[menuData])
    useEffect(()=>{
        setStatusData(status);
    },[status])
    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const handleGeMenu = async () => {
        const menu = await dispatch(getMenu(id));
        console.log(menu.payload);
        setMenuData(menu.payload[0]);
    }
    const handleUpdateMenu = async () =>{
        const response = await dispatch(updateMenu(menuData));
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
            name: menuData.name,
            status: menuData.status,
            idMenu: menuData.idMenu
        },
        validationSchema: createMenuSchema, 
        onSubmit: handleUpdateMenu,
    });
    useEffect(()=>{
        handleGeStatus();
        handleGeMenu();
    },[])
 
    useEffect(() => {
        if (statusData.length > 0 && menuData) {
            setSelectStatu(statusData.find((item) => item?.id === menuData?.status));
        }
        console.log("menuData",menuData);
    }, [statusData,menuData]);
 
    return(
        <>
            <Container>
                <TitlePage 
                    title={t("edit-menu")}
                />
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <GoBack />
                                        <FormAutocomplete
                                            valueDefault={selectStatu?selectStatu:null}
                                            data={statusData}
                                            getData={(newValue) => 
                                                setMenuData((prevMenu) => 
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
                                        <TextField
                                            value={menuData.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setMenuData({
                                                    ...menuData,
                                                    name:e.target.value
                                                })
                                            }}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
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
                                    <Grid item xs={12}>
                                        <MessageOnlyDeveloper />
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
export default UpdateMenu;