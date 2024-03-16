import { useDispatch,useSelector } from "react-redux";
import { 
    getProduct,
    getProductImagens,
    updateProduct
} from "../../reducers/product/product";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import TitlePage from "../../components/TitlePage";
import { useTranslation } from 'react-i18next';
import {
    Container,
    Grid,
    Alert,
    TextField,
    InputAdornment,
    Button
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '../../components/LoadingButton ';
import MainCard from "../../components/MainCard";
import FormProduct from "./FormProduct";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ImagePreviewList from "../../components/ImagePreviewList";
import TabHeader from '../../components/TabsSecion/TabHeader';
import { colors } from '../../stylesConfig';
import UploadFile from '../../components/UploadFile';
import TabPanel from '../../components/TabsSecion/TabPanel';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { isValidUrl } from '../../tools/isValidUrl';
import GoBack from "../../components/goBack";
import UpdateSelectSize from "../../components/UpdateSelectSize";
function UpdateProduct(){
    const [t] = useTranslation("global");
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const {products,imagensProduct,loadingProducts} = useSelector((state)=>state.product)
    const {idProduct} = params;
    useEffect(()=>{
        dispatch(getProduct(idProduct));
        dispatch(getProductImagens(idProduct));
    },[]);
    const [urlError,setUrlError] = useState(false);
    const [urlImagen,setUrlImagen] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [valueTab, setValueTab] = useState(0);

    const handleChangeTap = (event, newValue) => {
      setValueTab(newValue);
    };
    const [product,setProduct] = useState({
        idProduct:idProduct,
        nameProduct:"",
        description:"",
        idCategory:"",
        idSubCategory:"",
        idMaterial:"",
        idGender:"",
        sizesList:[],
        files: [],
        imageUrls:[],
        listImagenes:[]
    });
    useEffect(()=>{
        if(products.length > 0){
            setProduct((prev)=>({
                ...prev,
                nameProduct:products[0].nameProduct,
                description:products[0].description,
                idCategory:products[0].idCategory,
                idSubCategory:products[0].idSubcategory,
                idMaterial:products[0].idMaterial,
                idGender:products[0].idGender,
                listImagenes:imagensProduct
            }))
        }
    },[products,imagensProduct]);
    const handleUpdateProduct = async () =>{
        const formData = new FormData();
        // Agregar campos de texto
        formData.append("idProduct", idProduct);
        formData.append("nameProduct", product.nameProduct);
        formData.append("description", product.description);
        formData.append("idCategory", product.idCategory);
        formData.append("idSubCategory", product.idSubCategory);
        formData.append("idMaterial", product.idMaterial);
        formData.append("idGender", product.idGender);
        // Agregar datos de sizesList
        formData.append("imageUrls", JSON.stringify(product.imageUrls));
        formData.append("sizesList", JSON.stringify(product.sizesList));
        // Agregar archivos
        for (let i = 0; i < product.files.length; i++) {
            formData.append(`files`, product.files[i]);
        }
        console.log("product",product);
        const response = await dispatch(updateProduct(formData));
        if(response.payload.updated){
            Swal.fire({
                title:t("successfully-updated"),
                icon:'success',
                timer: 1500
            });
 
            navigate(-1)
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const createProductSchema = Yup.object().shape({
        nameProduct:Yup.string().required(t("this-field-is-required")),
        description:Yup.string().required(t("this-field-is-required")),
        idCategory:Yup.string().required(t("this-field-is-required")),
        idSubCategory:Yup.string().required(t("this-field-is-required")),
        idMaterial:Yup.string().required(t("this-field-is-required")),
        idGender:Yup.string().required(t("this-field-is-required")),
        sizesList:Yup.array().min(0).required(t("this-field-is-required")),
    });
    const formik = useFormik({
        initialValues: {
            nameProduct:product.nameProduct,
            description:product.description,
            idCategory:product.idCategory,
            idSubCategory:product.idSubCategory,
            idMaterial:product.idMaterial,
            idGender:product.idGender,
            sizesList:product.sizesList
        },
        validationSchema: createProductSchema,
        onSubmit: handleUpdateProduct,
    });
    useEffect(()=>{
        formik.setValues({
            nameProduct:product.nameProduct || "",
            description:product.description || "",
            idCategory:product.idCategory || "",
            idSubCategory:product.idSubCategory || "",
            idMaterial:product.idMaterial || "",
            idGender:product.idGender || "",
            sizesList:product.sizesList || []
        });
    },[product]);
    useEffect(() => {
        setProduct((prev)=>({
            ...prev,
            ...selectedFiles
        }));
    }, [selectedFiles]);
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-product")}
                />
                <Grid container spacing={2}>
                    <Grid 
                        item
                        xs={12}
                        sm={12} 
                        md={12} 
                        lg={6}
                        xl={6}
                    >
                        <GoBack />
                        <>
                            <TabHeader
                                value={valueTab}
                                handleChange={handleChangeTap}
                                listTitles={[t("file"), "URL"]}
                            />
                            <TabPanel value={valueTab} index={0}>
                                <UploadFile
                                        setSelectedFiles={setSelectedFiles}
                                        fileInputRef={fileInputRef}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>
                                <Grid 
                                    container
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    item
                                    xs={12}
                                    sm={13}
                                    md={12}
                                    lg={12}
                                    spacing={1}
                                    mt={2}
                                >
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="stretch"
                                        item
                                        xs={12}
                                        sm={12}
                                        md={9}
                                        lg={9}
                                    >
                                        <TextField
                                            label={t("imagen-url")}
                                            error={urlError}
                                            value={urlImagen}
                                            autoComplete="off"
                                            onChange={(e) => setUrlImagen(e.target.value)}
                                            fullWidth
                                            type="url"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FileUploadIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="outlined"
                                            helperText={urlError ? t("invalid-url-format") : t("upload-image-url")}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={3}
                                        lg={3}
                                        container
                                        justifyContent="center"
                                        alignItems="stretch"
                                    >
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained" 
                                            endIcon={<AddCircleIcon />}
                                            sx={{
                                                backgroundColor:colors.primaryColor,
                                                '&:hover':{
                                                    backgroundColor:colors.primaryColor
                                                },
                                                height:"3.3rem"
                                            }}
                                            onClick={() => {
                                                if (!isValidUrl(urlImagen)) {
                                                    setUrlError(true);
                                                    return false;
                                                }
                                                setProduct((prev) =>{
                                                    return ({
                                                 
                                                        ...prev,
                                                        imageUrls: [...(prev.imageUrls ?? []), urlImagen]
                                                    })
                                                });
                                                setUrlError(false);
                                                setUrlImagen("");
                                            }}
                                        >
                                            {t('add')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            </>
                            {
                                ((formik.touched.files && Boolean(formik.errors.files)) || (formik.touched.imageUrls && Boolean(formik.errors.imageUrls))) && (
                                    <Alert
                                        variant="filled"
                                        severity="error"
                                        sx={{margin:2}}
                                    >
                                        {formik.errors.files}
                                        {formik.errors.imageUrls}
                                    </Alert>
                                )
                            }
                            <>
                            {
                                <ImagePreviewList
                                    files={selectedFiles?.files || []}
                                    imageUrls={product?.imageUrls || []}
                                    listImagenes={product.listImagenes || []}
                                    setSelectedFiles={setSelectedFiles}
                                    fileInputRef={fileInputRef}
                                />
                            }
                            </>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12} 
                        lg={6}
                        xl={6}
                    >
                        <MainCard>
                            <FormProduct 
                                setProduct={setProduct}
                                product={product}
                                formik={formik}
                            />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <UpdateSelectSize
                            setProduct={setProduct}
                            idProduct={idProduct} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <LoadingButton
                                isLoading={loadingProducts}
                                click={formik.handleSubmit}
                                icon={<EditIcon />}
                            >
                                {t('edit')}
                            </LoadingButton>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default UpdateProduct