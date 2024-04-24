import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Grid,
    Container,
    TextField,
    Button,
    CardContent,
    Card,
    FormControlLabel
} from '@mui/material';
import Swal from 'sweetalert2';
import GoBack from '../../components/goBack';
import { useDispatch,useSelector } from 'react-redux';
import { colors } from '../../stylesConfig';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import FormAutocomplete from '../../components/FormAutocomplete';
import TitlePage from '../../components/TitlePage';
import { getTypeUsers } from '../../reducers/typeUser/typeUser';
import { validateEmailExist, getUser,updateUser } from '../../reducers/user/user';
import SwitchTematic from './../../components/SwitchTematic';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function UpdateUser(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const {users} = useSelector((state)=>state.user);
    const {typeUsers} = useSelector((state)=>state.typeUser);
    const params = useParams();
    const { idUser } = params;

    const [isRepitEmail,setIsRepitEmail] = useState(false);
    const [selectTypeUser,setselectTypeUser] = useState([]);
    const [isCheckedStatus, setIsCheckedStatus] = useState(false);
    const [userForm, setUserForm] = useState({
        idUser:idUser,
        nameUser:"",
        lastName:"",
        email:"",
        birthdate:"",
        typeUser:"",
        idTypeUser:"",
        status:"",
        statusCheck:false
    })
    const handleGetUser = async () =>{
        await dispatch(getUser(idUser));
    }
    useEffect(()=>{
        handleGetUser();
        dispatch(getTypeUsers())
    },[])
    useEffect(()=>{
        setUserForm(users[0]);
        setIsCheckedStatus(users[0]?.status !== "Eliminado")
        setUserForm((prev)=>({
            ...prev,
            statusCheck:users[0]?.status !== "Eliminado"
        }))
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
            typeUser: userForm?.idTypeUser || ""
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
            typeUser: userForm?.idTypeUser || ""
        });
    }, [userForm,selectTypeUser]);
    const handleValidateEmail = async () =>{
        if(userForm?.email && idUser){
            const isValidate =  await dispatch(validateEmailExist({
                email:userForm?.email,
                idUser:idUser
            }));
            setIsRepitEmail(isValidate.payload.exists);
        }
    }
    const handleCheckActive = (event) =>{
        setIsCheckedStatus(event.target.checked)
        setUserForm((prev)=>({
            ...prev,
            statusCheck:event.target.checked
        }))
    }
    useEffect(()=>{
        handleValidateEmail();
    },[userForm?.email])
    useEffect(() => {
        if (typeUsers.length > 0 && userForm) {
            setselectTypeUser(typeUsers.find((item) => item.idTypeUser === userForm?.idTypeUser));
        }
    }, [userForm,typeUsers]);
    return(
        <Container>
            <TitlePage 
                title={t("edit-user")}
            />
            <Card>
                <CardContent>
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
                             <FormAutocomplete
                                valueDefault={selectTypeUser || null}
                                data={typeUsers}
                                getData={(newValue) => 
                                    setUserForm((prevMenu) => 
                                    ({ ...prevMenu,
                                        idTypeUser: newValue?.idTypeUser
                                    })
                                )}
                                getOptionSearch={(item)=>item.typeUser}
                                title={t("menu")}
                                error={formik.touched.idMenu && Boolean(formik.errors.idMenu)}
                                helperText={formik.touched.idMenu && formik.errors.idMenu}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControlLabel control={
                                <SwitchTematic
                                    checked={isCheckedStatus}
                                    onChange={handleCheckActive}
                                    icon={<NoAccountsIcon sx={{ fontSize: 32 }} />}
                                    checkedIcon={<AccountCircleIcon sx={{ fontSize: 32 }} />}
                                    colorRielCheck={colors.primaryColor}
                                />
                            } 
                            label={isCheckedStatus?t("active"):t("removed")} 
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
                </CardContent>
            </Card>
        </Container>
    )
}
export default UpdateUser;