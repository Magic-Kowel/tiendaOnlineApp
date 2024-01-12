import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../reducers/category/category';
import { colors, sizeTitle } from '../../stylesConfig';
import SearchAutoComplete from '../../components/SearchAutoComplete';
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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
    Button,
    ButtonGroup,
    Typography,
    Container,
    Tooltip
} from '@mui/material';
import Swal from 'sweetalert2';
import GoBack from '../../components/goBack';
import { useTranslation } from 'react-i18next';
function Category(){
    const navigate = useNavigate();
    const {categorys} = useSelector((state)=>state.category)
    const [t] = useTranslation("global");

    const dispatch = useDispatch();
    const getCategoryData = async () =>{
        await dispatch(getCategories());
    }
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(()=>{
        setCategories(categorys)
    },[categorys])
    useEffect(() => {
        getCategoryData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const createCategory=()=>{
        navigate("/product/category/create");
    }
    const subcategory = (id) => {
        navigate(`/product/category/subcategory/${id}`);
    }
    const handleDeleteCategory = async (id) =>{
        Swal.fire({
            title: t("want-to-delete-category"),
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
                        getCategoryData();
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
    const handleUpdateCategory = (id) =>{
        navigate(`/product/category/edit/${id}`);
    }
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
                {t("categories")}
            </Typography>
            <GoBack />
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={createCategory}
                sx={{
                    backgroundColor:colors.secondaryColor,
                    '&:hover':{
                        backgroundColor:colors.secondaryColor
                    }
                }}
            >
                {t("create-category")}
            </Button>
                <Paper sx={{ 
                    width: '100%',
                    overflow: 'hidden',
                    marginTop:"2rem",
                    paddingTop:"0.5rem"
                }}>
                <SearchAutoComplete
                    data={categorys}
                    getData={setCategories}
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
                            <TableCell>
                                {t("subcategory")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
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
                                                    onClick={()=>handleUpdateCategory(row.ecodCategoria)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title={t("delete")}>
                                                <Button
                                                    color="error"
                                                    onClick={()=>handleDeleteCategory(row.ecodCategoria)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell >
                                        <Tooltip title={t("subcategories")}>
                                            <Button 
                                                sx={{
                                                    backgroundColor:colors.secondaryColor,
                                                    '&:hover':{
                                                        backgroundColor:colors.secondaryColor
                                                    }
                                                }}
                                                onClick={()=>subcategory(row.ecodCategoria)}
                                                variant="contained">
                                                    <FormatListBulletedIcon />
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
                    count={categorys.length}
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
export default Category;