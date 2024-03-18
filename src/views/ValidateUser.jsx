import { useEffect,useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";
import { getUser,validateUser } from '../reducers/user/user';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Typography,
  Container,
  Button
} from '@mui/material';

function ValidateUser(){
const { uid } = useParams();
const [user,setUser] = useState({});
const dispatch = useDispatch();
const navigate = useNavigate();
const getUserData = async () =>{
  const response = await dispatch(getUser(uid));
  setUser(response.payload);
}
const validateUserForm = async (e)=>{
  e.preventDefault();
  const reponse = await dispatch(validateUser(uid));
  if(reponse.payload.active){
    navigate('/');
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: t("error-validate-user"),
    })
  }
}
useEffect(()=>{
  getUserData();
},[]);
const [t]= useTranslation("global");
return(
    <Container  style={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
       }}>
          <Card sx={{width:"30rem"}}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                {t("validate-user")} {user[0]?.nameUser}
              </Typography>
              <form onSubmit={validateUserForm} autoComplete="off" >
                <Grid container spacing={2} direction="column">
                  <Grid item xs={5}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      type="submit"
                    >
                      {t("activate")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
    </Container>  

);

}
export default ValidateUser;