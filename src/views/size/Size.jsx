import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getSizes,
    deleteSize
} from "../../reducers/size/size";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import {
    Container,
    Grid,
    useMediaQuery,
    useTheme 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TitlePage from "../../components/TitlePage";
import SearchAutoComplete from "../../components/SearchAutoComplete"
import DataTable from "../../components/DataTable/DataTable";
import FormSize from "./FormSize";
import StackTable from "../../components/DataTable/StackTable";
function Size(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {sizes} = useSelector((state)=>state.size);
    const [t] = useTranslation("global");
    const [sizeList, setSizeList] = useState([]);

    const getSizeData = async () =>{
        await dispatch(getSizes());
    }
    useEffect(()=>{
        getSizeData();
    },[]);
    useEffect(()=>{
        setSizeList(sizes);
    },[sizes]);

    const handleDeleteSize = (idSize) =>{
        Swal.fire({
            title: t("want-to-delete-size-clothe"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSize(idSize))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        getSizeData();
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
    const handleUpdateSize = async (idSize) =>{
        navigate(`/size/edit/${idSize}`);
    }
    const listTitles=[t("size-clothe"),t("actions")];
    const listKeys=["nameSize"];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idSize) => handleDeleteSize(idSize),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (idSize) => handleUpdateSize(idSize),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("size-clothes")}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <FormSize />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <SearchAutoComplete
                            data={sizes}
                            getData={setSizeList}
                            getOptionSearch={(item)=>item.nameSize}
                        />
                        {
                            !isMobile?(
                                <DataTable 
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={sizeList}
                                    listButtons={listButtons}
                                    id="idSize"
                                />
                            ):(
                                <StackTable 
                                    listTitles={listTitles}
                                    listKeys={listKeys}
                                    dataList={sizeList}
                                    listButtons={listButtons}
                                    id="idSize"
                                />
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Size;