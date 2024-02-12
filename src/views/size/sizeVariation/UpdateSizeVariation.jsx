import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../../../components/goBack';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../stylesConfig';
import { useDispatch, useSelector } from 'react-redux';
import TitlePage from '../../../components/TitlePage';
import TextFieldNumber from "../../../components/TextFieldNumber";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import { getAgeGroups } from "../../../reducers/agegroup/agegroup";
import { getSizes,getSizeVariation,updateSizeVariation } from "../../../reducers/size/size";
import Swal from 'sweetalert2';
import {
    Container,
    Card,
    CardContent,
    Grid,
    CardActions,
    Button
} from '@mui/material';
function UpdateSizeVariation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {sizes, sizeVariation} = useSelector((state)=>state.size);
    const {ageGroups} = useSelector((state)=>state.ageGroup);
    const [t]=useTranslation("global");
    const [size,setSize] = useState([]);
    const [ageGroup,setAgeGroup] = useState([]);
    const [isChildren,setIsChildren]=useState(false);
    const { idSizeVariation } = params;
    const [sizeVariationForm,setSizeVariationForm]=useState({
        'idSizeVariation':'',
        'idSize':'',
        'idAgeGroup':'',
        'ageGroup':'',
        'minAge':'',
        'maxAge':'',
    });
    const handleGetMinAge = (value) =>{
        setSizeVariationForm((prev)=>({
            ...prev,
            minAge:String(value.trim())
        }));
    }
    const handleGetMaxAge = (value) =>{
        setSizeVariationForm((prev)=>({
            ...prev,
            maxAge:value.trim()
        }));
    }
    const handleGetSizeVariation = async () =>{
        await dispatch(getSizeVariation(idSizeVariation));
    }
    useEffect(() => {
        if (sizeVariation && sizeVariation.length > 0) {
            const firstSizeVariation = sizeVariation[0];
            setSizeVariationForm({
                idSizeVariation:idSizeVariation,
                idSize: firstSizeVariation.idSize || '',
                idAgeGroup: firstSizeVariation.idAgeGroup || '',
                ageGroup: firstSizeVariation.ageGroup || '',
                minAge: String(firstSizeVariation.minAge) || '',
                maxAge: String(firstSizeVariation.maxAge) || '',
            });
        }
    }, [sizeVariation]);
    useEffect(()=>{
        handleGetSizeVariation();
        dispatch(getSizes());
        dispatch(getAgeGroups());
    },[]);
    useEffect(()=>{
        if(ageGroup?.name==="Niño"){
            setIsChildren(true)
            return;
        }else{
            setIsChildren(false)
        }
        setSizeVariationForm((prevState) => ({
            ...prevState,
            idAgeGroup: ageGroup?.idAgeGroup || ""
        }));
    },[ageGroup]);
    useEffect(() => {
        if (sizes.length > 0 && sizeVariationForm) {
            setSize(sizes.find((item) => item?.idSize === sizeVariationForm?.idSize));
        }
    }, [sizes,sizeVariationForm]);
    useEffect(() => {
        if (ageGroups.length > 0 && sizeVariationForm) {
            setAgeGroup(ageGroups.find((item) => item?.idAgeGroup === sizeVariationForm?.idAgeGroup));
        }
    }, [ageGroups,sizeVariationForm]);
    const handleUpdateSizeVariation = async(e)=>{
        e.preventDefault();
        if (
            sizeVariationForm.idSize.trim() === "" ||
            sizeVariationForm.idAgeGroup.trim() === "" ||
            (isChildren && (!sizeVariationForm.minAge.trim() || !sizeVariationForm.maxAge.trim()))
        ) {
            Swal.fire({
                title: t("fill-in-all-fields"),
                icon: "error",
            });
            return false;
        }
    
        if (isChildren && Number(sizeVariationForm.minAge) > Number(sizeVariationForm.maxAge)) {
            Swal.fire({
                title: t("minimum-age-cannot-be-higher-maximum-age"),
                icon: "error",
            });
            return false;
        }
        const response = await dispatch(updateSizeVariation(sizeVariationForm));
        console.log("hola",response);
        if(response.payload.updated){
            Swal.fire({
                title:t("successfully-updated"),
                icon:'success',
                timer: 1500
            });
            navigate(-1);
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    return(
        <>
            <Container>
                <TitlePage
                    title={t("edit-size-categorie-clothe")}
                />
                <Card
                    component="form"
                    onSubmit={handleUpdateSizeVariation}
                >
                    <CardContent>
                            <GoBack />
                            <Grid
                                container 
                                spacing={2}
                                mt={2}
                            >   
                                <Grid item xs={12}>
                                    <SearchAutoComplete
                                        valueDefault={size?size:[]}
                                        data={sizes}
                                        getData={setSizeVariationForm}
                                        itemKey="idSize"
                                        itemKeyForId="idSize"
                                        getOptionSearch={(item)=>item?.nameSize  || ""}
                                        title={t("size-clothes")}
                                        isForm={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <SearchAutoComplete
                                        valueDefault={ageGroup?ageGroup:[]}
                                        data={ageGroups}
                                        getData={setSizeVariationForm}
                                        itemKey="idAgeGroup"
                                        itemKeyForId="idAgeGroup"
                                        getOptionSearch={(item)=>item.name || ""}
                                        title={t("size-ranges-clothe")}
                                        isForm={true}
                                    />
                                </Grid>
                                
                                {isChildren&&(
                                    <>
                                        <Grid item xs={12}>
                                            <TextFieldNumber
                                                value={sizeVariationForm?.minAge}
                                                label={t("min-age")}
                                                onChange={handleGetMinAge}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextFieldNumber
                                                value={sizeVariationForm?.maxAge}
                                                label={t("max-age")}
                                                onChange={handleGetMaxAge}
                                            />
                                        </Grid>
                                    </>
                                )}
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