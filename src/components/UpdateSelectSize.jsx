import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSizeVariationProdruct,getSizesVariationDisplay } from "../reducers/size/size";
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    Tooltip,
    Button,
    Grid,
    Divider,
    ButtonGroup
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldNumber from "./TextFieldNumber";
import FormAutocomplete from "./FormAutocomplete";
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { colors } from "../stylesConfig";
import ModalChangepriceStock from "./modales/modalChangepriceStock";
function UpdateSelectSize({
    idProduct,
    setProduct
}){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {sizeVariation,sizeVariationProduct} = useSelector((state)=>state.size);
   
    const [sizes,setSizes] = useState([]);
    const [size,setSize] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [listUpdateSize, setListUpdateSize] = useState([]);
    const [open, setOpen] = useState(false);
    const [productVariation,setProductVariation] = useState({
        stock:"0",
        price:"0"
    });
    const [productVariationSelect,setProductVariationSelect] = useState({
        stock:"0",
        price:"0",
        idSizeVariation:""
    });
    useEffect(()=>{
        dispatch(getSizeVariationProdruct(idProduct));
        dispatch(getSizesVariationDisplay(getSizesVariationDisplay));
    },[])
    useEffect(()=>{
        setListUpdateSize(sizeVariationProduct);
    },[sizeVariationProduct]);
    useEffect(()=>{
        const filterListUpdateSize = sizeVariation?.filter((item) =>
        !listUpdateSize.some((item2) => (item2.idSizeVariation === item.idSizeVariation) && item2.isDelete !==true)
        );
        setProduct((prev)=>({
            ...prev,
            sizesList:listUpdateSize
        }));
        setSizes(filterListUpdateSize);
    },[listUpdateSize]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDeleteSize = (id) => {
        setListUpdateSize((prevList) => {
            return prevList.map((item) => {
                if (item.idSizeVariation === id && !item.isMain) {
                    return { ...item, isDelete: true };
                }
                return item;
            }).filter((obj, index, self) =>
                index === self.findIndex((o) => (
                    o.id === obj.id && o.idSizeVariation === obj.idSizeVariation
                ))
            );
        });
    };
    const handleSwitcheMain = (id) =>{
        const  listFilter =  listUpdateSize.map((item)=>{
            if(item.isMain === true){
                return {...item, isMain:false,isUpdate:true }
            }
            return item
        })
        const result = listFilter.map((item)=>{
            return {
                ...item,
                isMain:item.idSizeVariation === id,
                isUpdate:true
            }
        });
        setListUpdateSize(result)
    }
    const handleAddSizeList =()=>{
        setListUpdateSize((prev) =>
            [
                ...prev,
                {
                    ...size,
                    ...productVariation,
                    isDelete: false,
                    isMain: false,
                    isNew:true
                }
            ]);
            setSize(null);
            formik.resetForm();
    }
    const selectSizeSchema = Yup.object().shape({
        sizeVariation: Yup.string().required(t("this-field-is-required")),
        price: Yup.number().min(1,t("the-minimum-is")+": 1").required(t("this-field-is-required")),
        stock: Yup.number().min(1,t("the-minimum-is")+": 1").required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            sizeVariation: size,
            price:0,
            stock:0
        },
        validationSchema: selectSizeSchema,
        onSubmit: handleAddSizeList
    });
    useEffect(() => {
        formik.setValues({
            sizeVariation: size?.idSizeVariation,
            stock:productVariation.stock,
            price:productVariation.price
        });
    }, [size,productVariation]);

    const handleClickOpen = (data) => {
        setOpen(true);
        setProductVariationSelect({
            price:data.price,
            stock:data.stock,
            idSizeVariation:data.idSizeVariation
        })
    };
    return(
        <>
            <ModalChangepriceStock 
                open={open}
                setOpen={setOpen} 
                productVariationSelect={productVariationSelect}
                setListUpdateSize={setListUpdateSize}
             />
            <Paper sx={{
                    boxShadow:5,
                    marginTop:'0.5rem',
                    width: '100%',
                    overflow: 'hidden',
                    padding:"1rem"
                }}>
                    <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={12} md={6}>
                        <TextFieldNumber
                            label={t('price')}
                            value={productVariation.price}
                            onChange={(value)=>{
                                setProductVariation((prev)=>({
                                    ...prev,
                                    price:Number(value)
                                }))
                            }}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextFieldNumber
                            label={t('stock')}
                            value={productVariation.stock}
                            onChange={(value)=>{
                                setProductVariation((prev)=>({
                                    ...prev,
                                    stock:Number(value)
                                }))
                            }}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormAutocomplete
                            valueDefault={size}
                            data={sizes}
                            getOptionSearch={(option) => option.displaySize}
                            title={t('select-size-clothe')}
                            getData={(newValue) =>
                                setSize(newValue)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={formik.handleSubmit}
                            endIcon={<AddCircleIcon />}
                            sx={{
                                backgroundColor:colors.primaryColor,
                                '&:hover':{
                                    backgroundColor:colors.primaryColor
                                }
                            }}
                        >
                            {t('add-size-clothe')}
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                <TableContainer sx={{  maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    {t("size-clothe")}
                                </TableCell>
                                <TableCell align="center">
                                    {t("size-ranges-clothe")}
                                </TableCell>
                                <TableCell align="center">
                                    {t("price")}
                                </TableCell>
                                <TableCell align="center">
                                    {t("stock")}
                                </TableCell>
                                <TableCell align="center">
                                    {t("actions")}
                                </TableCell>
                                <TableCell align="center">
                                    {t("main")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listUpdateSize
                            .filter((size)=>!size.isDelete)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row,index) => (
                                <TableRow hover key={index+row.idSizeVariation} tabIndex={-1}>
                                    <TableCell align="center">
                                        {row.nameSize}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ageGroup}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.stock}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="text" sx={{color:colors.primaryColor}}>
                                            <Tooltip title={t("delete")}>
                                                <Button 
                                                    color="error" 
                                                    onClick={() => handleDeleteSize(row.idSizeVariation)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title={t("update")}>
                                                <Button 
                                                    color="warning" 
                                                    onClick={() =>handleClickOpen({
                                                        price:row.price,
                                                        stock:row.stock,
                                                        idSizeVariation:row.idSizeVariation
                                                    })}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip   title={t("main")}>
                                            <Button 
                                                variant="contained"
                                                color="info"
                                                onClick={() => handleSwitcheMain(row.idSizeVariation)}
                                            >
                                                <StarIcon color={row.isMain? 'warning' : "disabled"} />
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
                    count={listUpdateSize.filter((size)=>!size.isDelete).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}
UpdateSelectSize.propTypes = {
    idProduct: PropTypes.string,
    setProduct: PropTypes.func
};
export default UpdateSelectSize;