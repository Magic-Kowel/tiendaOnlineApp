import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL,NAME_TOKEN } from "../../config";
export const getTypeUsers = createAsyncThunk(
    "get/type/users",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/type/users`,{
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
    typeUsers:[],
    loading:false,
    error:null
}
const sizeSlice = createSlice({
    name:"typeUser",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getTypeUsers.pending, (state) => {
            state.loadingTypeUser = true;
            state.error = null;
            })
            .addCase(getTypeUsers.fulfilled, (state, action) => {
            state.loadingTypeUser = false;
            state.typeUsers = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getTypeUsers.rejected, (state, action) => {
            state.loadingTypeUser = false;
            state.error = action.payload;
            });
    }
})
export default sizeSlice.reducer;