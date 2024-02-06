import { useEffect, useState } from "react";
import TitlePage from "../../../components/TitlePage";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../reducers/user/user";
import { colors } from "../../../stylesConfig";
import { useNavigate } from "react-router";
import {
    Container,
    Paper,
    Button
} from '@mui/material';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Tooltip
} from '@mui/material';
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import ListIcon from '@mui/icons-material/List';
function PermisosUser(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state)=>state.user)
    const [t] = useTranslation("global");
    const handleGetUsers = async () =>{
        await dispatch(getUsers())
    }
    useEffect(()=>{
        handleGetUsers();
    },[]);
    const [userData,setUserData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handlePermissions = (id) =>{
        navigate(`/security/permissions/${id}`);
    }
    return(
        <>
            <Container>
                <TitlePage
                    title={t("user-permissions")}
                />
                <Paper sx={{ 
                            width: '100%',
                            overflow: 'hidden',
                            paddingTop:"0.5rem"
                        }}>
                        <SearchAutoComplete
                            data={users}
                            getData={setUserData}
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
                                        {t("last-name")}
                                    </TableCell>
                                    <TableCell>
                                        {t("type-user")}
                                    </TableCell>
                                    <TableCell>
                                        {t("status")}
                                    </TableCell>
                                    <TableCell>
                                        {t("permissions")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row,index) => (
                                    <TableRow hover key={index} tabIndex={-1} >
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.lastName}
                                            </TableCell>
                                            <TableCell>
                                                {row.TypeUser}
                                            </TableCell>
                                            <TableCell>
                                                {row.status}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={t("edit")}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={()=>handlePermissions(row.id)}
                                                        sx={{
                                                            backgroundColor:colors.primaryColor,
                                                            '&:hover':{
                                                                backgroundColor:colors.primaryColor
                                                            }
                                                        }}
                                                    >
                                                        <ListIcon />
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
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
            </Container>
        </>
    );
}
export default PermisosUser;