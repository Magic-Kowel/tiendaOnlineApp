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
                    "x-access-token": token
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
    loading:false,
    error:null
}
const materialSlice = createSlice({
    name:"materials",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(createProduct.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            }); 
    }
})
export default materialSlice.reducer;