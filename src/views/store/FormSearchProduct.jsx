import { 
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Switch,
    FormControlLabel,
    Button
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
    searchProduct,
    setDataFormSearch,
    dataFormSearch,
}){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {materials} = useSelector((state)=>state.material);
    const {genders} = useSelector((state)=>state.gender);
    useEffect(()=>{
        dispatch(getMaterials());
        dispatch(getGenders());
    },[])
    const handleChildren = () => {
        setDataFormSearch((prev) =>({
            ...prev,
            isChildren:!prev.isChildren
        }));
    };
    const handleAdult = () => {
        setDataFormSearch((prev) =>({
            ...prev,
            isAdult:!prev.isAdult
        }));
    };
    const handleGetProducts = () =>{
        dispatch(getProducts({
            page:page,
            searchProduct:searchProduct,
            materialList:dataFormSearch?.materialList,
            genderList:dataFormSearch?.genderList,
            minPrice:dataFormSearch?.minPrice,
            maxPrice:dataFormSearch?.maxPrice,
            size:dataFormSearch?.size,
            isChildren:dataFormSearch?.isChildren,
            isAdult:dataFormSearch?.isAdult,
            maxAge:dataFormSearch?.maxAge,
            minAge:dataFormSearch?.minAge
        }));
    }
    useEffect(()=>{
        handleGetProducts();
    },[
        searchProduct,
        dataFormSearch?.materialList,
        dataFormSearch?.isAdult,
        dataFormSearch?.isChildren,
        dataFormSearch?.genderList
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
                    onKeyEnter={handleGetProducts}
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
                    onKeyEnter={handleGetProducts}
                />
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded>
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
                                                checked={dataFormSearch.materialList.find((material)=>material === item.nameMaterial)}
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
                <Accordion defaultExpanded>
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
                                                checked={dataFormSearch.genderList.find((gender)=>gender === item.nameGender)}
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
            <Grid container item>
                <Grid item xs={12}>
                    <FormControlLabel control={
                            <Switch
                                checked={dataFormSearch?.isChildren}
                                onChange={handleChildren}
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
                                checkedIcon={<ChildCareIcon sx={{ fontSize: 32 }} />} // Icono cuando el switch está en estado seleccionado
                            />
                    } label={t("childish")} />
                </Grid>
                {
                    dataFormSearch?.isChildren &&(
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
                                    onKeyEnter={handleGetProducts}
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
                                onKeyEnter={handleGetProducts}
                            />
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={12}>
                    <FormControlLabel control={
                            <Switch
                                checked={dataFormSearch?.isAdult}
                                onChange={handleAdult}
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
                                icon={<FaceIcon sx={{ fontSize: 32 }} />} // Icono cuando el switch está en estado no seleccionado
                                checkedIcon={<FaceIcon sx={{ fontSize: 32 }} />} // Icono cuando el switch está en estado seleccionado
                            />
                    } label={t("adult")} />
                </Grid>
            </Grid>
            {
                dataFormSearch?.isAdult &&(
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
    setDataFormSearch:PropTypes.func.isRequired,
    dataFormSearch: PropTypes.object.isRequired,
};
export default FormSearchProduct;