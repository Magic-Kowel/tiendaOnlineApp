import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./../reducers/user/user";
import categorySlice from "./../reducers/category/category"
import subcategorySlice from "../reducers/subCategory/subCategory";
const store = configureStore({
    reducer:{
        user:userSlice,
        category:categorySlice,
        subcategory:subcategorySlice
    }
});
export default store;