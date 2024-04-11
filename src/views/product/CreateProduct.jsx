import { useState,useEffect,useRef } from 'react';
import {
    Container,
    Grid,
    Alert,
    TextField,
    InputAdornment,
    Button
} from '@mui/material';
import ImagePreviewList from "../../components/ImagePreviewList"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
import FormProduct from './FormProduct';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import MainCard from '../../components/MainCard';
import AddSelectSize from './AddSelectSize';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createProduct } from '../../reducers/product/product';
import { useDispatch, useSelector } from 'react-redux';
import UploadFile from '../../components/UploadFile';
import LoadingButton from '../../components/LoadingButton ';
import TabHeader from '../../components/TabsSecion/TabHeader';
import { colors } from '../../stylesConfig';
import TabPanel from '../../components/TabsSecion/TabPanel';
import { isValidUrl } from '../../tools/isValidUrl';
function CreateProduct(){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const {loadingProducts} = useSelector((state)=>state.product);
    const [urlImagen,setUrlImagen] = useState("");
    const [urlError,setUrlError] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [listSelectetSize,setListSelectetSize] = useState([]);
    const [product,setProduct] = useState({
        nameProduct:"",
        description:"",
        idCategory:"",
        idSubCategory:"",
        idMaterial:"",
        idGender:"",
        sizesList:[],
        files: [],
        imageUrls:[]
    });
    const handleCreate = async ()  =>{
        console.log("product.sizesList",product.sizesList);
        const formData = new FormData();
        // Agregar campos de texto
        formData.append("nameProduct", product.nameProduct);
        formData.append("description", product.description);
        formData.append("idCategory", product.idCategory);
        formData.append("idSubCategory", product.idSubCategory);
        formData.append("idMaterial", product.idMaterial);
        formData.append("idGender", product.idGender);
        // Agregar datos de sizesList
        formData.append("sizesList", JSON.stringify(product.sizesList));
        formData.append("imageUrls", JSON.stringify(product.imageUrls));
        // Agregar archivos
        for (let i = 0; i < product.files.length; i++) {
            formData.append(`files`, product.files[i]);
        }
        const response = await dispatch(createProduct(formData));
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            formik.resetForm();
            setProduct({
                nameProduct:"",
                description:"",
                idCategory:"",
                idSubCategory:"",
                idMaterial:"",
                idGender:"",
                sizesList:[],
                files: [],
                imageUrls:[]
            });
            setListSelectetSize([]);
            setUrlImagen("");
            setSelectedFiles([]);
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
        sizesList:Yup.array().min(1,t("error-no-size-selected")).required(),
        files:Yup.lazy(() => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (product.imageUrls.length > 0) {
                return Yup.array().notRequired();
            }
            return Yup.array().min(1,t("error-no-images-selected")).required()
        }),
        imageUrls:Yup.lazy(() => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (product.files.length > 0) {
                return Yup.array().of(Yup.string().url('invalid-url-format')).notRequired();
            }
            return Yup.array().of(Yup.string().url('invalid-url-format')).min(1,t("error-no-images-selected")).required(t("error-no-images-selected"))
        }),
    });
    const formik = useFormik({
        initialValues: {
            nameProduct:product.nameProduct,
            description:product.description,
            idCategory:product.idCategory,
            idSubCategory:product.idSubCategory,
            idMaterial:product.idMaterial,
            idGender:product.idGender,
            files:product.files,
            sizesList:product.sizesList,
            imageUrls:product.imageUrls
        },
        validationSchema: createProductSchema, 
        onSubmit: handleCreate,
    });
    useEffect(()=>{
        formik.setValues({
            nameProduct:product.nameProduct || "",
            description:product.description || "",
            idCategory:product.idCategory || "",
            idSubCategory:product.idSubCategory || "",
            idMaterial:product.idMaterial || "",
            idGender:product.idGender || "",
            files:product.files || [],
            sizesList:product.sizesList || [],
            imageUrls:product.imageUrls || []
        });
    },[product]);
    useEffect(() => {
        setProduct((prev)=>({
            ...prev,
            ...selectedFiles
        }));
    }, [selectedFiles]);
    const [valueTab, setValueTab] = useState(0);

    const handleChangeTap = (event, newValue) => {
      setValueTab(newValue);
    };
    
    return(
        <>
            <Container>
                <TitlePage
                    title={t("create-new-product")}
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
                            (typeof selectedFiles.files === 'object' || product.imageUrls.length > 0)&& (
                                <ImagePreviewList
                                    files={selectedFiles?.files || []}
                                    imageUrls={product?.imageUrls || []}
                                    setSelectedFiles={setSelectedFiles}
                                    fileInputRef={fileInputRef}
                                />
                            )
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
                </Grid>
                <Grid mt={2} container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12} 
                        md={12} 
                        lg={12}
                        xl={12}
                    >
                        <AddSelectSize
                            setProduct={setProduct}
                            setListSelectetSize={setListSelectetSize}
                            listSelectetSize={listSelectetSize}
                        />
                        {
                            formik.touched.sizesList && Boolean(formik.errors.sizesList) && (
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    sx={{margin:2}}
                                >
                                    {formik.errors.sizesList}
                                </Alert>
                            )
                       }
                    </Grid>
                </Grid>
                <Grid container mt={2} mb={2}>
                    <Grid item xs={12}>
                            <LoadingButton
                                isLoading={loadingProducts}
                                click={formik.handleSubmit}
                                icon={<AddCircleIcon />}
                            >
                                {t('create')}
                            </LoadingButton>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default CreateProduct;