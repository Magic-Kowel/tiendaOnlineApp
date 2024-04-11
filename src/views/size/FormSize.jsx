import { useState,useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import {
    getSizes,
    createSize
} from "../../reducers/size/size";
import { useTranslation } from 'react-i18next';
import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    FormHelperText
} from '@mui/material';
import { colors,sizeTitleForm } from "../../stylesConfig";
function FormSize (){
    const [t] = useTranslation("global");
    const [sizeForm, setSizeForm] = useState({nameSize:''});
    const dispatch = useDispatch();
    const handleCreateSize = async () =>{
        const response = await dispatch(createSize(sizeForm))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            dispatch(getSizes());
            setSizeForm({nameSize:""})
            formik.resetForm();
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const sizeSchema = Yup.object().shape({
        nameSize: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            nameSize: sizeForm.nameSize ||"",
        },
        validationSchema: sizeSchema,
        onSubmit: handleCreateSize
    });
    useEffect(() => {
        formik.setValues({
            nameSize: sizeForm.nameSize || "",
        });
    }, [sizeForm]);
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
                        {t("create-size-clothes")}
                    </Typography>
                    <Grid
                        container 
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <TextField
                                value={sizeForm.nameSize}
                                onChange={(e) => {
                                    setSizeForm((prevSizeForm) => ({
                                        ...prevSizeForm,
                                        nameSize: e.target.value,
                                    }));
                                }}
                                inputProps={{ maxLength: 30 }}
                                fullWidth
                                label={t("size-clothe")} 
                                variant="outlined" 
                                error={formik.touched.nameSize && Boolean(formik.errors.nameSize)}
                                helperText={formik.touched.nameSize && formik.errors.nameSize}
                            />
                            <FormHelperText>{sizeForm.nameSize.length}/30</FormHelperText>
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
export default FormSize;