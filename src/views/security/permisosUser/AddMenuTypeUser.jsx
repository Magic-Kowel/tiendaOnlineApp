import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { 
    getAccessControlMenu,
    createAccessControlMenu,
    getAccessControlMenuPermissions,
    clearListTransferPermission
} from "../../../reducers/security/security";
import {
    Container,
    Grid,
    Button
} from '@mui/material';
import TransferList from "../../../components/TransferList";
import { colors } from "../../../stylesConfig";
import GoBack from "../../../components/goBack";
import Swal from "sweetalert2";
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
    const handleCreate = async()=>{
        const response = await dispatch(createAccessControlMenu({
            idTypeUser:idTypeUser,
            listAccessControlMenu:listRight
        }));
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
    },[listAccessControlMenuPermissions,])
    return(
        <>
        <Container>
            <GoBack />
            <Grid 
            container 
            justifyContent="center" 
            alignItems="center"
            spacing={2}
            >
                <Grid item xs={10}>
                    <TransferList
                        listLeft={listLeft}
                        listRight={listRight}
                        setListLeft={setListLeft}
                        setListRight={setListRight}
                        index="permission"
                    />
                </Grid>
                <Grid item xs={9}>
                    <Button
                        onClick={handleCreate}
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
                            {t("transfer")}
                    </Button>
                </Grid>
            </Grid>
        </Container>
        </>
    )
}
export default AddMenuTypeUser;