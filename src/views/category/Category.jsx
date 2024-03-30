import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../reducers/category/category';
import { colors } from '../../stylesConfig';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
    Button,
    Container,
} from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import Swal from 'sweetalert2';
import GoBack from '../../components/goBack';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
function Category(){
    const navigate = useNavigate();
    const {categorys} = useSelector((state)=>state.category);
    const [t] = useTranslation("global");

    const dispatch = useDispatch();
    const getCategoryData = async () =>{
        await dispatch(getCategories());
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategoryData();
    }, []);
    const createCategory=()=>{
        navigate("/category/create");
    }
    const subcategory = (id) => {
        navigate(`/category/subcategory/${id}`);
    }
    const handleDeleteCategory = async (id) =>{
        Swal.fire({
            title: t("want-to-delete-category"),
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
                        getCategoryData();
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
    const handleUpdateCategory = (id) =>{
        navigate(`/category/edit/${id}`);
    }
    const listTitles=[t("name"),t("actions")];
    const listKeys=["tNombre"];
    const listButtons = [
        {
            tooltipTitle: t("delete"),
            onClick: (ecodCategoria) => handleDeleteCategory(ecodCategoria),
            icon: <DeleteIcon />,
            color:"error"
        },
        {
            tooltipTitle: t("update"),
            onClick: (ecodCategoria) => handleUpdateCategory(ecodCategoria),
            icon: <EditIcon />,
            color:"warning"
        },
        {
            tooltipTitle: t("subcategories"),
            onClick: (ecodCategoria) => subcategory(ecodCategoria),
            icon: <FormatListBulletedIcon />,
            customColor:colors.secondaryColor
        }
    ];
    return(
        <>
        <Container>
            <TitlePage 
                title={t("categories")}
            />
            <GoBack />
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={createCategory}
                sx={{
                    backgroundColor:colors.secondaryColor,
                    '&:hover':{
                        backgroundColor:colors.secondaryColor
                    }
                }}
            >
                {t("create-category")}
            </Button>
            <SearchAutoComplete
                data={categorys}
                getData={setCategories}
                getOptionSearch={(item)=>item.tNombre}
            />
            <DataTable
                listTitles={listTitles}
                listKeys={listKeys}
                dataList={categories}
                listButtons={listButtons}
                id="ecodCategoria"
            />
       </Container>
        </>
    );
}
export default Category;