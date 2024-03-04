import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts } from "../../reducers/product/product";
import ProductCard from "../../components/ProductCard";
import {Grid,Container} from '@mui/material';
function Product(){
    const dispatch = useDispatch();
    const {products} = useSelector((state)=>state.product);
    const handleGetProducts = async () =>{
        await dispatch(getProducts());
    }
    useEffect(()=>{
        handleGetProducts();
    },[]);
    useEffect(()=>{
        // console.log("products",products[0]?.urlImagenes.split(","));
    },[products]);
    
    return (
        <Container>
            <Grid 
                container
                spacing={1}
                alignItems="stretch"
            >
                {products.map((product) => (
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