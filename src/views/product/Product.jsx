import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts } from "../../reducers/product/product";
import ProductCard from "../../components/ProductCard";
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
        <ProductCard
            dataProduct={products}
        />
    );
}
export default Product;