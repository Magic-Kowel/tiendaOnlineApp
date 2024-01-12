import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStatus, getSubMenu, updateSubMenu } from '../../../reducers/security/security';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import TitlePage from '../../../components/TitlePage';
import Autocomplete from '@mui/material/Autocomplete';
import GoBack from '../../../components/goBack';
import {colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
function UpdateSubMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [t] = useTranslation("global");
    const [statusData,setStatusData] = useState([]);
    const [submenu,setSubmenu] = useState({
        idSubMenu:id,
        name:"",
        status:"",
        url:""
    });
    const [selectStatu,setSelectStatu] = useState([]);
    const handleGeStatus = async () => {
        const response = await dispatch(getStatus());
        setStatusData(response.payload);
    }
    const handleGetSubmenu = async () =>{
        const response = await dispatch(getSubMenu(id));
        setSubmenu(response.payload[0]);
    }
    const handleUpdateSubmenu = async (e) =>{
        e.preventDefault();
        if(
            submenu.name.trim()==="" ||
            submenu.url.trim()==="" ||
            !submenu.status
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateSubMenu(submenu));
        console.log(response);
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
    useEffect(() => {
        if (statusData.length > 0 && submenu) {
            setSelectStatu(statusData.find((item) => item?.id === submenu?.status));
        }
    }, [statusData, submenu]);
    useEffect(()=>{
        handleGeStatus();
        handleGetSubmenu();
    },[])
    return(
        <Container>
                <TitlePage 
                    title={t("edit-submenu")}
                />
                <GoBack />
                <Grid container spacing={2} >
                    <Grid item xs={12} direction="column">
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={handleUpdateSubmenu}
                                autoComplete="off"
                            >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            value={selectStatu}
                                            disablePortal
                                            options={statusData}
                                            getOptionLabel={(item) => item?.name}
                                            renderInput={(params) => <TextField {...params} label={t("satus")} />}
                                            onChange={(event, newValue)=>{
                                                if (newValue) {
                                                    setSubmenu((prevState) => ({
                                                        ...prevState,
                                                        status: newValue.id
                                                    }));
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={submenu.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setSubmenu({
                                                    ...submenu,
                                                    name:e.target.value
                                                })
                                            }}
                                            defaultValue=" "
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={submenu.url}
                                            label={t("url")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setSubmenu({
                                                    ...submenu,
                                                    url:e.target.value
                                                })
                                            }}
                                            defaultValue=" "
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
    )
}
export default UpdateSubMenu;