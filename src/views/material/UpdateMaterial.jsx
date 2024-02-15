import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterial, updateMaterial } from '../../reducers/material/material';
import { colors } from "../../stylesConfig";
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Container
} from '@mui/material';
import TitlePage from '../../components/TitlePage';
import GoBack from '../../components/goBack';
import Swal from 'sweetalert2';
function UpdateMaterial(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {materials} = useSelector((state)=>state.material);
    const [t] = useTranslation("global");
    const params = useParams();
    const [material,setMaterial] = useState({
        nameMaterial:""
    })
    const { idMaterial } = params;
    const materialSchema = Yup.object().shape({
        nameMaterial: Yup.string().required(t("this-field-is-required"))
    });
    const handleUpdate = async () =>{
        const response = await dispatch(updateMaterial(material));
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
            nameMaterial: material?.nameMaterial || ''
        },
        validationSchema: materialSchema, 
        onSubmit: handleUpdate,
    });
    useEffect(()=>{
        formik.setValues({
            nameMaterial:material?.nameMaterial || ""
        });
    },[material]);
    const handleGetMaterial = async () =>{
        await dispatch(getMaterial(idMaterial));
    }
    useEffect(()=>{
        setMaterial(materials[0]);
    },[materials]);
    useEffect(()=>{
        handleGetMaterial();
    },[]);
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-material")}
                />
                <Card
                    component="form"
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <CardContent>
                            <GoBack />
                            <Grid
                                container 
                                spacing={2}
                                mt={2}
                            >   
                                <Grid item xs={12}>
                                    <TextField
                                        value={material?.nameMaterial || ""}
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
                                {t("edit")}
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
}
export default UpdateMaterial;