import { colors } from "../../stylesConfig";
import { sizeTitleForm } from "../../stylesConfig";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    TextField
} from '@mui/material';
import { createMaterial,getMaterials } from "../../reducers/material/material";
function FormMaterial(){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const [material,setMaterial] = useState({
        nameMaterial:""
    });
    const handleCreate = async ()  =>{
        const response = await dispatch(createMaterial(material))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            await dispatch(getMaterials());
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const createMaterialSchema = Yup.object().shape({
        nameMaterial: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            nameMaterial: material.nameMaterial
        },
        validationSchema: createMaterialSchema, 
        onSubmit: handleCreate,
    });
    useEffect(()=>{
        formik.setValues({
            nameMaterial:material?.nameMaterial || ""
        });
    },[material])
    return(
        <>
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
                            {t("create-material")}
                        </Typography>
                        <Grid
                            container 
                            spacing={2}
                        >   
                            <Grid item xs={12}>
                                <TextField
                                    value={material.nameMaterial}
                                    onChange={(e) => {
                                        setMaterial((prevMaterial) => ({
                                            ...prevMaterial,
                                            nameMaterial: e.target.value
                                        }));
                                    }}
                                    error={formik.touched.nameMaterial && Boolean(formik.errors.nameMaterial)}
                                    helperText={formik.touched.nameMaterial && formik.errors.nameMaterial}
                                    fullWidth
                                    label={t('material')}
                                    variant="outlined"
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
        </>
    )
}
export default FormMaterial;