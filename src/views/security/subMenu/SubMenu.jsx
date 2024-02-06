import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getSubMenus,getMenus,createSubMenu,getStatus } from "../../../reducers/security/security";
import TitlePage from "../../../components/TitlePage";
import getIdUser from "../../../tools/getIdUser";
import { useTranslation } from 'react-i18next';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    Grid,
    Button,
    Tooltip,
    TextField,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "../../../stylesConfig";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import GoBack from "../../../components/goBack";
function SubMenu(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subMenuData, setSubmenuData] = useState([]);
    const {status, submenu,menu } = useSelector((state)=>state.security)
    const [statusData,setStatusData] = useState([]);
    const [menuData,setMenuData] = useState([]);
    const [submenuForm,setSubmenuForm] = useState({
        name:"",
        url:"",
        idUser:"",
        status:"",
        idMenu:""
    });
    const handleGetSubMenu = async () =>{
        await dispatch(getSubMenus())
    }
    const handleGetMenu = async () =>{
        await dispatch(getMenus());
    }
    const handleGeStatus = async () => {
        await dispatch(getStatus());
    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleCreateSubmenu = async (e) =>{
        e.preventDefault();
        if(
            submenuForm.name.trim() === "" ||
            submenuForm.url.trim() === "" ||
            !submenuForm.status
        ){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createSubMenu(submenuForm));
        if(response.payload.created){
            handleGetSubMenu();
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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleUpdateSubmenu = (id) =>{
        navigate(`/security/submenu/edit/${id}`)
    }
    useEffect(()=>{
        handleGetMenu();
        handleGetSubMenu();
        handleGeStatus();
    },[])
    useEffect(()=>{
        setSubmenuForm((prevState) => ({
            ...prevState,
            idUser:getIdUser(),
            status: statusData[0]?.id,
            idMenu:menuData[0]?.id
        }));
    },[statusData,menuData])
    const [t] = useTranslation("global");
    return(
        <>
            <Container>

                <TitlePage
                    title={t("submenu")}
                />
                <Grid container spacing={2} >
                        <Grid item xs={12} md={5} direction="column">
                            <GoBack />
                            <Paper
                                sx={{padding:"1rem"}}
                            >
                                <form
                                    onSubmit={handleCreateSubmenu}
                                    autoComplete="off"
                                >
                                    <Grid container item spacing={2}  >
                                        <Grid item xs={12}>
                                            <SearchAutoComplete
                                                data={status}
                                                getData={setStatusData}
                                                getOptionSearch={(item)=>item.name}
                                                title={t("status")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <SearchAutoComplete
                                                data={menu}
                                                getData={setMenuData}
                                                getOptionSearch={(item)=>item.name}
                                                title={t("menu")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label={t("name")}
                                                fullWidth
                                                variant="outlined"
                                                value={submenuForm.name}
                                                onChange={(e)=>{
                                                    setSubmenuForm({
                                                        ...submenuForm,
                                                        name:e.target.value
                                                    })
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label={t("url")}
                                                fullWidth
                                                variant="outlined"
                                                value={submenuForm.url}
                                                onChange={(e)=>{
                                                    setSubmenuForm({
                                                        ...submenuForm,
                                                        url:e.target.value
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
                                                {t("create")}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid Grid item xs={12} md={7} direction="column">
                            <Paper sx={{ 
                                    width: '100%',
                                    overflow: 'hidden',
                                    paddingTop:"0.5rem"
                                }}>
                                <SearchAutoComplete
                                    data={submenu}
                                    getData={setSubmenuData}
                                    getOptionSearch={(item)=>item.name}
                                />
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                {t("name")}
                                            </TableCell>
                                            <TableCell>
                                                {t("url")}
                                            </TableCell>
                                            <TableCell>
                                                {t("status")}
                                            </TableCell>
                                            <TableCell>
                                                {t("menu")}
                                            </TableCell>
                                            <TableCell>
                                                {t("edit")}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subMenuData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row,index) => (
                                            <TableRow hover key={index}   tabIndex={-1} >
                                                    <TableCell>
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.url}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.nameMenu}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title={t("edit")}>
                                                            <Button
                                                                variant="contained"
                                                                color="warning"
                                                                onClick={()=>handleUpdateSubmenu(row.idSubMenu)}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={submenu.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SubMenu;