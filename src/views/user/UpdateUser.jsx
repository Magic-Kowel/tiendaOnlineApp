import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Grid,
    Container,
    TextField,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import GoBack from '../../components/goBack';
import { useDispatch,useSelector } from 'react-redux';
import { colors } from '../../stylesConfig';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';

import { validateEmailExist, getUser,updateUser } from '../../reducers/user/user';
function UpdateUser(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const {users} = useSelector((state)=>state.user);
    const params = useParams();
    const { idUser } = params;

    const [isRepitEmail,setIsRepitEmail] = useState(false);
    const [userForm, setUserForm] = useState({
        idUser:idUser,
        nameUser:"",
        lastName:"",
        email:"",
        birthdate:""
    })
    const handleGetUser = async () =>{
        await dispatch(getUser(idUser));
    }
    useEffect(()=>{
        handleGetUser();
    },[])
    useEffect(()=>{
        setUserForm(users[0]);
    },[users])
    const userSchema = Yup.object().shape({
        nameUser: Yup.string().required(t("this-field-is-required")),
        lastName: Yup.string().required(t("this-field-is-required")),
        birthdate: Yup.string().required(t("this-field-is-required")),
        email: Yup.lazy(() => {
            return Yup.string().email(t("please-enter-valid-email")).required(t("this-field-is-required"))
                .test('email',t("email-has-already-been-registered"), function () {
                    return !isRepitEmail
                });
        }),
    });
    const handleUpdateUser = async () =>{
        const response = await dispatch(updateUser(userForm));
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
            nameUser: userForm?.nameUser ||"",
            lastName: userForm?.lastName ||"",
            email: userForm?.email ||"",
            birthdate: userForm?.birthdate ||"",
        },
        validationSchema: userSchema,
        onSubmit: handleUpdateUser
    });
    useEffect(() => {
        formik.setValues({
            nameUser: userForm?.nameUser ||"",
            lastName: userForm?.lastName ||"",
            email: userForm?.email ||"",
            birthdate: userForm?.birthdate ||"",
        });
    }, [userForm]);
    const handleValidateEmail = async () =>{
        if(userForm?.email && idUser){
            const isValidate =  await dispatch(validateEmailExist({
                email:userForm?.email,
                idUser:idUser
            }));
            setIsRepitEmail(isValidate.payload.exists);
        }
    }
    useEffect(()=>{
        handleValidateEmail();
    },[userForm?.email])
    return(
        <Container>
            <TitlePage 
                title={t("edit-user")}
            />
            <GoBack />
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
                        value={userForm?.nameUser}
                        onChange={(e)=>{
                            setUserForm((prev)=>({
                                ...prev,
                                nameUser:e.target.value.trim()
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
                        value={userForm?.lastName}
                        onChange={(e)=>{
                            setUserForm((prev)=>({
                                ...prev,
                                lastName:e.target.value.trim()
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
                        value={userForm?.email}
                        onChange={(e)=>{
                            setUserForm((prev)=>({
                                ...prev,
                                email:e.target.value.trim()
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
                        value={userForm?.birthdate}
                        onChange={(e)=>{
                            setUserForm((prev)=>({
                                ...prev,
                                birthdate:e.target.value.trim()
                            }))
                        }}
                        error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                        helperText={formik.touched.birthdate && formik.errors.birthdate}
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
                            {t("edit")}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default UpdateUser;