import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getProducts,clearImagensLists } from "../../reducers/product/product";
import MenuWithoutSection from "../../components/menu/MenuWithoutSection";
import Footer from "../../components/Footer";
import { Grid, Container,Stack, Chip} from "@mui/material";
import DrawerForm from "../../components/DrawerForm";
import { useMediaQuery, useTheme } from '@mui/material';
import TitlePage from "../../components/TitlePage";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import NoRecordsFound from "../../components/NoRecordsFound";
import PaginationBar from "../../components/PaginationBar";
import FormSearchProduct from "./FormSearchProduct";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Seo from "../../components/Seo";
function Store(){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {products,loadingProducts} = useSelector((state)=>state.product);
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [searchProduct,setSearchProduct] = useState("");
    const [dataFormSearch,setDataFormSearch] = useState({
        page:page,
        searchProduct:searchProduct,
        materialList:[],
        genderList:[],
        isChildren:false,
        isAdult:false,
        minPrice:0,
        maxPrice:0,
        size:0,
        maxAge:0,
        minAge:0,
        searchForPrice:false
    });
    const handleGetProducts = async () =>{
        await dispatch(getProducts({
            page:page,
            nameProduct:searchProduct
        }));
    }
    const openDrawer = () =>{
        setIsOpen(!isOpen);
    }
    useEffect(()=>{
        dispatch(clearImagensLists())
        handleGetProducts();
        setDataFormSearch((prev)=>({
            ...prev,
            searchProduct:searchProduct
        }))
    },[page,searchProduct]);
    return(
        <>
            <Seo />
            <MenuWithoutSection />
            <Container
                component="main"
                sx={{
                    minHeight:"calc(100vh - 260px)",
                }}
            >
                <TitlePage
                    title={t("products")}
                />
                <SearchInput
                    setSearchProduct={setSearchProduct}
                />
                {  (searchProduct.length > 0 && !onlySmallScreen) &&(
                    <Stack 
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                        spacing={2}
                        mb={2}
                    >
                            <Chip
                                label={`${t("filter")}`}
                                onClick={openDrawer}
                                onDelete={openDrawer}
                                deleteIcon={<FilterAltIcon />}
                            />
                    </Stack>
                )}
                <Grid container justifyContent="center" >
                    <DrawerForm
                        open={isOpen}
                        onClose={openDrawer}
                    >
                        <FormSearchProduct
                            page={page}
                            searchProduct={searchProduct}
                            setDataFormSearch={setDataFormSearch}
                            dataFormSearch={dataFormSearch}
                        />
                    </DrawerForm>
                    {
                        (searchProduct.length > 0 && onlySmallScreen) &&(
                            <Grid 
                                item 
                                xs={3}
                            >
                                <FormSearchProduct
                                    page={page}
                                    searchProduct={searchProduct}
                                    setDataFormSearch={setDataFormSearch}
                                    dataFormSearch={dataFormSearch}
                                />
                            </Grid>
                        )
                    }
                    <Grid 
                        container 
                        item 
                        spacing={1} 
                        xs={9}
                        alignItems="flex-start"
                    >
                        {loadingProducts === true && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                            <CardSkeleton />
                        </Grid>
                        ))}
                        {!!products && products?.map((product) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={3} 
                                lg={searchProduct ?4:3} 
                                key={product.idProduct}
                            > 
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                        {(products.length === 0)  && (
                            <Grid
                                container
                                item
                                justifyContent="center"
                                alignItems="center"
                                sx={{height:"calc(100vh - 260px)"}}
                            >
                                <NoRecordsFound />
                            </Grid>
                        )}
                    </Grid>
                    <Grid
                        item
                        alignItems="flex-end"
                        display="flex" 
                        justifyContent="center" 
                        xs={12}
                        my={4}
                    >
                        <PaginationBar
                            setPage={setPage}
                            page={page}
                            count={Math.ceil(products.length / 30)}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}
export default Store