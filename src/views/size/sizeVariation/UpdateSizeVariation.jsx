import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../../../components/goBack';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import TitlePage from '../../../components/TitlePage';
import TextFieldNumber from "../../../components/TextFieldNumber";
import { getAgeGroups } from "../../../reducers/agegroup/agegroup";
import {
    getSizes,
    getSizeVariation,
    updateSizeVariation,
    sizeVariationValidate,
    cancelVariationValidate
} from "../../../reducers/size/size";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Container,
    Card,
    CardContent,
    Grid,
    CardActions,
    Button,
    Alert,
    FormHelperText
} from '@mui/material';
import FormAutocomplete from "../../../components/FormAutocomplete";
function UpdateSizeVariation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {sizes, sizeVariation,variationValidate} = useSelector((state)=>state.size);
    const {ageGroups} = useSelector((state)=>state.ageGroup);
    const [t]=useTranslation("global");
    const [size,setSize] = useState(null);
    const [ageGroup,setAgeGroup] = useState(null);
    // const [isChildren,setIsChildren]=useState(false);
    const { idSizeVariation } = params;
    const [sizeVariationForm,setSizeVariationForm]=useState({
        'idSizeVariation':idSizeVariation,
        'idSize':'',
        'idAgeGroup':'',
        'ageGroup':'',
        'minAge':'',
        'maxAge':'',
        'size':'',
        'isChildren': false
    });
    useEffect(()=>{
        if(sizes.length===0){
            dispatch(getSizes());
        }
        if(ageGroups.length===0){
            dispatch(getAgeGroups());
        }
    },[]);
    useEffect(()=>{
        dispatch(getSizeVariation(idSizeVariation));
    },[]);
    useEffect(()=>{
        if(Boolean(sizeVariation[0])===true){
            setSize({
                idSize:sizeVariation[0].idSize,
                nameSize:sizeVariation[0].nameSize
            });
            setAgeGroup({
                idAgeGroup:sizeVariation[0].idAgeGroup,
                name:sizeVariation[0].ageGroup
            });
            setSizeVariationForm((prev)=>({
                ...prev,
                idSize:sizeVariation[0].idSize,
                idAgeGroup:sizeVariation[0].idAgeGroup
            }));
            setSizeVariationForm((prev)=>({
               ...prev,
                isChildren:sizeVariation[0].ageGroup === "Infantil" ? true : false,
                minAge:sizeVariation[0]?.minAge,
                maxAge:sizeVariation[0]?.maxAge,
                size:sizeVariation[0]?.size,
            }));
            console.log(sizeVariation);
        }
    },[sizeVariation]);
    useEffect(() => {
        setSize(() => {
            const display = sizes.find((item) => item.idSize === sizeVariationForm?.idSize);
            return display ? { ...display } : null;
        });
        setAgeGroup(() => {
            const display = ageGroups.find((item) => item.idAgeGroup === sizeVariationForm?.idAgeGroup);
            return display ? { ...display } :  null;
        });
    }, [sizeVariationForm]);
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
    const handleGetsize = (value) =>{
        setSizeVariationForm((prev)=>({
            ...prev,
            size:value.trim()
        }));
    }
    const handleUpdate = async () => {
        if (variationValidate) {
            return;
        }
        console.log(sizeVariationForm);
        let response;

        if (sizeVariationForm.isChildren) {
            response = await dispatch(updateSizeVariation({ ...sizeVariationForm, size: null }));
        } else {
            response = await dispatch(updateSizeVariation({ ...sizeVariationForm, minAge: null, maxAge: null }));
        }
        if (response.payload && response.payload.updated) {
            Swal.fire({
                title: t("successfully-created"),
                icon: 'success',
                timer: 1500
            });
            await dispatch(cancelVariationValidate());
            navigate(-1);
        }  else {
            Swal.fire({
                title: t("something-went-wrong"),
                icon: "error"
            });
        }
    };
    const variationSchema = Yup.object().shape({
        idSize: Yup.string().required(t("this-field-is-required")),
        idAgeGroup: Yup.string().required(t("this-field-is-required")),
        // variationValidate: Yup.boolean().isFalse(),
        minAge: Yup.lazy(() => {
            if (sizeVariationForm.isChildren) {
                return Yup.string()
                .required(t("this-field-is-required"))
                .test('minAge',t( 'minimum-age-cannot-be-higher-maximum-age'), function (minAge) {
                    const maxAge = this.parent.maxAge;
                    return !maxAge || (minAge && parseInt(minAge, 10) <= parseInt(maxAge, 10));
                });
            }
            return Yup.string().notRequired();
        }),
        maxAge: Yup.lazy(() => {
            if (sizeVariationForm.isChildren) {
                return Yup.string()
                .required(t("this-field-is-required"))
                .test('maxAge', t('max-age-must-be-greater-than-min-age'), function (maxAge) {
                    const minAge = this.parent.minAge;
                    return !minAge || (maxAge && parseInt(maxAge, 10) >= parseInt(minAge, 10));
                });
            }
            return Yup.string().notRequired();
        }),
        size:Yup.lazy(() => {
            if (!sizeVariationForm.isChildren) {
                return Yup.string()
                .required(t("this-field-is-required"))
            }
            return Yup.string().notRequired();
        }),
      });
    const formik = useFormik({
        initialValues: {
            idSize: sizeVariationForm.idSize,
            idAgeGroup: sizeVariationForm.idAgeGroup, // Corregido el nombre aquí
            minAge: sizeVariationForm.minAge,
            maxAge: sizeVariationForm.maxAge,
            size: sizeVariationForm.size,
            // variationValidate:variationValidate,
        },
        validationSchema: variationSchema,
        onSubmit: handleUpdate,
    });
    useEffect(() => {
        formik.setValues({
            idSize: sizeVariationForm.idSize || "",
            idAgeGroup: sizeVariationForm.idAgeGroup || "", // Corregido el nombre aquí
            minAge: sizeVariationForm.minAge || "",
            maxAge: sizeVariationForm.maxAge || "",
            size: sizeVariationForm.size || "",
            // variationValidate: variationValidate 
        });
    }, [sizeVariationForm]);
    useEffect(()=>{
        if (sizeVariationForm.isChildren) {
            setSizeVariationForm((prev)=>({
                ...prev,
                size:''
            }));
        }else{
            setSizeVariationForm((prev)=>({
                ...prev,
                minAge: '',
                maxAge: '',
            }));
        }
    },[
        sizeVariationForm.isChildren
    ]);
    useEffect(()=>{
        if(sizeVariation[0]?.idSize === size?.idSize && sizeVariation[0]?.idAgeGroup === ageGroup?.idAgeGroup){
            dispatch(cancelVariationValidate());
            return;
        }
        if(Boolean(size?.idSize) && Boolean(ageGroup?.idAgeGroup)){
            dispatch(sizeVariationValidate({
                idSize:size.idSize,
                idAgeGroup:ageGroup.idAgeGroup
            }));
        }
      
    },[
        size,
        ageGroup
    ]);
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-size-categorie-clothe")}
                />
                <Card
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <CardContent>
                            <GoBack />
                            <Grid
                                container 
                                spacing={2}
                                mt={2}
                            >   
                                <Grid item xs={12}>
                                    <FormAutocomplete
                                        valueDefault={size}
                                        data={sizes}
                                        getOptionSearch={(item)=>item?.nameSize  || ""}
                                        getData={(newValue) => 
                                            setSizeVariationForm((prev) => 
                                            ({ ...prev,
                                                idSize: newValue?.idSize
                                            })
                                        )}
                                        title={t("size-clothes")}
                                        getOptionSelected={(option, value) => option.idSize === value.idSize}
                                        isOptionEqualToValue={(option, value) => option.idSize === value.idSize}
                                        error={formik.touched.idSize && Boolean(formik.errors.idSize)}
                                        helperText={formik.touched.idSize && formik.errors.idSize}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormAutocomplete
                                        valueDefault={ageGroup}
                                        data={ageGroups}
                                        getOptionSearch={(item)=>item?.name  || ""}
                                        getData={(newValue) =>
                                            setSizeVariationForm((prev) => ({
                                                ...prev,
                                                // minAge: newValue?.name === "Infantil" ? '' : prev?.minAge,
                                                // maxAge: newValue?.name === "Infantil" ? '' : prev?.maxAge,
                                                // size: !newValue?.name === "Infantil" ? '' : prev?.size,
                                                idAgeGroup: newValue?.idAgeGroup,
                                                isChildren: newValue?.name === "Infantil"? true:false
                                            }))
                                        }
                                        itemKey="idAgeGroup"
                                        itemKeyForId="idAgeGroup"
                                        title={t("size-ranges-clothe")}
                                        getOptionSelected={(option, value) => option.idAgeGroup === value.idAgeGroup}
                                        isOptionEqualToValue={(option, value) => option.idAgeGroup === value.idAgeGroup}
                                        error={formik.touched.idAgeGroup && Boolean(formik.errors.idAgeGroup)}
                                        helperText={formik.touched.idAgeGroup && formik.errors.idAgeGroup}
                                    />
                                </Grid>
                                {
                                    variationValidate &&(
                                        <Grid item xs={12}>
                                            <Alert variant="filled" severity="error">
                                                {t("combination-already-exists")}
                                            </Alert>
                                        </Grid>
                                    )
                                }
                                {
                                    sizeVariationForm.isChildren ===true &&(
                                        <>
                                            <Grid item xs={12}>
                                                <TextFieldNumber
                                                    value={String(sizeVariationForm?.minAge || "")}
                                                    label={t("min-age")}
                                                    onChange={handleGetMinAge}
                                                    error={formik.touched.minAge && Boolean(formik.errors.minAge)}
                                                    helperText={formik.touched.minAge && formik.errors.minAge}
                                                    limit={2}
                                                />
                                                <FormHelperText>{sizeVariationForm.minAge !== null ? String(sizeVariationForm.minAge).length : 0}/2</FormHelperText>   
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldNumber
                                                    value={sizeVariationForm?.maxAge !== null ? String(sizeVariationForm?.maxAge) : ""}
                                                    label={t("max-age")}
                                                    onChange={handleGetMaxAge}
                                                    error={formik.touched.maxAge && Boolean(formik.errors.maxAge)}
                                                    helperText={formik.touched.maxAge && formik.errors.maxAge}
                                                    limit={2}
                                                />
                                                <FormHelperText>{sizeVariationForm.maxAge !== null ? String(sizeVariationForm.maxAge).length : 0}/2</FormHelperText>                                            </Grid>
                                        </>
                                    )
                                }
                                {
                                    sizeVariationForm.isChildren === false &&(
                                        <>
                                            <Grid item xs={12}>
                                                <TextFieldNumber
                                                    value={sizeVariationForm?.size || ""}
                                                    label={t("size-clothe")}
                                                    onChange={handleGetsize}
                                                    error={formik.touched.size && Boolean(formik.errors.size)}
                                                    helperText={formik.touched.size && formik.errors.size}
                                                    limit={2}
                                                />
                                                <FormHelperText>{sizeVariationForm.size !== null ? String(sizeVariationForm.size).length : 0}/2</FormHelperText> 
                                            </Grid>
                                        </>
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
                                {t("edit")}
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}
export default UpdateSizeVariation;