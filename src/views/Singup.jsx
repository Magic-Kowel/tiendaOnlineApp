import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser,validateEmail } from "../reducers/user/user";
import { useTranslation } from "react-i18next";
import { isEmail } from "../tools/isEmail";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  TextField,
  Typography,
  Container,
  Button,
  Alert
} from '@mui/material';
import MenuWithoutSection from "../components/menu/MenuWithoutSection";
function Singup(){
  const dispatch = useDispatch();
  const [t]= useTranslation("global");
  const [message,setMessage]=useState(false);
  const [user,setUser]=useState({
    name:"",
    lastName:"",
    birthDate:"",
    email:"",
    password:"",
    repeatPassword:""
  });

  const validateEmailForm = async (email)=>{
    const response = await dispatch(validateEmail(email));
    return response.payload;
  }
  const createUserForm = async (e)=>{
    e.preventDefault()
    if(
      user.name.trim()===""||
      user.lastName.trim()===""||
      user.birthDate.trim()===""||
      user.email.trim()===""||
      user.password.trim()===""||
      user.repeatPassword.trim()===""
    ){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: t("fill-in-all-fields"),
      });
      return false;
    }
    if(user.password!==user.repeatPassword){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: t("password-does-not-match"),
      });
      return false;
    }
    const validateEmail = await validateEmailForm(user.email);
    if(validateEmail.exists){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: t("email-has-already-been-registered"),
      });
      return false;
    }
    const emailresponse =  isEmail(user.email);
    if(!emailresponse){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: t("please-enter-valid-email"),
      });
      return false;
    }
    const response = await dispatch(createUser(user));
    if(response.payload.created){
      setMessage(true);
    }
  }
  return(<>
      <MenuWithoutSection />
      <Container  style={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          <Card sx={{width:"30rem"}}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                {t("singup")}
              </Typography>
              <form autoComplete="off">
                <Grid container spacing={2} direction="column">
                  <Grid item xs={5}>
                    <TextField 
                      value={user.name}
                      onChange={(e)=>{
                        setUser({
                            ...user,
                            name:e.target.value
                        })
                    }}
                      label={t("name")} 
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      value={user.lastName}
                      onChange={(e)=>{
                        setUser({
                          ...user,
                          lastName:e.target.value
                        })
                      }}
                      label={t("last-name")} 
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      value={user.birthDate}
                      onChange={(e)=>{
                        setUser({
                          ...user,
                          birthDate:e.target.value
                        })
                      }}
                      type="date"
                      label={t("birth-date")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      value={user.email}
                      onChange={(e)=>{
                        setUser({
                          ...user,
                          email:e.target.value
                        })
                      }}
                      label={t("email")} 
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      value={user.password}
                      onChange={(e)=>{
                        setUser({
                          ...user,
                          password:e.target.value
                        })
                      }}
                      label={t("password")} 
                      type="password" 
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      error={user.password!==user.repeatPassword}
                      value={user.repeatPassword}
                      onChange={(e)=>{
                        setUser({
                          ...user,
                          repeatPassword:e.target.value
                        })
                      }}
                      label={t("repeat-password")}
                      type="password"
                      helperText={user.password!==user.repeatPassword?t("password-does-not-match"):""}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      type="submit"
                      onClick={createUserForm}
                    >
                      {t("singup")}
                    </Button>
                  </Grid>
                  {
                    message &&
                    <Grid item xs={5}>
                      <Alert variant="filled" severity="success">
                        {t("sended-email-validate-user")}
                      </Alert>
                    </Grid>
                  }
                </Grid>
              </form>
            </CardContent>
          </Card>
       </Container>  
  </>);
}
export default Singup;