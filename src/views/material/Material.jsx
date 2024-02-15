import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMaterials,deleteMaterial } from "../../reducers/material/material";
import { useNavigate } from "react-router";
import DataTable from "../../components/DataTable/DataTable";
import SearchAutoComplete from "../../components/SearchAutoComplete";
import FormMaterial from "./FormMaterial";
import {
    Container,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import TitlePage from "../../components/TitlePage";
import Swal from 'sweetalert2';
function Material(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const [materialList,setMaterialList] = useState([]);
    const {materials} = useSelector((state)=>state.material);
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
        Swal.fire({
            title: t("want-to-delete-material"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
        }).then((result) => {
            console.log(3);
            if (result.isConfirmed) {
                dispatch(deleteMaterial(idMaterial))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        handleGetMaterials();
                        return false;
                    }
                    Swal.fire({
                        title:t("something-went-wrong"),
                        icon:"error"
                    });
                })
            }
        });
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
                    <Grid item sm={12} md={7} lg={7}>
                            <SearchAutoComplete
                                data={materialList}
                                getData={setMaterialList}
                                getOptionSearch={(item)=>item.nameMaterial}
                            />
                            <DataTable
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={materials}
                                listButtons={listButtons}
                                id="idMaterial"
                            />
                    </Grid>
                    <Grid item sm={12} md={5} lg={5}>
                        <FormMaterial />
                    </Grid>
            </Grid>
        </Container>
    </>);
}
export default Material;