import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL, NAME_TOKEN } from "../../config";

export const getCategories = createAsyncThunk(
    "get/categories",
    async (thunkAPI) =>{
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getCategory = createAsyncThunk(
  "get/category",
  async (id,thunkAPI) =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const createCategory = createAsyncThunk(
  "create/category",
  async(data,thunkAPI) => {
    try {
      const token = sessionStorage.getItem(NAME_TOKEN);
      const response = await axios.post(`${API_BASE_URL}/category`,data,{
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
export const updateCategory = createAsyncThunk(
  "update/category",
  async(data,thunkAPI) => {
    try {
      const token = sessionStorage.getItem(NAME_TOKEN);
      const response = await axios.patch(`${API_BASE_URL}/category`,data,{
        headers:{
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
  "delete/category",
  async(id,thunkAPI) => {
    try {
      const token = sessionStorage.getItem(NAME_TOKEN);
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`,{
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
    categorys:[],
    loading:false,
    error:null
}
const categorySlice = createSlice({
    name:"category",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
          .addCase(getCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categorys = action.payload.length > 0 ? action.payload : [];
          })
          .addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        builder
          .addCase(getCategory.pending,(state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(getCategory.fulfilled,(state,action)=>{
            state.loading = false;
            state.categorys = action.payload.length > 0 ? action.payload : [];
          })
          .addCase(getCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        builder
          .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteCategory.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        builder
          .addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createCategory.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        builder
          .addCase(updateCategory.pending,(state) => {
            state.loading = true;
            state.error =null
          })
          .addCase(updateCategory.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
});
export default categorySlice.reducer;