import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getSizes,
    deleteSize
} from "../../reducers/size/size";
import { useTranslation } from 'react-i18next';
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
import messageIsDelete from "../../tools/messages/messageIsDelete";
function Size(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {sizes, loadingSize} = useSelector((state)=>state.size);
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
        messageIsDelete({
            titleMessage:t("want-to-delete-size-clothe"),
            textDelete:t("delete"),
            textCancel:t("cancel"),
            funDelete:() => dispatch(deleteSize(idSize)),
            funGetData:getSizeData,
            messageSuccess:t("successfully-removed"),
            messageError:t("something-went-wrong")
        })
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
                            loading={loadingSize}
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