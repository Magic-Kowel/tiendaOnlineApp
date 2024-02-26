import { useState,useEffect } from 'react';
import {
    Container,
    Grid,
    Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
import FormProduct from './FormProduct';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import MainCard from '../../components/MainCard';
import AddSelectSize from './AddSelectSize';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { colors } from '../../stylesConfig';
import { createProduct } from '../../reducers/product/product';
import { useDispatch } from 'react-redux';
import UploadFile from '../../components/UploadFile';
function CreateProduct(){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const [product,setProduct] = useState({
        nameProduct:"",
        description:"",
        idCategory:"",
        idSubCategory:"",
        idMaterial:"",
        idGender:"",
        sizesList:[]
    });
    const handleCreate = async ()  =>{
        console.log(product);
        const response = await dispatch(createProduct(product));
        if(response.payload.created){
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
    const createProductSchema = Yup.object().shape({
        nameProduct:Yup.string().required(t("this-field-is-required")),
        description:Yup.string().required(t("this-field-is-required")),
        idCategory:Yup.string().required(t("this-field-is-required")),
        idSubCategory:Yup.string().required(t("this-field-is-required")),
        idMaterial:Yup.string().required(t("this-field-is-required")),
        idGender:Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
            nameProduct:product.nameProduct,
            description:product.description,
            idCategory:product.idCategory,
            idSubCategory:product.idSubCategory,
            idMaterial:product.idMaterial,
            idGender:product.idGender
        },
        validationSchema: createProductSchema, 
        onSubmit: handleCreate,
    });
    useEffect(()=>{
        console.log("product",product);
        formik.setValues({
            nameProduct:product.nameProduct || "",
            description:product.description || "",
            idCategory:product.idCategory || "",
            idSubCategory:product.idSubCategory || "",
            idMaterial:product.idMaterial || "",
            idGender:product.idGender || ""
        });
    },[product]);

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
                       <UploadFile />
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
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={formik.handleSubmit}
                            endIcon={<AddCircleIcon />}
                            size="large"
                            sx={{
                                backgroundColor:colors.primaryColor,
                                '&:hover':{
                                    backgroundColor:colors.primaryColor
                                }
                            }}
                        >
                            {t('create')}
                        </Button>
                </Grid>
            </Container>
        </>
    );
}
export default CreateProduct;