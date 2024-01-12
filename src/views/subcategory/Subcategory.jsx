import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategories, deleteCategory } from "../../reducers/subCategory/subCategory";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { colors, sizeTitle } from '../../stylesConfig';
import Swal from 'sweetalert2';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import GoBack from "../../components/goBack";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    ButtonGroup,
    Typography,
    Container,
    Tooltip
} from '@mui/material';
function Subcategory(){
    const dispatch = useDispatch();
    const {subcategories} = useSelector((state)=>state.subcategory);
    const [t] = useTranslation("global");
    const params = useParams();
    const navigate = useNavigate();
    const [subcategoriesData, setSubcategoriesData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {idCategory} = params;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleGetSubcategories = async () => {
        await dispatch(getSubcategories(idCategory));
    }
    const handleCreateSubcategory = () =>{
        navigate(`/product/category/subcategory/create/${idCategory}`)
    }
    const handleUpdate = (id) =>{
        navigate(`/product/category/subcategory/edit/${id}`)
    }
    const handleDeleteSubcategory = (id) =>{
        Swal.fire({
            title: t("want-to-delete-subcategory"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        handleGetSubcategories()
                        return false;
                    }
                    Swal.fire({
                        title:t("something-went-wrong"),
                        icon:"error"
                    });
                })
            }
        });
    }
    useEffect(()=>{
        handleGetSubcategories();
    },[])
    return(
        <>
            <Container>
            <Typography
                sx={{
                    fontSize:sizeTitle,
                }}
                textAlign="center"
                variant="h1" 
                gutterBottom
            >
                {t("subcategory")}
            </Typography>
            <GoBack />
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleCreateSubcategory}
                sx={{
                    backgroundColor:colors.secondaryColor,
                    '&:hover':{
                        backgroundColor:colors.secondaryColor
                    }
                }}
            >
                {t("create-subcategory")}
            </Button>
                <Paper sx={{ 
                        width: '100%',
                        overflow: 'hidden',
                        marginTop:"2rem",
                        paddingTop:"0.5rem"
                    }}>
                    <SearchAutoComplete
                        data={subcategories}
                        getData={setSubcategoriesData}
                        getOptionSearch={(item)=>item.tNombre}
                    />
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {t("name")}
                                </TableCell>
                                <TableCell>
                                    {t("actions")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subcategoriesData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row,index) => (
                                <TableRow hover key={index}   tabIndex={-1} >
                                        <TableCell >
                                            {row.tNombre}
                                        </TableCell>
                                        <TableCell >
                                        <ButtonGroup 
                                            variant="contained"
                                        >
                                            <Tooltip title={t("update")}>
                                                <Button
                                                    color="warning"
                                                    onClick={()=>handleUpdate(row.ecodsubcategoria)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title={t("delete")}>
                                                <Button
                                                    color="error"
                                                    onClick={()=>handleDeleteSubcategory(row.ecodsubcategoria)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={subcategories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </Paper>
        </Container>
        </>
    )
}
export default Subcategory