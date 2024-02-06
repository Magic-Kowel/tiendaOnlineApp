import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./../reducers/user/user";
import categorySlice from "./../reducers/category/category"
import subcategorySlice from "../reducers/subCategory/subCategory";
import securitySlice from "../reducers/security/security";
import sizeSlice from "../reducers/size/size";
const store = configureStore({
    reducer:{
        user:userSlice,
        category:categorySlice,
        subcategory:subcategorySlice,
        security:securitySlice,
        size:sizeSlice
    }
});
export default store;