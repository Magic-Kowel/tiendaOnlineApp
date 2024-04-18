import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategories, deleteCategory } from "../../reducers/subCategory/subCategory";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { colors } from '../../stylesConfig';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import GoBack from "../../components/goBack";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import TitlePage from "../../components/TitlePage";
import DataTable from "../../components/DataTable/DataTable";
import StackTable from "../../components/DataTable/StackTable";
import messageIsDelete from "../../tools/messages/messageIsDelete";
function Subcategory(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const {subcategories,loadingSubcategory} = useSelector((state)=>state.subcategory);
    const [t] = useTranslation("global");
    const params = useParams();
    const navigate = useNavigate();
    const [subcategoriesData, setSubcategoriesData] = useState([])
    const {idCategory} = params;
    const handleGetSubcategories = async () => {
        await dispatch(getSubcategories(idCategory));
    }
    const handleCreateSubcategory = () =>{
        navigate(`/category/subcategory/create/${idCategory}`)
    }
    const handleUpdate = (id) =>{
        navigate(`/category/subcategory/edit/${id}`)
    }
    const handleDeleteSubcategory = (id) =>{
        messageIsDelete({
            titleMessage:t("want-to-delete-subcategory"),
            textDelete:t("delete"),
            textCancel:t("cancel"),
            funDelete:() => dispatch(deleteCategory(id)),
            funGetData:handleGetSubcategories,
            messageSuccess:t("successfully-removed"),
            messageError:t("something-went-wrong")
        });
    }
    useEffect(()=>{
        handleGetSubcategories();
    },[]);
    const listTitles=[t("name"),t("actions")];
    const listKeys=["tNombre"];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (idMaterial) => handleDeleteSubcategory(idMaterial),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (ecodsubcategoria) => handleUpdate(ecodsubcategoria),
            icon: <EditIcon />,
            color:"warning"
        }
    ];
    return(
        <>
            <Container>
                <TitlePage
                    title={t("subcategory")}
                />
                <GoBack />
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={handleCreateSubcategory}
                    sx={{
                        backgroundColor:colors.primaryColor,
                        '&:hover':{
                            backgroundColor:colors.primaryColor
                        }
                    }}
                >
                    {t("create-subcategory")}
                </Button>
                <SearchAutoComplete
                    data={subcategories}
                    getData={setSubcategoriesData}
                    getOptionSearch={(item)=>item.tNombre}
                    loading={loadingSubcategory}
                />
                {!isMobile?(
                <DataTable
                    listTitles={listTitles}
                    listKeys={listKeys}
                    dataList={subcategoriesData}
                    listButtons={listButtons}
                    id="ecodsubcategoria"
                />
                ):(
                    <StackTable 
                        listTitles={listTitles}
                        listKeys={listKeys}
                        dataList={subcategoriesData}
                        listButtons={listButtons}
                        id="ecodsubcategoria"
                    />
                )}
            </Container>
        </>
    )
}
export default Subcategory