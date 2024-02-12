import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL,NAME_TOKEN } from "../../config";
export const getAgeGroups = createAsyncThunk(
    "get/age/groups",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/agegroups`,{
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
    ageGroups:[],
    loading:false,
    error:null
}
const sizeSlice = createSlice({
    name:"ageGroup",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getAgeGroups.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getAgeGroups.fulfilled, (state, action) => {
            state.loading = false;
            state.ageGroups = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getAgeGroups.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
})
export default sizeSlice.reducer;