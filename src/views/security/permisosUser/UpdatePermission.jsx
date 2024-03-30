import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import { getPermissionTypeUser } from '../../../reducers/security/security';
import TitlePage from '../../../components/TitlePage';
import FormAutocomplete from '../../../components/FormAutocomplete';
import {
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../../../stylesConfig';
import { getSubMenusActive,updatePermissionTypeUser } from '../../../reducers/security/security';
import Swal from 'sweetalert2';
import GoBack from '../../../components/goBack';
function UpdatePermission(){
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const {permissions,submenu} = useSelector((state)=>state.security);
    const {idTypeUserPermission} = useParams();
    const [permissionForm,setPermissionForm]=useState({
        idTypeUserPermission:idTypeUserPermission,
        idUserPermissions:"",
        idSubmenu:"",
    });
    const [submenuDysplay,setSubmenuDysplay]=useState(null);
    const dispatch = useDispatch();
    const handleGetSubmenus = async () =>{
        await dispatch(getSubMenusActive());
    }
    useEffect(()=>{
        handleGetSubmenus();
    },[]);
    useEffect(()=>{
        setSubmenuDysplay(submenu.find((item)=>item.id === permissions[0]?.idSubmenu));
    },[submenu,permissions]);
    useEffect(()=>{
        dispatch(getPermissionTypeUser(idTypeUserPermission));
    },[])
    useEffect(()=>{
        if(submenuDysplay?.id){
            setPermissionForm((prev)=>({
                ...prev,
                idSubmenu:submenuDysplay.id
            }))
        }
    },[submenuDysplay])
    const handleUpdate = async () =>{
        const response = await dispatch(updatePermissionTypeUser(permissionForm));
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
    const createPermissionSchema = Yup.object().shape({
        idSubmenu: Yup.string().required(t("this-field-is-required")),
        idTypeUserPermission: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            idSubmenu: permissionForm.idSubmenu || "",
            idTypeUserPermission:permissionForm.idTypeUserPermission || ""
        },
        validationSchema: createPermissionSchema, 
        onSubmit: handleUpdate,
    });
    useEffect(()=>{
        formik.setValues({
            idSubmenu:permissionForm.idSubmenu || "",
            idTypeUserPermission:permissionForm.idTypeUserPermission || ""
        });
    },[permissionForm,submenuDysplay])
    return(
        <>
            <Container>
                <TitlePage
                    title={t("update-permission")}
                />
                <GoBack />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Card
                        component="form"
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                    >
                        <CardContent>
                                <Grid
                                    container 
                                    spacing={2}
                                >   
                                    <Grid item xs={12}>
                                        <FormAutocomplete
                                            valueDefault={submenuDysplay}
                                            data={submenu}
                                            getData={(newValue) => 
                                                setPermissionForm((prevMenu) => 
                                                ({ ...prevMenu,
                                                    idSubmenu: newValue?.id
                                                })
                                            )}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("submenu")}
                                            error={formik.touched.idSubmenu && Boolean(formik.errors.idSubmenu)}
                                            helperText={formik.touched.idSubmenu && formik.errors.idSubmenu}
                                        />
                                    </Grid>
                                </Grid>
                        </CardContent>
                        <CardActions>
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
                        </CardActions>
                    </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default UpdatePermission;