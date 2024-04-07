import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { 
    getStatus,
    createMenu,
    getMenus 
} from '../../../reducers/security/security';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DataTable from '../../../components/DataTable/DataTable';
import EditIcon from '@mui/icons-material/Edit';
import {colors} from "../../../stylesConfig"
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import FormAutocomplete from '../../../components/FormAutocomplete';
import { useTranslation } from 'react-i18next';
import getIdUser from '../../../tools/getIdUser';
import Swal from 'sweetalert2';
import GoBack from '../../../components/goBack';
import TitlePage from '../../../components/TitlePage';
import StackTable from '../../../components/DataTable/StackTable';
import MessageOnlyDeveloper from '../../../components/MessageOnlyDeveloper';
function Menu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [t] = useTranslation("global");
    const {status, menu} = useSelector((state)=>state.security);
    const [menuData,setMenuData] = useState([]);
    const [menuForm,setMenuForm] = useState({
        idUser:getIdUser(),
        name:"",
        status:""
    });
    const createMenuSchema = Yup.object().shape({
        name: Yup.string().required(t("this-field-is-required")),
        idUser: Yup.string().required(t("this-field-is-required")),
        status: Yup.string().required(t("this-field-is-required")),
    });

    useEffect(()=>{
        formik.setValues({
            name:menuForm?.name || "",
            idUser:menuForm?.idUser || "",
            status:menuForm?.status || ""
        });
    },[menuForm])

    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const handleGetMenu = async () =>{
        await dispatch(getMenus());
    }
    const handleUpdate = (id) =>{
        navigate(`/security/menu/edit/${id}`);
    }
    const handleCreateMenu = async () =>{
        console.log("menuForm",menuForm.status);
        const response = await dispatch(createMenu(menuForm));
        if(response.payload.created){
            handleGetMenu();
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const formik = useFormik({
        initialValues: {
            name: menuForm.name,
            idUser: menuForm.idUser,
            status: menuForm.status
        },
        validationSchema: createMenuSchema, 
        onSubmit: handleCreateMenu,
    });
    useEffect(()=>{
        handleGetMenu();
        handleGeStatus();
    },[])
 
    const listTitles = [t("name"),t("status"),t("actions")];
    const listKeys = ["name","status"];
    const listButtons = [
        {
            tooltipTitle: t("update"),
            onClick: (id) => handleUpdate(id),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("menu")}
                />
                <GoBack />
                <Grid container spacing={2} >
                    <Grid item xs={12} md={5}>
                        <Paper
                            sx={{padding:"1rem"}}
                        >
                            <form
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Grid container item spacing={2}  >
                                    <Grid item xs={12}>
                                        <FormAutocomplete
                                            data={status}
                                            getData={(newValue) => 
                                                setMenuForm((prevMenu) => 
                                                ({ ...prevMenu,
                                                    status: newValue?.id
                                                })
                                            )}
                                            getOptionSearch={(item)=>item.name}
                                            title={t("status")}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                            helperText={formik.touched.status && formik.errors.status}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={menuForm.name}
                                            label={t("name")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>{
                                                setMenuForm({
                                                    ...menuForm,
                                                    name:e.target.value
                                                })
                                            }}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
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
                                            {t("create")}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                            <MessageOnlyDeveloper />
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <SearchAutoComplete
                            data={menu}
                            getData={setMenuData}
                            getOptionSearch={(item)=>item.name}
                        />
                        {!isMobile?(
                            <DataTable
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={menuData}
                                listButtons={listButtons}
                                id="id"
                            />
                        ):(
                            <StackTable 
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={menuData}
                                listButtons={listButtons}
                                id="id"
                            />
                        )}
          
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Menu;