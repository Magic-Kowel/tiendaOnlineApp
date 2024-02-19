import { useState, useEffect  } from "react";
import { sizeTitleForm } from "../../../stylesConfig";
import { colors } from "../../../stylesConfig";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getSizes,
    createSizesVariation,
    getSizesVariation,
    sizeVariationValidate,
    cancelVariationValidate
} from "../../../reducers/size/size";
import Swal from 'sweetalert2';
import { getAgeGroups } from "../../../reducers/agegroup/agegroup";
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Alert
} from '@mui/material';
import TextFieldNumber from "../../../components/TextFieldNumber";
import FormAutocomplete from "../../../components/FormAutocomplete";
import * as Yup from 'yup';
import { useFormik } from 'formik';
function FormSizeVariation(){
    const dispatch = useDispatch();
    const {sizes,variationValidate} = useSelector((state)=>state.size);
    const {ageGroups} = useSelector((state)=>state.ageGroup);
    const [t] = useTranslation("global");
    const [sizeVariationForm, setSizeVariationForm] = useState({
        'idSize': '',
        'idAgeGroup': '',
        'minAge': '',
        'maxAge': '',
        'isChildren': false
    });
    const variationSchema = Yup.object().shape({
        idSize: Yup.string().required(t("this-field-is-required")),
        idAgeGroup: Yup.string().required(t("this-field-is-required")),
        variationValidate: Yup.boolean().isFalse(),
        minAge: Yup.lazy(() => {
            if (sizeVariationForm.isChildren) {
                return Yup.string().required(t("this-field-is-required"));
            }
            return Yup.string().notRequired();
        }),
        maxAge: Yup.lazy(() => {
            if (sizeVariationForm.isChildren) {
                return Yup.string().required(t("this-field-is-required"));
            }
            return Yup.string().notRequired();
        })
    });
    const handleSave = async ()=>{
        const { idSize, idAgeGroup, minAge, maxAge } = sizeVariationForm;
        if (
            idSize.trim() === "" ||
            idAgeGroup.trim() === "" ||
            (sizeVariationForm.isChildren && (!minAge.trim() || !maxAge.trim()))
        ) {
            Swal.fire({
                title: t("fill-in-all-fields"),
                icon: "error",
            });
            return false;
        }
    
        if (sizeVariationForm.isChildren && Number(minAge) > Number(maxAge)) {
            Swal.fire({
                title: t("minimum-age-cannot-be-higher-maximum-age"),
                icon: "error",
            });
            return false;
        }
        const response = await dispatch(createSizesVariation(sizeVariationForm));
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            dispatch(cancelVariationValidate());
            await handleGetAgeGroups();
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const formik = useFormik({
        initialValues: {
            idSize: sizeVariationForm.idSize,
            idAgeGroup: sizeVariationForm.idAgeGroup, // Corregido el nombre aquí
            minAge: sizeVariationForm.minAge,
            maxAge: sizeVariationForm.maxAge,
            variationValidate: Boolean(variationValidate),
        },
        validationSchema: variationSchema,
        onSubmit: handleSave,
    });
    useEffect(() => {
        formik.setValues({
            idSize: sizeVariationForm.idSize || "",
            idAgeGroup: sizeVariationForm.idAgeGroup || "", // Corregido el nombre aquí
            minAge: sizeVariationForm.minAge || "",
            maxAge: sizeVariationForm.maxAge || "",
            variationValidate:Boolean(variationValidate)
        });
    }, [sizeVariationForm,variationValidate]);
    const handleGetMinAge = (value) =>{
        setSizeVariationForm((prev)=>({
            ...prev,
            minAge:value.trim()
        }));
    }
    const handleGetMaxAge = (value) =>{
        setSizeVariationForm((prev)=>({
            ...prev,
            maxAge:value.trim()
        }));
    }
    const handleGetAgeGroups = async() =>{
        dispatch(getSizesVariation());
    }
    useEffect(()=>{
        dispatch(getSizes());
        dispatch(getAgeGroups());
    },[]);
    useEffect(()=>{
        console.log("variationValidate",variationValidate);
        if(Boolean(sizeVariationForm.idSize) && Boolean(sizeVariationForm.idAgeGroup)){
            dispatch(sizeVariationValidate({
                idSize:sizeVariationForm.idSize,
                idAgeGroup:sizeVariationForm.idAgeGroup
            }));
        }
    },[
        sizeVariationForm?.idAgeGroup,
        sizeVariationForm?.idSize
    ]);
    return(
        <>
            <Card
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <CardContent>
                        <Typography
                            sx={{
                                fontSize:sizeTitleForm,
                            }}
                            textAlign="center"
                            variant="h2"
                            gutterBottom
                        >
                            {t("create-size-clothes")}
                        </Typography>
                        <Grid
                            container 
                            spacing={2}
                        >   
                            <Grid item xs={12}>
                                <FormAutocomplete
                                    data={sizes}
                                    getData={(newValue) => 
                                        setSizeVariationForm((prevProduct) => 
                                        ({ ...prevProduct,
                                            idSize: newValue?.idSize
                                        })
                                    )}
                                    getOptionSearch={(item)=>item.nameSize}
                                    title={t("size-clothes")}
                                    error={formik.touched.idSize && Boolean(formik.errors.idSize)}
                                    helperText={formik.touched.idSize && formik.errors.idSize}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormAutocomplete
                                    data={ageGroups}
                                    getData={(newValue) =>
                                        setSizeVariationForm((prevProduct) => ({
                                            ...prevProduct,
                                            minAge: newValue?.name === "Niño" ? '' : prevProduct?.minAge,
                                            maxAge: newValue?.name === "Niño" ? '' : prevProduct?.maxAge,
                                            idAgeGroup: newValue?.idAgeGroup,
                                            isChildren: newValue?.name === "Niño"? true:false
                                        }))
                                    }
                                    getOptionSearch={(item)=>item.name}
                                    title={t("size-ranges-clothe")}
                                    error={formik.touched.idAgeGroup && Boolean(formik.errors.idAgeGroup)}
                                    helperText={formik.touched.idAgeGroup && formik.errors.idAgeGroup}
                                />
                            </Grid>
                                {
                                    sizeVariationForm.isChildren &&(
                                        <>
                                            <Grid item xs={12}>
                                                <TextFieldNumber
                                                    value={sizeVariationForm.minAge}
                                                    label={t("min-age")}
                                                    onChange={handleGetMinAge}
                                                    error={formik.touched.minAge && Boolean(formik.errors.minAge)}
                                                    helperText={formik.touched.minAge && formik.errors.minAge}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldNumber
                                                    value={sizeVariationForm.maxAge}
                                                    label={t("max-age")}
                                                    onChange={handleGetMaxAge}
                                                    error={formik.touched.maxAge && Boolean(formik.errors.maxAge)}
                                                    helperText={formik.touched.maxAge && formik.errors.maxAge}
                                                />
                                            </Grid>
                                        </>  
                                    )
                                }
                            {
                                Boolean(variationValidate)===true&&(
                                    <Grid item xs={12}>
                                        <Alert variant="filled" severity="error">
                                            {t("combination-already-exists")}
                                        </Alert>
                                    </Grid>
                                )
                            }
                        </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor:colors.primaryColor,
                            '&:hover':{
                                backgroundColor:colors.primaryColor
                            }
                        }}
                    >
                            {t("create")}
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}
export default FormSizeVariation;