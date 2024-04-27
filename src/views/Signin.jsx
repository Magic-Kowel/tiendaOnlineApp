import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Alert
} from "@mui/material";
import MenuWithoutSection from "../components/menu/MenuWithoutSection";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import {colors} from "../stylesConfig";
import { loginValidate } from "../reducers/user/user";
import { NAME_TOKEN,NAME_USER } from "../config";
import TextFieldPassword from "../components/TextFieldPassword";
function Signin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:"",
        password:""
    });
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState(false);
    const [isUserActive,setIsUserActive] = useState(true);
    const [t] = useTranslation("global");
    const SigninUser = async (e) =>{
        e.preventDefault();
        try {
            const response = await dispatch(loginValidate(user));
            if(response.payload.auth){
                await sessionStorage.setItem(NAME_TOKEN, response.payload.token);
                await sessionStorage.setItem(NAME_USER, response.payload.userName);
                navigate('/home');
                return false;
            }
            setMessage(true);
            if( "active" in response.payload){
                setIsUserActive(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        const token = sessionStorage.getItem(NAME_TOKEN);
        if(token){
            navigate('/home');
        }
    },[]);
    useEffect(()=>{
        setUser((prev)=>({
            ...prev,
            password:password
        }))
    },[password]);
    return(
        <>
            <MenuWithoutSection />
            <Container  style={{ 
                height: 'calc(100vh - 280px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Card sx={{width:"30rem"}}>
                    <CardContent>
                            <Typography 
                                variant="h1" 
                                align="center" 
                                gutterBottom
                                sx={{fontSize:"2.3rem"}}
                            >
                                {t("signin")}
                            </Typography>
                            <form
                            onSubmit={SigninUser}
                            autoComplete="off">
                                <Grid 
                                container 
                                spacing={2} 
                                flexDirection="column"
                                >
                                    <Grid item>
                                        <TextField
                                            value={user.email}
                                            onChange={(e)=>{
                                                setUser({
                                                    ...user,
                                                    email:e.target.value.trim()
                                                });
                                            }}
                                            fullWidth
                                            label={t("email")}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextFieldPassword
                                            label={t("password")}
                                            value={user.password}
                                            onChange={setPassword}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                        variant="contained"
                                        sx={{
                                            backgroundColor:colors.primaryColor,
                                            '&:hover':{
                                                backgroundColor:colors.primaryColor
                                            }
                                        }}
                                        fullWidth
                                        type="submit"
                                        >
                                        {t("signin")}
                                        </Button>
                                    </Grid>
                                    {
                                        !isUserActive &&
                                        <Grid item>
                                            <Alert variant="filled" severity="info">
                                                {t("user-not-is-active")}
                                            </Alert>
                                        </Grid>
                                    }
                                    {
                                        isUserActive && message &&
                                        <Grid item>
                                            <Alert variant="filled" severity="error">
                                                {t("incorrect-username-or-password")}
                                            </Alert>
                                        </Grid>
                                    }
                                </Grid>
                            </form>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </>
    );
}
export default Signin;