import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    getSizesVariation,
    deleteSizesVariation
} from "../../../reducers/size/size";
import {
    Container,
    Paper,
    Grid,
    ButtonGroup,
    Button,
    Tooltip
} from '@mui/material';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TitlePage from "../../../components/TitlePage";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import FormSizeVariation from "./FormSizeVariation";
import Swal from 'sweetalert2';
function SizeVariation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sizeVariation} = useSelector((state)=>state.size);
    const [t] = useTranslation("global");
    const [sizeVariationList, setSizeVariationList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getSizeVariationData = async () =>{
        await dispatch(getSizesVariation());
    }
    useEffect(()=>{
        getSizeVariationData();
    },[]);
    useEffect(()=>{
        setSizeVariationList(sizeVariation);
    },[sizeVariation]);
    const handleDeleteSizeVariation =  (idSizeVariation) =>{
        Swal.fire({
            title: t("want-to-delete-size-clothe"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSizesVariation(idSizeVariation))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        getSizeVariationData();
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
    const handleUpdateSizeVariation = async (idSizeVariation) =>{
        await navigate(`/size/variation/edit/${idSizeVariation}`);
    }
    return(
        <>
            <Container>
                <TitlePage
                    title={t("size-categories-clothe")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={7} lg={7}>
                        <SearchAutoComplete
                            data={sizeVariation}
                            getData={setSizeVariationList}
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
                                            {t("size-categories-clothe")}
                                        </TableCell>
                                        <TableCell>
                                            {t("size-ranges-clothe")}
                                        </TableCell>
                                        <TableCell>
                                            {t("age-range")}
                                        </TableCell>
                                        <TableCell>
                                            {t("actions")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sizeVariationList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover key={row.idSizeVariation} tabIndex={-1} >
                                                <TableCell>
                                                    {row.nameSize}
                                                </TableCell>
                                                <TableCell>
                                                    {row.ageGroup}
                                                </TableCell>
                                                <TableCell>
                                                    {row.minAge && row.maxAge ? `${row.minAge} - ${row.maxAge}`: t("does-not-apply")}
                                                </TableCell>
                                                <TableCell>
                                                        <ButtonGroup 
                                                            variant="contained"
                                                        >
                                                            <Tooltip title={t("update")}>
                                                                <Button
                                                                    color="warning"
                                                                     onClick={()=>handleUpdateSizeVariation(row.idSizeVariation)}
                                                                >
                                                                    <EditIcon />
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title={t("delete")}>
                                                                <Button
                                                                    color="error"
                                                                    onClick={()=>handleDeleteSizeVariation(row.idSizeVariation)}
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
                                count={sizeVariationList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={5} lg={5}>
                        <FormSizeVariation />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SizeVariation;