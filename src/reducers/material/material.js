import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL,NAME_TOKEN } from "../../config";
export const getMaterials = createAsyncThunk(
    "get/materials",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/materials`,{
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
export const getMaterial = createAsyncThunk(
    "get/material",
    async(idMaterial,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/material/${idMaterial}`,{
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
export const deleteMaterial = createAsyncThunk(
    "delete/material",
    async(idMaterial,thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.delete(`${API_BASE_URL}/material/${idMaterial}`,{
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
export const createMaterial = createAsyncThunk(
    "create/material",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/material`,data,{
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
export const updateMaterial = createAsyncThunk(
    "update/material",
    async(data,thunkAPI) => {
      try {
        const token = sessionStorage.getItem(NAME_TOKEN);
        const response = await axios.patch(`${API_BASE_URL}/material`,data,{
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
    materials:[],
    loadingMaterial:false,
    errorMaterial:null
}
const materialSlice = createSlice({
    name:"materials",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getMaterials.pending, (state) => {
            state.loadingMaterial = true;
            state.errorMaterial = null;
            })
            .addCase(getMaterials.fulfilled, (state, action) => {
            state.loadingMaterial = false;
            state.materials = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getMaterials.rejected, (state, action) => {
            state.loadingMaterial = false;
            state.errorMaterial = action.payload;
            })
        builder
            .addCase(getMaterial.pending, (state) => {
            state.loadingMaterial = true;
            state.errorMaterial = null;
            })
            .addCase(getMaterial.fulfilled, (state, action) => {
            state.loadingMaterial = false;
            state.materials = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getMaterial.rejected, (state, action) => {
            state.loadingMaterial = false;
            state.errorMaterial = action.payload;
            })
        builder
            .addCase(createMaterial.pending, (state) => {
            state.loadingMaterial = true;
            state.errorMaterial = null;
            })
            .addCase(createMaterial.fulfilled, (state) => {
            state.loadingMaterial = false;
            })
            .addCase(createMaterial.rejected, (state, action) => {
            state.loadingMaterial = false;
            state.errorMaterial = action.payload;
            });
        builder
            .addCase(deleteMaterial.pending, (state) => {
            state.loadingMaterial = true;
            state.errorMaterial = null;
            })
            .addCase(deleteMaterial.fulfilled, (state) => {
            state.loadingMaterial = false;
            })
            .addCase(deleteMaterial.rejected, (state, action) => {
            state.loadingMaterial = false;
            state.errorMaterial = action.payload;
            });
        builder
            .addCase(updateMaterial.pending, (state) => {
            state.loadingMaterial = true;
            state.errorMaterial = null;
            })
            .addCase(updateMaterial.fulfilled, (state) => {
            state.loadingMaterial = false;
            })
            .addCase(updateMaterial.rejected, (state, action) => {
            state.loadingMaterial = false;
            state.errorMaterial = action.payload;
            });
        
    }
})
export default materialSlice.reducer;