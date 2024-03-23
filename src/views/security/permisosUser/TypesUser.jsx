import { useEffect, useState } from "react";
import TitlePage from "../../../components/TitlePage";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { getUsersTypes } from "../../../reducers/user/user";
import { colors } from "../../../stylesConfig";
import { useNavigate } from "react-router";
import {
    Container,
    Grid
} from '@mui/material';
import SearchAutoComplete from "../../../components/SearchAutoComplete";
import DataTable from "../../../components/DataTable/DataTable";
import ListIcon from '@mui/icons-material/List';
function TypesUser(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [usersTypesData,SetUsersTypesData] = useState([])
    const { usersTypes } = useSelector((state)=>state.user)
    const [t] = useTranslation("global");
    const handleGetUsers = async () =>{
        await dispatch(getUsersTypes())
    }
    useEffect(()=>{
        handleGetUsers();
    },[]);
    useEffect(()=>{
        SetUsersTypesData(usersTypes);
    },[usersTypes]);
    const handlePermissions = (idTypeUser) =>{
        navigate(`/security/permissions/${idTypeUser}`);
    }
    const listButtons = [
        {
            tooltipTitle: t("permissions"),
            onClick: (idTypeUser) => handlePermissions(idTypeUser),
            icon: <ListIcon />,
            customColor:colors.primaryColor
        }
    ];
    const listTitles=[
        t("type-user"),
        t("description"),
        t("actions")
    ];
    const listKeys=["nameTypeUser","description"];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("types-users")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                        <SearchAutoComplete
                            data={usersTypes}
                            getData={SetUsersTypesData}
                            getOptionSearch={(item)=>item.nameTypeUser}
                        />
                        <DataTable 
                            listTitles={listTitles}
                            listKeys={listKeys}
                            dataList={usersTypesData}
                            id="idTypeUser"
                            listButtons={listButtons}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default TypesUser;