import { useState,useEffect } from 'react';

import {
    Container,
    Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
import FormProduct from './FormProduct';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MainCard from '../../components/MainCard';
function CreateProduct(){
    const [t] = useTranslation("global");
    const [product,setProduct] = useState({
        nameProduct:"",
        description:"",
        idCategory:"",
        idSubCategory:"",
        idMaterial:"",
        idGender:""
    });
    const handleCreate = async ()  =>{
        console.log(product);
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
            idGender:product.idGende
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
            idGender:product.idGende || ""
        });
    },[product])

    useEffect(()=>{
        console.log(product);
    },[product])
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
                        md={7} 
                        lg={6}
                        xl={6}
                    >
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
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
                <button onClick={formik.handleSubmit}>crear </button>
            </Container>
        </>
    );
}
export default CreateProduct;