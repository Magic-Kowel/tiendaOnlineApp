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
export const getSizesVariation = createAsyncThunk(
    "get/sizes/variation",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/sizes/variation`,{
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
export const createSizesVariation = createAsyncThunk(
    "create/size/variation",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/size/variation`,data,{
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
export const deleteSizesVariation = createAsyncThunk(
    "delete/size/variation",
    async(idSizeVariation,thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.delete(`${API_BASE_URL}/size/variation/${idSizeVariation}`,{
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
export const getSizeVariation = createAsyncThunk(
    "get/size/variation",
    async(idSizeVariation,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/size/variation/${idSizeVariation}`,{
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
export const updateSizeVariation = createAsyncThunk(
    "update/size/variation",
    async(data,thunkAPI) => {
      try {
        const token = sessionStorage.getItem(NAME_TOKEN);
        const response = await axios.patch(`${API_BASE_URL}/size/variation`,data,{
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
export const sizeVariationValidate = createAsyncThunk(
    "size/variation/validate",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/size/variation/validate`,data,{
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
export const getSizesVariationDisplay = createAsyncThunk(
    "get/sizes/variation/display",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/size/opcions/variation`,{
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
export const getSizeVariationProdruct = createAsyncThunk(
    "get/sizes/variation/product",
    async(idProduct,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/size/variation/prodruct/${idProduct}`,{
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
    sizes:[],
    sizeVariation:[],
    sizeVariationProduct:[],
    variationValidate:false,
    loadingSize:false,
    errorSize:null
}
const sizeSlice = createSlice({
    name:"size",
    initialState:initialState,
    reducers:{
        cancelVariationValidate: (state) => {
            state.variationValidate = false
        },
    },
    extraReducers:(builder) =>{
        builder
            .addCase(getSizes.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSizes.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizes = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSizes.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(getSize.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSize.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizes = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSize.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(createSize.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(createSize.fulfilled, (state) => {
            state.loadingSize = false;
            })
            .addCase(createSize.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(deleteSize.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(deleteSize.fulfilled, (state) => {
            state.loadingSize = false;
            })
            .addCase(deleteSize.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(updateSize.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(updateSize.fulfilled, (state) => {
            state.loadingSize = false;
            })
            .addCase(updateSize.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(getSizesVariation.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSizesVariation.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizeVariation = action.payload.length > 0 ? action.payload : [];
            
            })
            .addCase(getSizesVariation.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            // ... Otros casos ...
            .addCase(createSizesVariation.pending, (state) => {
                state.loadingSize = true;
                state.errorSize = null;
            })
            .addCase(createSizesVariation.fulfilled, (state) => {
                state.loadingSize = false;
            })
            .addCase(createSizesVariation.rejected, (state, action) => {
                state.loadingSize = false;
                state.errorSize = action.payload;
            });
        builder
            .addCase(deleteSizesVariation.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(deleteSizesVariation.fulfilled, (state) => {
            state.loadingSize = false;
            })
            .addCase(deleteSizesVariation.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(getSizeVariation.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSizeVariation.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizeVariation = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSizeVariation.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(updateSizeVariation.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(updateSizeVariation.fulfilled, (state) => {
            state.loadingSize = false;
            })
            .addCase(updateSizeVariation.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(sizeVariationValidate.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(sizeVariationValidate.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.variationValidate = action.payload > 0 ? true : false;
            })
            .addCase(sizeVariationValidate.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(getSizesVariationDisplay.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSizesVariationDisplay.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizeVariation = action.payload.length > 0 ? action.payload : false;
            })
            .addCase(getSizesVariationDisplay.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
        builder
            .addCase(getSizeVariationProdruct.pending, (state) => {
            state.loadingSize = true;
            state.errorSize = null;
            })
            .addCase(getSizeVariationProdruct.fulfilled, (state, action) => {
            state.loadingSize = false;
            state.sizeVariationProduct = action.payload.length > 0 ? action.payload : false;
            })
            .addCase(getSizeVariationProdruct.rejected, (state, action) => {
            state.loadingSize = false;
            state.errorSize = action.payload;
            });
    }
})
export const { cancelVariationValidate } = sizeSlice.actions;
export default sizeSlice.reducer;