import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getSizes,
    createSize,
    deleteSize
} from "../../reducers/size/size";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import {
    Container,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography,
    ButtonGroup
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TitlePage from "../../components/TitlePage";
import SearchAutoComplete from "../../components/SearchAutoComplete"
import { sizeTitleForm } from "../../stylesConfig";
import { colors } from "../../stylesConfig";
function Size(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sizes} = useSelector((state)=>state.size);
    const [t] = useTranslation("global");
    const [sizeList, setSizeList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [sizeForm, setSizeForm] = useState({nameSize:''});
    const getSizeData = async () =>{
        await dispatch(getSizes());
    }
    useEffect(()=>{
        getSizeData();
    },[]);
    useEffect(()=>{
        setSizeList(sizes);
    },[sizes]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleCreateSize = async (e) =>{
        e.preventDefault();
        if(sizeForm.nameSize.trim()===""){
            Swal.fire({
                title:t("fill-in-all-fields"),
                icon:"error",
            });
            return false;
        }
        const response = await dispatch(createSize(sizeForm))
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            getSizeData();
            setSizeForm({nameSize:""})
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const handleDeleteSize = (idSize) =>{
        Swal.fire({
            title: t("want-to-delete-size-clothe"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSize(idSize))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        getSizeData();
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
    const handleUpdateSize = async (idSize) =>{
        navigate(`/size/edit/${idSize}`);
    }
    return(
        <>
             <Container>
                <TitlePage
                    title={t("size-clothes")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={8} lg={7}>
                        <SearchAutoComplete
                            data={sizes}
                            getData={setSizeList}
                            getOptionSearch={(item)=>item.nameSize}
                        />
                        <Paper sx={{ 
                            marginTop:'0.5rem',
                                width: '100%',
                                overflow: 'hidden',
                                paddingTop:"0.5rem"
                            }}>
                            <TableContainer sx={{  maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            {t("size-clothe")}
                                        </TableCell>
                                        <TableCell>
                                            {t("actions")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sizeList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row,index) => (
                                        <TableRow hover key={index} tabIndex={-1} >
                                                <TableCell>
                                                    {row.nameSize}
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonGroup 
                                                        variant="contained"
                                                    >
                                                        <Tooltip title={t("update")}>
                                                            <Button
                                                                color="warning"
                                                                onClick={()=>handleUpdateSize(row.idSize)}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title={t("delete")}>
                                                            <Button
                                                                color="error"
                                                                onClick={()=>handleDeleteSize(row.idSize)}
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
                                count={sizes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={5} lg={5}>
                        <Card
                            component="form"
                            onSubmit={handleCreateSize}
                        >
                            <CardContent>
                                    <Typography
                                        sx={{
                                            fontSize:sizeTitleForm,
                                        }}
                                        textAlign="center"
                                        variant="h2"
                                        gutterBottom
                                    >
                                        {t("create-size-clothes")}
                                    </Typography>
                                    <Grid
                                        container 
                                        spacing={2}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                value={sizeForm.nameSize}
                                                onChange={(e)=>{
                                                    setSizeForm({nameSize:e.target.value})
                                                }}
                                                fullWidth
                                                label={t("size-clothe")} 
                                                variant="outlined" 
                                            />
                                        </Grid>
                                    </Grid>
                            </CardContent>
                            <CardActions>
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
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Size;