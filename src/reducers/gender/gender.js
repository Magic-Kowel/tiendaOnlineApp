import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";
export const getGenders = createAsyncThunk(
    "get/genders",
    async(thunkAPI) =>{
        try {
            const response = await axios.get(`${API_BASE_URL}/genders`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    genders:[],
    loading:false,
    error:null
}
const genderSlice = createSlice({
    name:"genders",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getGenders.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getGenders.fulfilled, (state, action) => {
            state.loading = false;
            state.genders = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getGenders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
})
export default genderSlice.reducer;