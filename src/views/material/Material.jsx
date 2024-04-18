import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMaterials,deleteMaterial } from "../../reducers/material/material";
import { useNavigate } from "react-router";
import DataTable from "../../components/DataTable/DataTable";
import StackTable from "../../components/DataTable/StackTable";
import SearchAutoComplete from "../../components/SearchAutoComplete";
import FormMaterial from "./FormMaterial";
import {
    Container,
    Grid,
    useMediaQuery,
    useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import TitlePage from "../../components/TitlePage";
import messageIsDelete from "../../tools/messages/messageIsDelete";
function Material(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [t] = useTranslation("global");
    const [materialList,setMaterialList] = useState([]);
    const {materials , loadingMaterial} = useSelector((state)=>state.material);
    const handleGetMaterials = async () =>{
        await dispatch(getMaterials());
    }
    useEffect(()=>{
        setMaterialList(materials);
    },[materials]);
    useEffect(()=>{
        handleGetMaterials();
    },[]);
    const listTitles=[t("material"),t("actions")];
    const listKeys=["nameMaterial"];
  
    const handleDeleteMaterial = async (idMaterial) =>{
        messageIsDelete({
            titleMessage:t("want-to-delete-material"),
            textDelete:t("delete"),
            textCancel:t("cancel"),
            funDelete:() => dispatch(deleteMaterial(idMaterial)),
            funGetData:handleGetMaterials,
            messageSuccess:t("successfully-removed"),
            messageError:t("something-went-wrong")
        })
    }
    const handleUpdteMaterial = async (idMaterial) =>{
        navigate(`edit/${idMaterial}`)
    }
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idMaterial) => handleDeleteMaterial(idMaterial),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (idMaterial) => handleUpdteMaterial(idMaterial),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(<>
        <Container>
            <TitlePage
                 title={t("materials")}
            />
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <FormMaterial />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                            <SearchAutoComplete
                                data={materials}
                                getData={setMaterialList}
                                getOptionSearch={(item)=>item.nameMaterial}
                                loading={loadingMaterial}
                            />
                            {!isMobile?(
                                <DataTable
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={materialList}
                                    listButtons={listButtons}
                                    id="idMaterial"
                                />
                            ):(
                                <StackTable 
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={materialList}
                                    listButtons={listButtons}
                                    id="idMaterial"
                                />

                            )}
                    </Grid>
            </Grid>
        </Container>
    </>);
}
export default Material;