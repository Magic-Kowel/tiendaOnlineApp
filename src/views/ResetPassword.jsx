import { useState,useEffect } from 'react';
import Footer  from './../components/Footer';
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextFieldPassword from '../components/TextFieldPassword';
import { useTranslation } from "react-i18next";
import { colors } from '../stylesConfig';
import { useDispatch } from 'react-redux';
import { resetPasswort } from '../reducers/user/user';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
function ResetPassword(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t]= useTranslation("global");
    const params = useParams();
    const { idUser } = params;
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const passSchema = Yup.object().shape({
        password: Yup.string().min(6,t("min-characters")).required(t("this-field-is-required")),
        password2: Yup.string().min(6,t("min-characters")).required(t("this-field-is-required")),
    });
    const handleResetPassword = async () =>{
        const response = await dispatch(resetPasswort({
            idUser:idUser,
            password:password,
            password2:password2
        }))
        if(response.payload.updated){
            Swal.fire({
                title:t("successfully-updated"),
                icon:'success',
                timer: 1500
            });
            navigate("/signin");
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const formik = useFormik({
        initialValues: {
            password: password ||"",
            password2: password2 ||"",
        },
        validationSchema: passSchema,
        onSubmit: handleResetPassword
    });
    useEffect(() => {
        formik.setValues({
            password: password ||"",
            password2: password2 ||""
        });
    }, [password,password2]);
    return(<>
        <>
            <Container  style={{ 
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                  <Card sx={{width:"30rem"}}>
                    <CardContent>
                     
                        <>
                          <Typography variant="h4" align="center" gutterBottom>
                            {t("restore-password")} 
                          </Typography>
                          <form onSubmit={formik.handleSubmit}  autoComplete="off" >
                            <Grid container spacing={2} direction="column">
                                <Grid item xs={5}>
                                    <TextFieldPassword
                                        label={t("password")}
                                        value={password}
                                        onChange={setPassword}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextFieldPassword
                                        label={t("repeat-password")}
                                        value={password2}
                                        onChange={setPassword2}
                                        error={formik.touched.password2 && Boolean(formik.errors.password2)}
                                        helperText={formik.touched.password2 && formik.errors.password2}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            backgroundColor:colors.primaryColor,
                                            '&:hover':{
                                                backgroundColor:colors.primaryColor
                                            }
                                        }}
                                        >
                                        {t("update")}
                                    </Button>
                                </Grid>
                            </Grid>
                          </form>
                        </>
                    </CardContent>
                  </Card>
            </Container>  
            <Footer />
          </>
    </>)
}
export default ResetPassword;