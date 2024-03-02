import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import GoBack from '../../components/goBack';
import { colors } from '../../stylesConfig';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../reducers/category/category';
import TitlePage from '../../components/TitlePage';
import Swal from 'sweetalert2';
function CreateCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t]=useTranslation("global");
    const [category,setCaegory] = useState({
        name:""
    });
    const createCategoryForm = async () =>{
        if(category.name.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createCategory(category))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
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
    const categorySchema = Yup.object().shape({
        name: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            name: category.name ||"",
        },
        validationSchema: categorySchema,
        onSubmit: createCategoryForm
    });
    useEffect(() => {
        formik.setValues({
            name: category.name || "",
        });
        console.log( category.name );
    }, [category]);
    return(
        <>
            <Container>
                <TitlePage 
                    title={t("create-category")}
                />
                <Card>
                    <CardContent>
                        <GoBack />
                        <form
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid                
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={category.name}
                                        fullWidth
                                        label={t("name")}
                                        variant="outlined"
                                        onChange={((e)=>{
                                            setCaegory({
                                                ...category,
                                                name:e.target.value.trim()
                                            })
                                        })}
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
                                        {t("create")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
export default CreateCategory;