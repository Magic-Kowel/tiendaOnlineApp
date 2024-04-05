import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategories, deleteCategory } from "../../reducers/subCategory/subCategory";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { colors } from '../../stylesConfig';
import Swal from 'sweetalert2';
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
function Subcategory(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const {subcategories} = useSelector((state)=>state.subcategory);
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
        Swal.fire({
            title: t("want-to-delete-subcategory"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("delete"),
            denyButtonText: t("cancel"),
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id))
                .then((response)=>{
                    if(response.payload.delete){
                        Swal.fire({
                            title:t("successfully-removed"),
                            icon:'success'
                        });
                        handleGetSubcategories()
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