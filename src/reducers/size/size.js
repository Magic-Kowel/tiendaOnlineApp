import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_BASE_URL,NAME_TOKEN } from "../../config";

export const getSizes = createAsyncThunk(
    "get/sizes",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/sizes`,{
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
export const getSize = createAsyncThunk(
    "get/size",
    async(idSize,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/size/${idSize}`,{
            headers: {
                "x-access-token": token
            }
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createSize = createAsyncThunk(
    "create/size",
    async(idSize,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/size`,idSize,{
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
export const deleteSize = createAsyncThunk(
    "delete/size",
    async(idSize,thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.delete(`${API_BASE_URL}/size/${idSize}`,{
            headers: {
                "x-access-token": token
            }
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateSize = createAsyncThunk(
    "update/size",
    async(data,thunkAPI) => {
      try {
        const token = sessionStorage.getItem(NAME_TOKEN);
        const response = await axios.patch(`${API_BASE_URL}/size`,data,{
          headers:{
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
    sizes:[],
    loading:false,
    error:null
}
const sizeSlice = createSlice({
    name:"size",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getSizes.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getSizes.fulfilled, (state, action) => {
            state.loading = false;
            state.sizes = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSizes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getSize.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getSize.fulfilled, (state, action) => {
            state.loading = false;
            state.sizes = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSize.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(createSize.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(createSize.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(createSize.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(deleteSize.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(deleteSize.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(deleteSize.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(updateSize.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(updateSize.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(updateSize.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        
    }
})
export default sizeSlice.reducer;