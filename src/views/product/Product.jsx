import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getProducts,clearImagensLists } from "../../reducers/product/product";
import ProductCard from "../../components/ProductCard";
import {
    Grid,
    Container
} from '@mui/material';
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import PaginationBar from "../../components/PaginationBar";
import NoRecordsFound from "../../components/NoRecordsFound";
import SearchInput from "../../components/SearchInput";
import TitlePage from "../../components/TitlePage";
function Product(){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const {products,loadingProducts} = useSelector((state)=>state.product);
    const [page, setPage] = useState(1);
    const [searchProduct,setSearchProduct] = useState("");
    const handleGetProducts = async () =>{
        await dispatch(getProducts({
            page:page,
            nameProduct:searchProduct
        }));
    }
    useEffect(()=>{
        dispatch(clearImagensLists())
        handleGetProducts();
    },[page,searchProduct]);
    return (
        <Container>
            <TitlePage
                title={t("products")}
            />
            <SearchInput
                setSearchProduct={setSearchProduct}
            />
            <Grid
                container
                spacing={1}
                alignItems="stretch"
            >
                {loadingProducts ===true && [0,1,2,3,4,5,6,7,8,9,10,11]?.map((product,index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={2}
                        key={index}
                    >
                         <CardSkeleton />
                    </Grid>
                ))}
                {!!products && products?.map((product) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={2}
                        key={product.idProduct}
                    >
                        <ProductCard
                            product={product}
                        />
                    </Grid>
                ))}
            </Grid>
            {products.length ===0 &&(
                <NoRecordsFound />
            )}
 
            <Grid 
                container
                alignItems="flex-end"
                my={4}
            >
                <Grid
                    item
                    container
                    alignItems="flex-end"
                    display="flex" justifyContent="center" 
                    xs={12}
                >
                    <PaginationBar
                    setPage={setPage}
                    page={page}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
export default Product;