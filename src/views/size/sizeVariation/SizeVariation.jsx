import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    getSizesVariation,
    deleteSizesVariation
} from "../../../reducers/size/size";
import {
    Container,
    Grid,
    useMediaQuery,
    useTheme
} from '@mui/material';
import DataTable from "../../../components/DataTable/DataTable";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TitlePage from "../../../components/TitlePage";
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import FormSizeVariation from "./FormSizeVariation";
import StackTable from "../../../components/DataTable/StackTable";
import messageIsDelete from "../../../tools/messages/messageIsDelete";
import { createFilterOptions } from '@mui/material/Autocomplete';
function SizeVariation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {sizeVariation,loadingSize} = useSelector((state)=>state.size);
    const [t] = useTranslation("global");
    const [sizeVariationList, setSizeVariationList] = useState([]);
    const getSizeVariationData = async () =>{
        await dispatch(getSizesVariation());
    }
    useEffect(()=>{
        getSizeVariationData();
    },[]);
    useEffect(()=>{
        const data = sizeVariation?.map((item)=>{
            if(item.maxAge && item.minAge){
                return {
                    ...item,
                    ageRange: `${item.minAge} - ${item.maxAge}`
                }
            }
            if(item.size){
                return {
                    ...item,
                    size: item.size
                }
            } 
            return {
                ...item,
                ageRange: t("does-not-apply"),
                size: t("does-not-apply")
            }
        });
        setSizeVariationList(data);
    },[sizeVariation]);
    const handleDeleteSizeVariation =  (idSizeVariation) =>{
        messageIsDelete({
            titleMessage:t("want-to-delete-size-clothe"),
            textDelete:t("delete"),
            textCancel:t("cancel"),
            funDelete:() => dispatch(deleteSizesVariation(idSizeVariation)),
            funGetData:getSizeVariationData,
            messageSuccess:t("successfully-removed"),
            messageError:t("something-went-wrong")
        })
    }
    const handleUpdateSizeVariation = async (idSizeVariation) =>{
        await navigate(`/size/variation/edit/${idSizeVariation}`);
    }
    const listTitles=[
        t("size-categories-clothe"),
        t("size-ranges-clothe"),
        t("age-range"),
        t("size-clothe"),
        t("actions")
    ];
    const listKeys=[
        "nameSize",
        "ageGroup",
        "ageRange",
        "size"
    ];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idSizeVariation) => handleDeleteSizeVariation(idSizeVariation),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (idSizeVariation) => handleUpdateSizeVariation(idSizeVariation),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.nameSize} ${option.ageGroup}`,
    });
    return(
        <>
            <Container>
                <TitlePage
                    title={t("size-categories-clothe")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={5} lg={5}>
                        <FormSizeVariation />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <SearchAutoComplete
                            data={sizeVariation}
                            getData={setSizeVariationList}
                            getOptionSearch={(item)=>`${item.nameSize} ${item.ageGroup}`}
                            loading={loadingSize}
                            filterOptions={filterOptions}
                            renderOption={(props, option) => (
                                <li {...props}>
                                  <div>{option.nameSize} {option.ageGroup}</div>
                                </li>
                            )}
                        />
                        {
                            !isMobile?(
                                <DataTable
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={sizeVariationList}
                                    listButtons={listButtons}
                                    id="idSizeVariation"
                                />
                            ):(
                                <StackTable 
                                   listTitles={listTitles}
                                   listKeys={listKeys}
                                   dataList={sizeVariationList}
                                   listButtons={listButtons}
                                   id="idSizeVariation"
                               />
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SizeVariation;