import { useEffect, useState } from "react";
import MainCard from "../../components/MainCard"
import { Grid,Button } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { getSizesVariationDisplay } from "../../reducers/size/size";
import FormAutocomplete from "../../components/FormAutocomplete";
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DataTable from "../../components/DataTable/DataTable";
import { colors } from "../../stylesConfig";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
function AddSelectSize(){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const {sizeVariation} = useSelector((state)=>state.size);
    const [size,setSize] = useState(null);
    const [sizes,setSizes] = useState([])
    const [listSelectetSize,setListSelectetSize] = useState([]);
    useEffect(()=>{
        dispatch(getSizesVariationDisplay())
    },[])
    useEffect(() => {
        if (listSelectetSize.length) {
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
        t("delete")
    ];
    const handleAddSizeList = ()=>{
        if(size){
            setListSelectetSize(prevList => [...prevList, size]);
            setSize(null);
            formik.resetForm();
        }
    }
    const handleRemoveSizeList = (idSizeVariation) =>{
        const newArray = listSelectetSize.filter(item => item.idSizeVariation !== idSizeVariation);
        setListSelectetSize(newArray);
        const elementoEspecifico = sizeVariation.find(obj => obj.idSizeVariation === idSizeVariation);
        if (elementoEspecifico) {
          setSizes(prevSizes => [...prevSizes, elementoEspecifico]);
        }
        setSize(null);
    }
    const selectSizeSchema = Yup.object().shape({
        sizeVariation: Yup.string().required(t("this-field-is-required"))
    });
    const formik = useFormik({
        initialValues: {
          sizeVariation: size,
        },
        validationSchema: selectSizeSchema,
        onSubmit: handleAddSizeList
    });

    useEffect(() => {
        formik.setValues({
            sizeVariation: size?.idSizeVariation,
        });
    }, [size]);

    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idSizeVariation) => handleRemoveSizeList(idSizeVariation),
            icon: <DeleteIcon />,
            color:"error"
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
                    <Grid item xs={4}>
                        <Button
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
                    <Grid item xs={8}>
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
                </Grid>
                <Grid item xs={12}>
                    <DataTable
                        listTitles={listTitles}
                        listKeys={["nameSize","ageGroup"]}
                        dataList={listSelectetSize}
                        listButtons={listButtons}
                        id="idSizeVariation"
                    />
                </Grid>
            </Grid>
        </MainCard>
    </>)
}
export default AddSelectSize