import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    getSubMenusActive,
    // createPermissionsUser,
    getAccessControl
} from '../../../reducers/security/security';
import {
    Container,
    Grid
} from '@mui/material';
import TitlePage from '../../../components/TitlePage';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../components/goBack';
import DataTable from '../../../components/DataTable/DataTable';
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import EditIcon from '@mui/icons-material/Edit';
import FormPermission from './FormPermission';
function AddPermissions(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const {listAccessControl} = useSelector((state)=>state.security);
    const [listPermission, setLisPermission] = useState();
    const handleGetSubmenus = async () =>{
        await dispatch(getSubMenusActive());
    }
    const handleGetTypeUserPermissions = async () =>{
        await dispatch(getAccessControl());
    }
    useEffect(()=>{
        setLisPermission(listAccessControl);
    },[listAccessControl]);
    useEffect(()=>{
        handleGetSubmenus();
        handleGetTypeUserPermissions();
    },[]);
    const handleUpdteMaterial = async (idTypeUserPermission) =>{
        navigate(`/security/permissions/edit/${idTypeUserPermission}`)
    }
    const listTitles=[t("submenu"),t("permission"),t("actions")];
    const listKeys=["submenu","permission"];
    const listButtons = [
        {
            tooltipTitle: t("update"),
            onClick: (idTypeUserPermission) => handleUpdteMaterial(idTypeUserPermission),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("permissions")}
                />
                <GoBack />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                            <SearchAutoComplete
                                data={listAccessControl}
                                getData={setLisPermission}
                                getOptionSearch={(item)=>item.permission}
                            />
                            <DataTable
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={listPermission || []}
                                listButtons={listButtons}
                                id="idMenuPermission"
                            />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormPermission />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default AddPermissions;