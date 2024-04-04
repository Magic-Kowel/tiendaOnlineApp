import { useState } from "react";
import { 
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Switch,
    FormControlLabel,
    Button,
    Chip
} from "@mui/material";
import TextFieldNumber from "../../components/TextFieldNumber"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FaceIcon from '@mui/icons-material/Face';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { getMaterials } from "../../reducers/material/material";
import { getProducts } from "../../reducers/product/product";
import { getGenders } from "../../reducers/gender/gender";
import { colors } from "../../stylesConfig";
import PropTypes from 'prop-types';
function FormSearchProduct({
    page,
    searchProduct
}){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {materials} = useSelector((state)=>state.material);
    const {genders} = useSelector((state)=>state.gender);

    useEffect(()=>{
        dispatch(getMaterials());
        dispatch(getGenders());
    },[])
    const [dataFormSearch,setDataFormSearch] = useState({
        page:page,
        searchProduct:searchProduct,
        materialList:[],
        genderList:[],
        publicPerson:false,
        minPrice:0,
        maxPrice:0,
        size:0,
        maxAge:0,
        minAge:0,
        searchForPrice:false
    });
    const handleChange = () => {
        setDataFormSearch((prev) =>({
            ...prev,
            publicPerson:!prev.publicPerson
        }));
    };
    const handleGetProducts = () =>{
        dispatch(getProducts({
            page:page,
            searchProduct:searchProduct,
            materialList:dataFormSearch.materialList,
            genderList:dataFormSearch.genderList,
            minPrice:dataFormSearch.minPrice,
            maxPrice:dataFormSearch.maxPrice,
            size:dataFormSearch.size,
            publicPerson:dataFormSearch.publicPerson,
            maxAge:dataFormSearch.maxAge,
            minAge:dataFormSearch.minAge
        }));
    }
    useEffect(()=>{
        handleGetProducts();
        console.log(dataFormSearch.publicPerson);
    },[
        searchProduct,
        dataFormSearch.materialList,
        dataFormSearch.publicPerson,
        dataFormSearch.genderList
    ])
    const handleSelectMaterial = (item) => (event) => {
        if (event.target.checked) {
            setDataFormSearch((prev) => ({
                ...prev,
                materialList: [...prev.materialList, item.nameMaterial]
            }));
            return;
        }
        setDataFormSearch((prev) => ({
            ...prev,
            materialList: prev.materialList.filter(material => material !== item.nameMaterial)
        }));
    };
    const handleSelectGender = (item) => (event) => {
        if (event.target.checked) {
            setDataFormSearch((prev) => ({
                ...prev,
                genderList: [...prev.genderList, item.nameGender]
            }));
            return;
        }
        setDataFormSearch((prev) => ({
            ...prev,
            genderList: prev.genderList.filter(material => material !== item.nameGender)
        }));
    };
    
    return(
        <Grid container spacing={2} px={3}>
            {(dataFormSearch.minPrice > 0 && dataFormSearch.maxPrice > 0) && (
                <Grid item xs={12}>
                    <Chip
                        fullWidth
                        label={`${dataFormSearch.minPrice} - ${dataFormSearch.maxPrice}`}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <TextFieldNumber
                    label={t("priceMin")}
                    value={dataFormSearch?.minPrice}
                    onChange={(value)=>{
                        setDataFormSearch((prev)=>({
                            ...prev,
                            minPrice:Number(value)
                        }))
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextFieldNumber 
                    label={t("priceMax")}
                    value={dataFormSearch?.maxPrice}
                    onChange={(value)=>{
                        setDataFormSearch((prev)=>({
                            ...prev,
                            maxPrice:Number(value)
                        }))
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="materialsPanel"
                    >
                        {t("materials")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {
                                materials.map((item,index)=>(
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton>
                                            <Switch
                                                onChange={handleSelectMaterial(item)}
                                                defaultChecked={false} 
                                            />
                                            <ListItemText primary={item.nameMaterial} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="genderPanel"
                    >
                        {t("gender")}
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {
                                genders.map((item,index)=>(
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton>
                                            <Switch
                                                onChange={handleSelectGender(item)}
                                                defaultChecked={false} 
                                            />
                                            <ListItemText primary={item.nameGender} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel control={
                        <Switch
                            checked={dataFormSearch.publicPerson}
                            onChange={handleChange}
                            sx={{
                                width: 100,
                                height: 50, // Altura del interruptor
                                '& .MuiSwitch-switchBase': {
                                    padding: 1.2, // Doble del espaciado interno original
                                    '&.Mui-checked': {
                                      transform: 'translateX(50px)', // Doble del desplazamiento original cuando está activado
                                    },
                                    textAlign: 'center', // Centra el contenido horizontalmente
                                    verticalAlign: 'middle', // Centra el contenido verticalmente
                                },
                            }}
                            icon={<ChildCareIcon sx={{ fontSize: 32 }} />} // Icono cuando el switch está en estado no seleccionado
                            checkedIcon={<FaceIcon sx={{ fontSize: 32 }} />} // Icono cuando el switch está en estado seleccionado
                        />
                } label={dataFormSearch.publicPerson ? t("adult"):t("childish")} />
            </Grid>
            {
                dataFormSearch.publicPerson &&(
                    <Grid item xs={12}>
                        <TextFieldNumber 
                            label={t("size")}
                            value={dataFormSearch?.size}
                            onChange={(value)=>{
                                setDataFormSearch((prev)=>({
                                    ...prev,
                                    size:Number(value)
                                }))
                            }}
                        />
                    </Grid>
                )
            }
            {
                !dataFormSearch.publicPerson &&(
                    <>
                        <Grid item xs={12}>
                            <TextFieldNumber 
                                label={t("min-age")}
                                value={dataFormSearch?.minAge}
                                onChange={(value)=>{
                                    setDataFormSearch((prev)=>({
                                        ...prev,
                                        minAge:Number(value)
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextFieldNumber 
                            label={t("max-age")}
                            value={dataFormSearch?.maxAge}
                            onChange={(value)=>{
                                setDataFormSearch((prev)=>({
                                    ...prev,
                                    maxAge:Number(value)
                                }))
                            }}
                        />
                        </Grid>
                    </>
                )
            }
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    type="button"
                    onClick={handleGetProducts}
                    sx={{
                        backgroundColor:colors.primaryColor,
                        '&:hover':{
                            backgroundColor:colors.primaryColor
                        }
                    }}
                >
                        {t("search")}
                </Button>
            </Grid>
        </Grid>
    )
}
FormSearchProduct.propTypes = {
    page: PropTypes.string.isRequired,
    searchProduct: PropTypes.string.isRequired,
};
export default FormSearchProduct;