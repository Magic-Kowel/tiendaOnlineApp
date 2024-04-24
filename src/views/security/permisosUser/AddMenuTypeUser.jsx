import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { 
    getAccessControlMenu,
    createAccessControlMenu,
    getAccessControlMenuPermissions,
    clearListTransferPermission,
    deleteAccessControlMenu
} from "../../../reducers/security/security";
import {
    Container,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
 
import GoBack from "../../../components/goBack";
import Swal from "sweetalert2";
import DataTable from "../../../components/DataTable/DataTable";
function AddMenuTypeUser(){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {idTypeUser} = useParams();
    const {listAccessControlMenu,listAccessControlMenuPermissions} = useSelector((state)=>state.security);
    const [listLeft, setListLeft] =useState([]);
    const [listRight, setListRight] =useState([]);
    const handleGedData = async()=>{
        await dispatch(getAccessControlMenu(idTypeUser));
        await dispatch(getAccessControlMenuPermissions(idTypeUser))
    }
    const handleCreate = async(idMenuPermission)=>{
        console.log("idMenuPermission",idMenuPermission);
        const response = await dispatch(createAccessControlMenu({
            idTypeUser:idTypeUser,
            idPermission:idMenuPermission
        }));
        handleGedData()
        if(response.payload.created){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    useEffect(()=>{
        dispatch(clearListTransferPermission());
        setListRight([]);
        setListLeft([]);
        handleGedData()
    },[])
    useEffect(()=>{
        setListLeft(listAccessControlMenu.filter(item =>
            !listAccessControlMenuPermissions.some(algun => algun.idMenuPermission === item.idMenuPermission)
        ));
    },[listAccessControlMenu,listAccessControlMenuPermissions])
    useEffect(()=>{
        if(listAccessControlMenuPermissions.length>0){
            setListRight(listAccessControlMenuPermissions);
        }
    },[listAccessControlMenuPermissions,listAccessControlMenu])
    const deletePermission = async (id) => {
        const response = await dispatch(deleteAccessControlMenu(id));
        if(response.payload?.delete){
            Swal.fire({
                title:t("successfully-created"),
                icon:'success',
                timer: 1500
            });
            handleGedData();
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const listTitlesLeft=[t("permission"),t("add")];
    const listTitlesRight=[t("permission"),t("delete")];
    const listKeys=["permission"];
    const listButtonsLeft = [
        {
            tooltipTitle: t("add"),
            onClick: (idMenuPermission) => handleCreate(idMenuPermission),
            icon: <AddCircleIcon />,
            color:"success"
        },
    ];
    const listButtonsRight = [
        {
            tooltipTitle: t("delete"),
            onClick: (idPermission) =>deletePermission(idPermission),
            icon: <DeleteIcon />,
            color:"error"
        },
    ];
    return(
        <>
        <Container>
            <GoBack />
            <Grid 
            container 
            justifyContent="center" 
            alignItems="flex-start"
            spacing={2}
            >
                <Grid item xs={6}>
                    <DataTable
                        listTitles={listTitlesLeft}
                        listKeys={listKeys}
                        dataList={listLeft}
                        listButtons={listButtonsLeft}
                        id="idMenuPermission"
                    />
                </Grid>
                <Grid item xs={6}>
                    <DataTable
                        listTitles={listTitlesRight}
                        listKeys={listKeys}
                        dataList={listRight}
                        listButtons={listButtonsRight}
                        id="idPermission"
                    />
                </Grid>
            </Grid>
        </Container>
        </>
    )
}
export default AddMenuTypeUser;