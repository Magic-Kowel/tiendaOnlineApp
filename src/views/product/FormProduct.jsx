import {
    Grid,
    TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormAutocomplete from '../../components/FormAutocomplete';
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from 'react';

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
    return(
        <Grid 
            item 
            container 
            spacing={2}
        >
            <Grid item sm={12} sx={12}>
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
            <Grid item sm={12} sx={12}>
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
            <Grid item sm={12} sx={12}>
                <FormAutocomplete
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
            </Grid>
            {
                !!subcategories.length &&(
                    <Grid item sm={12} sx={12}>
                        <FormAutocomplete
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
                )
            }
            <Grid item sm={12} sx={12}>
                <FormAutocomplete
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
            <Grid item sm={12} sx={12}>
                <FormAutocomplete
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