import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../reducers/category/category';
import { colors } from '../../stylesConfig';
import SearchAutoComplete from '../../components/SearchAutoComplete';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import messageIsDelete from '../../tools/messages/messageIsDelete';
import {
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import DataTable from '../../components/DataTable/DataTable';
import { useTranslation } from 'react-i18next';
import TitlePage from '../../components/TitlePage';
import StackTable from '../../components/DataTable/StackTable';
function Category(){
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {categorys,loadingCategory} = useSelector((state)=>state.category);
    const [t] = useTranslation("global");

    const dispatch = useDispatch();
    const getCategoryData = async () =>{
        await dispatch(getCategories());
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategoryData();
    }, []);
    const subcategory = (id) => {
        navigate(`/category/subcategory/${id}`);
    }
    const handleDeleteCategory = async (id) =>{
        messageIsDelete({
            titleMessage:t("want-to-delete-category"),
            textDelete:t("delete"),
            textCancel:t("cancel"),
            funDelete:() => dispatch(deleteCategory(id)),
            funGetData:getCategoryData,
            messageSuccess:t("successfully-removed"),
            messageError:t("something-went-wrong")
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
            <SearchAutoComplete
                data={categorys}
                getData={setCategories}
                getOptionSearch={(item)=>item.tNombre}
                loading={loadingCategory}
            />
            {!isMobile?(
                <DataTable
                    listTitles={listTitles}
                    listKeys={listKeys}
                    dataList={categories}
                    listButtons={listButtons}
                    id="ecodCategoria"
                />
            ):(
                <StackTable 
                    listTitles={listTitles}
                    listKeys={listKeys}
                    dataList={categories}
                    listButtons={listButtons}
                    id="ecodCategoria"
                />
            )}
       </Container>
        </>
    );
}
export default Category;