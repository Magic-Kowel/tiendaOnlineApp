import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStatus, getMenu, updateMenu } from '../../../reducers/security/security';
import { useParams, useNavigate } from 'react-router';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import Swal from 'sweetalert2';
import TitlePage from '../../../components/TitlePage';
import Autocomplete from '@mui/material/Autocomplete';
import GoBack from '../../../components/goBack';
import {colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
function UpdateMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [t] = useTranslation("global");
    // const {status} = useSelector((state)=>state.security)
    const [statusData,setStatusData] = useState([]);
    const [menuData,setMenuData] = useState({
        idMenu:"",
        name:"",
        idStatus:""
    });
    const [selectStatu,setSelectStatu] = useState([]);
    const handleGeStatus = async () => {
        const response = await dispatch(getStatus());
        setStatusData(response.payload);
    }
    const handleGeMenu = async () => {
        const menu = await dispatch(getMenu(id));
        setMenuData(menu.payload[0]);
    }
    const handleUpdateMenu = async (e) =>{
        e.preventDefault();
        if(
            menuData.name.trim()==="" ||
            !menuData.idStatus
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(updateMenu(menuData));
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
    useEffect(()=>{
        handleGeStatus();
        handleGeMenu();
    },[])
 
    useEffect(() => {
        if (statusData.length > 0 && menuData) {
            setSelectStatu(statusData.find((item) => item?.id === menuData?.idStatus));
        }
    }, [statusData, menuData]);
 
    return(
        <>
            <Container>
                <TitlePage 
                    title={t("edit-menu")}
                />
                <GoBack />
                <Grid container spacing={2} >
                    <Grid item xs={12} direction="column">
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={handleUpdateMenu}
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
                                                setMenuData((prevState) => ({
                                                    ...prevState,
                                                    idStatus: newValue.id
                                                }));
                                            }
                                        }}
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={menuData.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setMenuData({
                                                    ...menuData,
                                                    name:e.target.value
                                                })
                                            }}
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
        </>
    )
}
export default UpdateMenu;