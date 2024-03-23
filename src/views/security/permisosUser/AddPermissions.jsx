import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { getMenusActive, getSubMenusActive } from '../../../reducers/security/security';
import {
    Container,
} from '@mui/material';
import TransferList from '../../../components/TransferList';


import Swal from 'sweetalert2';
import { colors } from '../../../stylesConfig';
import { useTranslation } from 'react-i18next';
import SearchAutoComplete from '../../../components/SearchAutoComplete';
import GoBack from '../../../components/goBack';

function AddPermissions(){
    const dispatch = useDispatch();
    const {idUser} = useParams();
    const [t] = useTranslation("global");
    const {menu, submenu} = useSelector((state)=>state.security);
    const [menuData, setMenuData] = useState([]);
    const [submenuData, setSubmenuData] = useState([]);

    const handleGetMenus = async () =>{
        await dispatch(getMenusActive());
    }
    const handleGetSubmenus = async () =>{
        await dispatch(getSubMenusActive());
    }
    useEffect(()=>{
        handleGetMenus();
        handleGetSubmenus();
    },[])

 
    
    return(
        <>
            <Container>
                <GoBack />
                <TransferList
                    listLeft={submenu}
                    index="name"
                />
            </Container>
        </>
    )
}
export default AddPermissions;