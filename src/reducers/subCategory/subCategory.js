import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL, NAME_TOKEN } from "../../config";

export const getSubcategories = createAsyncThunk(
    "get/subcategories",
    async(idCategory,thunkAPI) =>{
        try {
            const response = await axios.get(`${API_BASE_URL}/subcategories/${idCategory}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getSubcategory= createAsyncThunk(
  "get/subcategory",
  async(idSubcategory,thunkAPI) =>{
      try {
          const response = await axios.get(`${API_BASE_URL}/subcategory/${idSubcategory}`);
          return response.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);
export const createSubcategory = createAsyncThunk(
    "create/subcategory",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/subcategory`,data,
            {
                headers: {
                  "x-access-token": token
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const updateSubcategory = createAsyncThunk(
  "update/subcategory",
  async(data,thunkAPI) =>{
    try {
      const token = sessionStorage.getItem(NAME_TOKEN);
      const response = await axios.patch(`${API_BASE_URL}/subcategory`,data,
      {
          headers: {
            "x-access-token": token
          }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const deleteCategory = createAsyncThunk(
    "delete/subcategory",
    async(id,thunkAPI) => {
      try {
        const token = sessionStorage.getItem(NAME_TOKEN);
        const response = await axios.delete(`${API_BASE_URL}/subcategory/${id}`,{
          headers: {
            "x-access-token": token
          }
        })
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  )
const initialState = {
    subcategories:[],
    loading:false,
    error:null
}
const subcategorySlice = createSlice({
    name:"subcategory",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
      builder
        .addCase(getSubcategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getSubcategories.fulfilled, (state, action) => {
          state.loading = false;
          state.subcategories = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getSubcategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
      builder
        .addCase(getSubcategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getSubcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.subcategories = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getSubcategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    builder
        .addCase(createSubcategory.pending,(state) => {
          state.loading = true;
          state.error =null
        })
        .addCase(createSubcategory.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(createSubcategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    builder
        .addCase(deleteCategory.pending,(state) => {
            state.loading = true;
            state.error =null
        })
        .addCase(deleteCategory.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export default subcategorySlice.reducer;