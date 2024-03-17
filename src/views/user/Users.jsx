import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../reducers/user/user';
import { useTranslation } from 'react-i18next';
import {
    Grid,
    Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../components/DataTable/DataTable';
import TitlePage from '../../components/TitlePage';
import SearchAutoComplete from '../../components/SearchAutoComplete';
function Users(){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const [usersList,setUsersList] = useState([])
    const {users} = useSelector((state)=>state.user);
    useEffect(()=>{
        dispatch(getUsers())
    },[]);
    useEffect(()=>{
        setUsersList(users)
    },[users]);
    const listTitles=[
        t("name"),
        t("last-name"),
        t("email"),
        t("birth-date"),
        t("type-user"),
        t("status"),
        t("actions")
    ];
    const listKeys=["name","lastName","email","birthdate","typeUser","status"];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idUser) => console.log(idUser),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (idUser) => console.log(idUser),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <Container>
                <TitlePage 
                    title={t("users")}
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                        <SearchAutoComplete
                            data={users}
                            getData={setUsersList}
                            getOptionSearch={(item)=>item.name}
                        />
                        <DataTable 
                            listTitles={listTitles}
                            listKeys={listKeys}
                            dataList={usersList}
                            listButtons={listButtons}
                            id="idUser"
                        />
                    </Grid>
                </Grid>
        </Container>
    )
}
export default Users;