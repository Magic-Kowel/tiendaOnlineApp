import { useState,useEffect } from 'react';
import {
    Grid,
    Container,
    TextField,
    Button,
    CardContent,
    Card
} from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { colors } from '../../stylesConfig';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
import { createUserAdmind } from '../../reducers/user/user';
import { validateEmail } from '../../reducers/user/user';
function CrearUser(){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const [isRepitEmail,setIsRepitEmail] = useState(false);
    const [userForm, setUserForm] = useState({
        nameUser:"",
        lastName:"",
        email:"",
        birthDate:""
    })
    const userSchema = Yup.object().shape({
        nameUser: Yup.string().required(t("this-field-is-required")),
        lastName: Yup.string().required(t("this-field-is-required")),
        birthDate: Yup.date().required(t("this-field-is-required")),
        email: Yup.lazy(() => {
            return Yup.string().email(t("please-enter-valid-email")).required(t("this-field-is-required"))
                .test('email',t("email-has-already-been-registered"), function () {
                    return !isRepitEmail
                });
        }),
    });
    const handleCreateUser = async () =>{
        const response = await dispatch(createUserAdmind(userForm))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            formik.resetForm();
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const formik = useFormik({
        initialValues: {
            nameUser: userForm.nameUser ||"",
            lastName: userForm.lastName ||"",
            email: userForm.email ||"",
            birthDate: userForm.birthDate ||"",
        },
        validationSchema: userSchema,
        onSubmit: handleCreateUser
    });
    useEffect(() => {
        formik.setValues({
            nameUser: userForm.nameUser ||"",
            lastName: userForm.lastName ||"",
            email: userForm.email ||"",
            birthDate: userForm.birthDate ||"",
        });
    }, [userForm]);
    const handleValidateEmail = async () =>{
        const isValidate =  await dispatch(validateEmail(userForm.email));
        setIsRepitEmail(isValidate.payload.exists)
    }
    useEffect(()=>{
        handleValidateEmail();
    },[userForm.email])
    return(
        <Container>
            <TitlePage 
                title={t("create-user")}
            />

            <Card >
                <CardContent>
                        <Grid 
                            container 
                            spacing={2}
                            component="form"
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label={t("name")}
                                    value={userForm.nameUser}
                                    onChange={(e)=>{
                                        setUserForm((prev)=>({
                                            ...prev,
                                            nameUser:e.target.value
                                        }))
                                    }}
                                    error={formik.touched.nameUser && Boolean(formik.errors.nameUser)}
                                    helperText={formik.touched.nameUser && formik.errors.nameUser}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label={t("last-name")}
                                    value={userForm.lastName}
                                    onChange={(e)=>{
                                        setUserForm((prev)=>({
                                            ...prev,
                                            lastName:e.target.value
                                        }))
                                    }}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label={t("email")}
                                    value={userForm.email}
                                    onChange={(e)=>{
                                        setUserForm((prev)=>({
                                            ...prev,
                                            email:e.target.value
                                        }))
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: '1rem', verticalAlign: 'top' } // Ajusta el tamaño de la fuente y la alineación vertical
                                    }}
                                    InputProps={{
                                        style: { marginTop: '0.1rem' } // Agrega un margen superior
                                    }}
                                    type="date"
                                    fullWidth
                                    label={t("birth-date")}
                                    value={userForm.birthDate}
                                    onChange={(e)=>{
                                        setUserForm((prev)=>({
                                            ...prev,
                                            birthDate:e.target.value
                                        }))
                                    }}
                                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
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
                </CardContent>
            </Card>
        </Container>
    )
}
export default CrearUser