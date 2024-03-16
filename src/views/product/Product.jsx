import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts,clearImagensLists } from "../../reducers/product/product";
import ProductCard from "../../components/ProductCard";
import {Grid,Container} from '@mui/material';
import CardSkeleton from "../../components/skeleton/CardSkeleton";
function Product(){
    const dispatch = useDispatch();
    const {products,loadingProducts} = useSelector((state)=>state.product);
    const handleGetProducts = async () =>{
        await dispatch(getProducts());
    }
    useEffect(()=>{
        dispatch(clearImagensLists())
        handleGetProducts();
    },[]);
 
    
    return (
        <Container>
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
        </Container>

 
        
    );
}
export default Product;