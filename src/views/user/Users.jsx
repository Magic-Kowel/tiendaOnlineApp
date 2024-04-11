import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getUsers,
    deleteUser,
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
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../components/DataTable/DataTable';
import TitlePage from '../../components/TitlePage';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import StackTable from '../../components/DataTable/StackTable';
import MailIcon from '@mui/icons-material/Mail';
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
    const handleDeleteUser = async (idUser) =>{
        Swal.fire({
            title: t("want-to-delete-material"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
        }).then((result) => {
            console.log(3);
            if (result.isConfirmed) {
                dispatch(deleteUser(idUser))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        dispatch(getUsers());
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
        if(response.payload.activeUser === true){
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
            tooltipTitle: t("delete"),
            onClick: (idUser) => handleDeleteUser(idUser),
            icon: <DeleteIcon />,
            color:"error"
        },
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