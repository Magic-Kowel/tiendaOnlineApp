import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL,NAME_TOKEN } from "../../config";
export const createProduct = createAsyncThunk(
    "create/product",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/product`,data,{
                headers: {
                    "x-access-token": token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    products:[],
    loadingProducts:false,
    error:null
}
const materialSlice = createSlice({
    name:"products",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(createProduct.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(createProduct.fulfilled, (state) => {
            state.loadingProducts = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            }); 
    }
})
export default materialSlice.reducer;