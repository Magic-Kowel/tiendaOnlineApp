import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSize } from '../../reducers/size/size';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    Button
} from '@mui/material';
import GoBack from '../../components/goBack';
import TitlePage from '../../components/TitlePage';
import { useTranslation } from 'react-i18next';
import { colors } from '../../stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { updateSize as updateSizeForm } from '../../reducers/size/size';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
function UpdateSize(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sizes} = useSelector((state)=>state.size);
    const [t]=useTranslation("global");
    const [sizeForm, setSizeForm] = useState({
        idSize:'',
        nameSize:''
    });
    const params = useParams();
    const handleGetSize = async () =>{
        const { id } = params;
        await dispatch(getSize(id));
    }
    const handleUpdateSize = async () =>{
        const response = await dispatch(updateSizeForm(sizeForm));
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
    const sizeSchema = Yup.object().shape({
        nameSize: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            nameSize: sizeForm.nameSize ||"",
        },
        validationSchema: sizeSchema,
        onSubmit: handleUpdateSize
    });
    useEffect(() => {
        formik.setValues({
            nameSize: sizeForm.nameSize || "",
        });
    }, [sizeForm]);
    useEffect(()=>{
        handleGetSize();
    },[])
    useEffect(()=>{
        setSizeForm({
            idSize: params.id,
            nameSize:sizes[0]?.nameSize
        });
    },[sizes])
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-size-clothe")}
                />
                <Card>
                    <CardContent 
                        onSubmit={handleUpdateSize} 
                        autoComplete="off" 
                        component="form"
                    >
                            <GoBack />
                            <Grid                
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={sizeForm.nameSize}
                                        onChange={(e)=>{
                                            setSizeForm((prev)=>({
                                                ...prev,
                                                nameSize:e.target.value
                                            }))
                                        }}
                                        fullWidth
                                        label={t("size-clothe")} 
                                        variant="outlined" 
                                        error={formik.touched.nameSize && Boolean(formik.errors.nameSize)}
                                        helperText={formik.touched.nameSize && formik.errors.nameSize}
                                    />
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={formik.handleSubmit}
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
    );
}
export default UpdateSize;