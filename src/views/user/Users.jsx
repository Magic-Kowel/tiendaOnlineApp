import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getUsers,
    sendResetPasswort,
    sendConfirmationUser
} from '../../reducers/user/user';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { colors } from '../../stylesConfig';
import {
    Grid,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../components/DataTable/DataTable';
import TitlePage from '../../components/TitlePage';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import StackTable from '../../components/DataTable/StackTable';
import MailIcon from '@mui/icons-material/Mail';
import { createFilterOptions } from '@mui/material/Autocomplete';
function Users(){
    const [t] = useTranslation("global");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [usersList,setUsersList] = useState([])
    const {users} = useSelector((state)=>state.user);
    useEffect(()=>{
        dispatch(getUsers())
    },[]);
    useEffect(()=>{
        setUsersList(users)
    },[users]);
    const handleSendConfirmationUser= async (idUser) =>{
        const response = await dispatch(sendConfirmationUser(idUser));
        console.log(response);
        if(response.payload.send === true){
            Swal.fire({
                title:t("form-submitted-successfully"),
                icon:"success"
            });
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const handleSendResetPasswort = async (idUser) =>{
        const response = await dispatch(sendResetPasswort(idUser));
        console.log(response);
        if(response.payload.send === true){
            Swal.fire({
                title:t("form-submitted-successfully"),
                icon:"success"
            });
            return false;
        }
        if(response.payload.notActiveUser === true){
            Swal.fire({
                title:t("not-is-active-user"),
                icon:"info"
            });
            return false;
        }
        Swal.fire({
            title:t("something-went-wrong"),
            icon:"error"
        });
    }
    const listTitles=[
        t("name"),
        t("last-name"),
        t("email"),
        t("type-user"),
        t("status"),
        t("actions")
    ];
    const listKeys=["name","lastName","email","typeUser","status"];
    const listButtons = [
        {
            tooltipTitle: t("update"),
            onClick: (idUser) => navigate(`edit/${idUser}`),
            icon: <EditIcon />,
            color:"warning"
        },
        {
            tooltipTitle: t("restore-password"),
            onClick: (idUser) => handleSendResetPasswort(idUser),
            icon: <ReplyIcon />,
            customColor:colors.primaryColor
        },
        {
            tooltipTitle: t("confirmacion-of-user"),
            onClick: (idUser) => handleSendConfirmationUser(idUser),
            icon: <MailIcon />,
            customColor:colors.primaryColor
        }
    ];
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.name} ${option.lastName} ${option.email} ${option.typeUser}`,
    });
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
                            getOptionSearch={(item)=>`${item.name} ${item.lastName}`}
                            renderOption={(props, option) => (
                                <li {...props}>
                                  <div>{option.name} {option.lastName}</div>
                                </li>
                            )}
                            filterOptions={filterOptions}
                        />
                        {!isMobile?(
                            <DataTable 
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={usersList}
                                listButtons={listButtons}
                                id="idUser"
                            />
                        ):(
                            <StackTable 
                                listTitles={listTitles}
                                listKeys={listKeys}
                                dataList={usersList}
                                listButtons={listButtons}
                                id="idUser"
                            />
                        )}
                    </Grid>
                </Grid>
        </Container>
    )
}
export default Users;