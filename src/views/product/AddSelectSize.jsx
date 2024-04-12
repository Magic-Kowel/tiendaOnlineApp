import { useEffect, useState } from "react";
import MainCard from "../../components/MainCard"
import { 
    Grid,
    Button,
    useMediaQuery,
    useTheme,
    FormHelperText
} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { getSizesVariationDisplay } from "../../reducers/size/size";
import FormAutocomplete from "../../components/FormAutocomplete";
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DataTable from "../../components/DataTable/DataTable";
import StackTable from "../../components/DataTable/StackTable";
import { colors } from "../../stylesConfig";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import TextFieldNumber from "../../components/TextFieldNumber"
import PropTypes from 'prop-types';
function AddSelectSize({
    setProduct,
    setListSelectetSize,
    listSelectetSize,
}){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const {sizeVariation} = useSelector((state)=>state.size);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [size,setSize] = useState(null);
    const [sizes,setSizes] = useState([])
     const [productVariation,setProductVariation] = useState({
        stock:"0",
        price:"0"
    });
    useEffect(()=>{
        dispatch(getSizesVariationDisplay())
    },[])
    useEffect(() => {
        if (listSelectetSize?.length) {
            const newArray = sizes.filter(obj1 => !listSelectetSize.some(obj2 => obj2.idSizeVariation === obj1.idSizeVariation));
            setSizes(newArray);
        }
    }, [listSelectetSize]);
    useEffect(()=>{
        setSizes(sizeVariation);
    },[sizeVariation]);
    useEffect(()=>{
        if (listSelectetSize) {
            const newArray = sizes.filter(obj1 => !listSelectetSize.some(obj2 => obj2.idSizeVariation === obj1.idSizeVariation));
            setSizes(newArray);
        }
    },[listSelectetSize]);
    const listTitles=[
        t("size-categories-clothe"),
        t("size-ranges-clothe"),
        t("price"),
        t("stock"),
        t("main"),
        t("actions")
    ];
    const handleAddSizeList = ()=>{
        if(size){
            setListSelectetSize(prevList => [...prevList, {...size ,...productVariation}]);
            setSize(null);
            setProduct((prev)=>({
                ...prev,
                sizesList: [
                ...prev.sizesList,
                {
                    idSizeVariation:size.idSizeVariation,
                    price:productVariation.price,
                    stock:productVariation.stock
                }]
            }))
            formik.resetForm();
        }
    }
    const handleRemoveSizeList = (idSizeVariation) =>{
        const newArray = listSelectetSize.filter(item => item.idSizeVariation !== idSizeVariation);
        setListSelectetSize(newArray);
        const elementoEspecifico = sizeVariation.find(obj => obj.idSizeVariation === idSizeVariation);
        if (elementoEspecifico) {
            setSizes(prevSizes => [
                ...prevSizes,
                elementoEspecifico
            ]);
        }
        setSize(null);
    }
    const handleMainSize = (idSizeVariation) =>{
        console.log(idSizeVariation);
        setProduct((prev)=>({
            ...prev,
            sizesList: [
            ...prev.sizesList.map((size)=>({
                ...size,
                isMain: size?.idSizeVariation === idSizeVariation ? true : false
            }))]
        }))
        const updatedSizes = listSelectetSize.map(item => ({
            ...item,
            textMain: item?.idSizeVariation === idSizeVariation ? "si" : "no",
            isMain: item?.idSizeVariation === idSizeVariation ? true : false
        }));

       
        setListSelectetSize(updatedSizes);
        console.log("updatedSizes",updatedSizes);
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

    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idSizeVariation) => handleRemoveSizeList(idSizeVariation),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("main"),
            onClick: (idSizeVariation) => handleMainSize(idSizeVariation),
            icon: <StarIcon />,
            color:"warning"
        }
    ];
    return(<>
        <MainCard>
            <Grid container spacing={2}>
                <Grid
                    container 
                    item 
                    spacing={2}
                >
                    <Grid item xs={6}>
                        <TextFieldNumber
                            label={t('price')}
                            value={productVariation.price}
                            onChange={(value)=>{
                                setProductVariation((prev)=>({
                                    ...prev,
                                    price:(value)
                                }))
                            }}
                            limit={6}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <FormHelperText>{String(productVariation.price).length}/6</FormHelperText>   
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldNumber
                            label={t('stock')}
                            value={productVariation.stock}
                            onChange={(value)=>{
                                setProductVariation((prev)=>({
                                    ...prev,
                                    stock:(value)
                                }))
                            }}
                            limit={6}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                        <FormHelperText>{String(productVariation.stock).length}/6</FormHelperText>
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
                            error={formik.touched.sizeVariation && Boolean(formik.errors.sizeVariation)}
                            helperText={formik.touched.sizeVariation && formik.errors.sizeVariation}
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
                 
                    <Grid item xs={12}>
                        {!isMobile ? (
                            <DataTable
                                listTitles={listTitles}
                                listKeys={["nameSize","ageGroup","price","stock","textMain"]}
                                dataList={listSelectetSize}
                                listButtons={listButtons}
                                id="idSizeVariation"
                            />
                        ) : (
                            <StackTable 
                                listTitles={listTitles}
                                listKeys={["nameSize","ageGroup","price","stock","textMain"]}
                                dataList={listSelectetSize}
                                listButtons={listButtons}
                                id="idSizeVariation"
                            />
                        )}
                    </Grid>
               
            </Grid>
        </MainCard>
    </>)
}
AddSelectSize.propTypes = {
    setProduct: PropTypes.func.isRequired,
    setListSelectetSize: PropTypes.func.isRequired,
    listSelectetSize:PropTypes.array.isRequired
};
export default AddSelectSize