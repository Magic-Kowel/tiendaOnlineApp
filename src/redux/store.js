import { configureStore } from "@reduxjs/toolkit";
import useSlice from "./../reducers/user/user";
const store = configureStore({
    reducer:{
        user:useSlice
    }
});
export default store;