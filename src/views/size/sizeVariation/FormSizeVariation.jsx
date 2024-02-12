import { useState, useEffect } from "react";
import { sizeTitleForm } from "../../../stylesConfig";
import { colors } from "../../../stylesConfig";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSizes,createSizesVariation } from "../../../reducers/size/size";
import Swal from 'sweetalert2';
import { getAgeGroups } from "../../../reducers/agegroup/agegroup";
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography
} from '@mui/material';
import TextFieldNumber from "../../../components/TextFieldNumber";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
function FormSizeVariation(){
    const dispatch = useDispatch();
    const {sizes,getSizesVariation} = useSelector((state)=>state.size);
    const {ageGroups} = useSelector((state)=>state.ageGroup);
    const [t] = useTranslation("global");
    const [size,setSize] = useState([]);
    const [ageGroup,setAgeGroup] = useState([]);
    const [isChildren,setIsChildren]=useState(false);
    const [sizeVariation,SetSizeVariation]=useState({
        'idSize':'',
        'idAgeGroup':'',
        'minAge':'',
        'maxAge':'',
    });
    const handleGetMinAge = (value) =>{
        SetSizeVariation((prev)=>({
            ...prev,
            minAge:value.trim()
        }));
    }
    const handleGetMaxAge = (value) =>{
        SetSizeVariation((prev)=>({
            ...prev,
            maxAge:value.trim()
        }));
    }
    useEffect(()=>{
        SetSizeVariation((prevState) => ({
            ...prevState,
            idSize: size[0]?.idSize || ""
        }));
    },[size]);
    useEffect(()=>{
        if(ageGroup[0]?.name==="Niño"){
            setIsChildren(true)
            SetSizeVariation((prev)=>({
                ...prev,
                idAgeGroup: ageGroup[0]?.idAgeGroup || "",
                minAge:'',
                maxAge:''
            }));
            return;
        }else{
            setIsChildren(false)
        }
        console.log("ageGroup",ageGroup);
        SetSizeVariation((prevState) => ({
            ...prevState,
            idAgeGroup: ageGroup[0]?.idAgeGroup || ""
        }));
    },[ageGroup]);
    const handleGetAgeGroups = async() =>{
        dispatch(getSizesVariation());
    }
    useEffect(()=>{
        dispatch(getSizes());
        dispatch(getAgeGroups());
        handleGetAgeGroups();
    },[]);
 
    const handleSave = async (event)=>{
        event.preventDefault();
        console.log(sizeVariation);
        const { idSize, idAgeGroup, minAge, maxAge } = sizeVariation;
        console.log(sizeVariation);
        if (
            idSize.trim() === "" ||
            idAgeGroup.trim() === "" ||
            (isChildren && (!minAge.trim() || !maxAge.trim()))
        ) {
            Swal.fire({
                title: t("fill-in-all-fields"),
                icon: "error",
            });
            return false;
        }
    
        if (isChildren && Number(minAge) > Number(maxAge)) {
            Swal.fire({
                title: t("minimum-age-cannot-be-higher-maximum-age"),
                icon: "error",
            });
            return false;
        }
        const response = await dispatch(createSizesVariation(sizeVariation));
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            await handleGetAgeGroups();
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });

    }
    return(
        <>
            <Card
                component="form"
                onSubmit={handleSave}
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
                                <SearchAutoComplete
                                    data={sizes}
                                    getData={setSize}
                                    getOptionSearch={(item)=>item.nameSize}
                                    title={t("size-clothes")}
                                    isForm={true}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SearchAutoComplete
                                    data={ageGroups}
                                    getData={setAgeGroup}
                                    getOptionSearch={(item)=>item.name}
                                    title={t("size-ranges-clothe")}
                                    isForm={true}
                                />
                            </Grid>
                            {isChildren&&(
                                <>
                                    <Grid item xs={12}>
                                        <TextFieldNumber
                                            value={sizeVariation.minAge}
                                            label={t("min-age")}
                                            onChange={handleGetMinAge}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextFieldNumber
                                            value={sizeVariation.maxAge}
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
                            {t("create")}
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}
export default FormSizeVariation;