import {
    Grid,
    TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormAutocomplete from '../../components/FormAutocomplete';
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import { getCategories } from '../../reducers/category/category';
import { getSubcategories } from '../../reducers/subCategory/subCategory';
import { getMaterials } from '../../reducers/material/material';
import { getGenders } from '../../reducers/gender/gender';
import PropTypes from 'prop-types';
function FormProduct({
    setProduct,
    product,
    formik
}){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const {categorys} = useSelector((state)=>state.category);
    const {subcategories} = useSelector((state)=>state.subcategory);
    const {materials} = useSelector((state)=>state.material);
    const {genders} = useSelector((state)=>state.gender);
    const [materialDefault,setMaterialDefault] = useState(null);
    const [gendersDefault,setGenderslDefault] = useState(null);
    const [subcategoriesDefault,seSubcategoriesDefault] = useState(null);
    const [categorysDefault,setCategorysDefault] = useState(null)
    useEffect(()=>{
        dispatch(getCategories());
        dispatch(getMaterials());
        dispatch(getGenders());
    },[]);
    useEffect(()=>{
        if(product?.idCategory){
            dispatch(getSubcategories(product.idCategory));
        }
    },[product.idCategory]);
    useEffect(()=>{
        if(!subcategories.length){
            console.log("se elimino");
            setProduct((prev)=>({
                ...prev,
                idSubCategory:""
            }));
        }
    },[subcategories]);
    useEffect(()=>{
        setMaterialDefault(()=>materials.find((item)=>item?.idMaterial === product?.idMaterial) || null)
    },[product]);
    useEffect(()=>{
        setGenderslDefault(()=>genders.find((item)=>item?.idGender === product?.idGender) || null)
    },[product]);
    useEffect(()=>{
        setCategorysDefault(()=>categorys.find((item)=>item?.ecodCategoria === product?.idCategory) || null)
    },[categorys,product]);
    useEffect(()=>{
        seSubcategoriesDefault(()=>subcategories.find((item)=>item?.ecodsubcategoria === product?.idSubCategory) || null)
    },[subcategories,product]);
    return(
        <Grid 
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container 
            spacing={2}
        >
            <Grid item 
            sm={12} 
            xs={12} 
            md={12}
            lg={12}
            >
                <TextField
                    value={product.nameProduct}
                    onChange={(e) => {
                        setProduct((prev) => ({
                            ...prev,
                            nameProduct: e.target.value
                        }));
                    }}
                    fullWidth
                    error={formik.touched.nameProduct && Boolean(formik.errors.nameProduct)}
                    helperText={formik.touched.nameProduct && formik.errors.nameProduct}
                    label={t('name')}
                    variant="outlined"
                />
            </Grid>
            <Grid item
                xs={12}
                sm={12}
                md={12}
                lg={12}
            >
                <TextField
                    value={product.description}
                    rows={5}
                    multiline
                    onChange={(e) => {
                        setProduct((prev) => ({
                            ...prev,
                            description: e.target.value
                        }));
                    }}
                    fullWidth
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    label={t('description')}
                    variant="outlined"
                />
            </Grid>
            <Grid 
                item 
                xs={12}
                sm={12}
                md={12}
                lg={12}
            >
                <FormAutocomplete
                    valueDefault={categorysDefault}
                    data={categorys}
                    getOptionSearch={(option) => option.tNombre}
                    title={t('search-category')}
                    getData={(newValue) => 
                        setProduct((prevProduct) => 
                        ({ ...prevProduct,
                            idCategory: newValue?.ecodCategoria
                        })
                    )}
                    error={formik.touched.idCategory && Boolean(formik.errors.idCategory)}
                    helperText={formik.touched.idCategory && formik.errors.idCategory}
                />
{/* 
                <FormAutocomplete
                    valueDefault={materialDefault}
                    data={materials}
                    getOptionSearch={(option) => option.nameMaterial}
                    title={t('search-material')}
                    getData={(newValue) => 
                        setProduct((prevProduct) => 
                        ({ ...prevProduct,
                            idMaterial: newValue?.idMaterial
                        })
                    )}
                    error={formik.touched.idMaterial && Boolean(formik.errors.idMaterial)}
                    helperText={formik.touched.idMaterial && formik.errors.idMaterial}
                /> */}
            </Grid>
            <Grid 
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
            >
                <FormAutocomplete
                    valueDefault={subcategoriesDefault}
                    data={subcategories}
                    getOptionSearch={(option) => option.tNombre}
                    title={t('search-subcategory')}
                    getData={(newValue) => 
                        setProduct((prevProduct) => 
                        ({ ...prevProduct,
                            idSubCategory: newValue?.ecodsubcategoria
                        })
                    )}
                    error={formik.touched.idSubCategory && Boolean(formik.errors.idSubCategory)}
                    helperText={formik.touched.idSubCategory && formik.errors.idSubCategory}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
            >
                <FormAutocomplete
                    valueDefault={materialDefault}
                    data={materials}
                    getOptionSearch={(option) => option.nameMaterial}
                    title={t('search-material')}
                    getData={(newValue) => 
                        setProduct((prevProduct) => 
                        ({ ...prevProduct,
                            idMaterial: newValue?.idMaterial
                        })
                    )}
                    error={formik.touched.idMaterial && Boolean(formik.errors.idMaterial)}
                    helperText={formik.touched.idMaterial && formik.errors.idMaterial}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
            >
                <FormAutocomplete
                    valueDefault={gendersDefault}
                    data={genders}
                    getOptionSearch={(option) => option.nameGender}
                    title={t('search-gender')}
                    getData={(newValue) => 
                        setProduct((prevProduct) => 
                        ({ ...prevProduct,
                            idGender: newValue?.idGender
                        })
                    )}
                    error={formik.touched.idGender && Boolean(formik.errors.idGender)}
                    helperText={formik.touched.idGender && formik.errors.idGender}
                />
            </Grid>
        </Grid>
    )
}
FormProduct.propTypes = {
    setProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    formik: PropTypes.object.isRequired
};
export default FormProduct;