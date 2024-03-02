import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import TitlePage from '../../components/TitlePage';
import GoBack from '../../components/goBack';
import { colors } from '../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getSubcategory, updateSubcategory } from '../../reducers/subCategory/subCategory';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useFormik } from 'formik';
function UpdateSubcategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [t]=useTranslation("global");
    const [subcategory,setSubcategory]= useState({
        id:"",
        name:""
    });
    const handleGetCategory = async () =>{
        const response = await dispatch(getSubcategory(params.idSubcategory));
        setSubcategory({
            id:response.payload[0].id,
            name:response.payload[0].name
        })
    }
    const handleUpdateSubcategory = async () =>{
        if(subcategory.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateSubcategory(subcategory));
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
    const subcategorySchema = Yup.object().shape({
        name: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            name: subcategory.name ||"",
        },
        validationSchema: subcategorySchema,
        onSubmit: handleUpdateSubcategory
    });
    useEffect(() => {
        formik.setValues({
            name: subcategory.name || "",
        });
    }, [subcategory]);
    useEffect(()=>{
        handleGetCategory();
    },[])
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-subcategory")}
                />
                <Card>
                    <CardContent>
                        <GoBack />
                            <Grid
                                component="form"
                                autoComplete="off"
                                onSubmit={formik.handleSubmit} 
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={subcategory.name}
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={(e)=>{
                                            setSubcategory({
                                                ...subcategory,
                                                name:e.target.value
                                            })
                                        }}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} mt={2}>
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
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
export default UpdateSubcategory;