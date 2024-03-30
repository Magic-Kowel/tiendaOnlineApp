import { useState,useEffect } from 'react';
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';
import { colors,sizeTitleForm } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch,useSelector } from 'react-redux';
import {
    getUserTypePermissions,
    getSubMenus,
    createPermissionsUser,
    getAccessControl
} from '../../../reducers/security/security';
import FormAutocomplete from '../../../components/FormAutocomplete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
function FormPermission(){
    const [t] = useTranslation("global");
    const [permissionForm,setPermissionForm]=useState({
        idUserPermissions:"",
        idSubmenu:"",
    });
    const [permission,setPermission]=useState(null);
    const {submenu,userPermissions} = useSelector((state)=>state.security);
    const dispatch = useDispatch();
    const handleGetData = async () =>{
        dispatch(getUserTypePermissions());
    }
    useEffect(()=>{
        dispatch(getSubMenus());
        handleGetData();
    },[]);
    useEffect(()=>{
        setPermission(userPermissions.find((item) => item.id===permissionForm.idUserPermissions))
    },[permissionForm,userPermissions]);
    const handleCreate = async () =>{
        const response = await dispatch(createPermissionsUser(permissionForm))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            handleGetData();
            dispatch(getAccessControl());
            formik.resetForm();
            setPermission(null)
            setPermissionForm((prev)=>({
                ...prev,
                idUserPermissions:null
            }));
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const createPermissionSchema = Yup.object().shape({
        idSubmenu: Yup.string().required(t("this-field-is-required")),
        idUserPermissions: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            idSubmenu: permissionForm.idSubmenu || "",
            idUserPermissions:permissionForm.idUserPermissions || ""
        },
        validationSchema: createPermissionSchema, 
        onSubmit: handleCreate,
    });
    useEffect(()=>{
        formik.setValues({
            idSubmenu:permissionForm.idSubmenu || "",
            idUserPermissions:permissionForm.idUserPermissions || ""
        });
    },[permissionForm])
    return(
        <Card
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <CardContent>
                        <Typography
                            sx={{
                                fontSize:sizeTitleForm,
                            }}
                            textAlign="center"
                            variant="h2"
                            gutterBottom
                        >
                            {t("create")}
                        </Typography>
                        <Grid
                            container 
                            spacing={2}
                        >   
                            <Grid item xs={12}>
                                <FormAutocomplete
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
                            <Grid item xs={12}>
                                <FormAutocomplete
                                    valueDefault={permission}
                                    data={userPermissions}
                                    getData={(newValue) => 
                                        setPermissionForm((prevMenu) => 
                                        ({ ...prevMenu,
                                            idUserPermissions: newValue?.id
                                        })
                                    )}
                                    getOptionSearch={(item)=>item.name}
                                    title={t("permission")}
                                    error={formik.touched.idUserPermissions && Boolean(formik.errors.idUserPermissions)}
                                    helperText={formik.touched.idUserPermissions && formik.errors.idUserPermissions}
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
                            {t("create")}
                    </Button>
                </CardActions>
            </Card>
    )
}
FormPermission.propTypes = {
    idTypeUser: PropTypes.string.isRequired,
};
export default FormPermission;