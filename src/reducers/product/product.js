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
export const updateProduct = createAsyncThunk(
    "update/product",
    async(data,thunkAPI) => {
      try {
        const token = sessionStorage.getItem(NAME_TOKEN);
        const response = await axios.patch(`${API_BASE_URL}/product`,data,{
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
export const getProducts = createAsyncThunk(
    "get/products",
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/products/${data.page}`, {
                params: {
                    nameProduct: data.searchProduct,
                    materialList: data.materialList,
                    genderList: data.genderList,
                    minPrice: data.minPrice,
                    maxPrice: data.maxPrice,
                    maxAge:data.maxAge,
                    minAge:data.minAge,
                    size:data.size,
                    publicPerson:data.publicPerson
                },
                headers: {
                    "x-access-token": token,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getProductDescription = createAsyncThunk(
    "get/product/description",
    async (idProduct, thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/product/description/${idProduct}`, {
                headers: {
                    "x-access-token": token,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getProduct = createAsyncThunk(
    "get/product",
    async(idProduct,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/product/${idProduct}`,{
                headers: {
                    "x-access-token": token,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getProductImagens = createAsyncThunk(
    "get/product/imagens",
    async(idProduct,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/product/imagens/${idProduct}`,{
                headers: {
                    "x-access-token": token,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    "delete/product",
    async(idProduct,thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.delete(`${API_BASE_URL}/product/${idProduct}`,{
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
export const deleteImagenProduct = createAsyncThunk(
    "delete/imagen/product",
    async(idImagen,thunkAPI) => {
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.delete(`${API_BASE_URL}/product/imagen/${idImagen}`,{
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
const initialState = {
    products:[],
    imagensProduct:[],
    loadingProducts:false,
    error:null
}
const materialSlice = createSlice({
    name:"products",
    initialState:initialState,
    reducers:{
        clearImagensLists: (state) => {
            state.products = [];
            state.imagensProduct = [];
        },
    },
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
        builder
            .addCase(updateProduct.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
            state.loadingProducts = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
        builder
            .addCase(getProducts.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
            state.loadingProducts = false;
            state.products = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getProducts.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
        builder
            .addCase(getProduct.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
            state.loadingProducts = false;
            state.products = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getProduct.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
        builder
            .addCase(getProductDescription.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(getProductDescription.fulfilled, (state, action) => {
            state.loadingProducts = false;
            state.products = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getProductDescription.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
        builder
            .addCase(getProductImagens.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(getProductImagens.fulfilled, (state, action) => {
            state.loadingProducts = false;
            state.imagensProduct = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getProductImagens.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
        builder
            .addCase(deleteImagenProduct.pending, (state) => {
            state.loadingProducts = true;
            state.error = null;
            })
            .addCase(deleteImagenProduct.fulfilled, (state) => {
            state.loadingProducts = false;
            })
            .addCase(deleteImagenProduct.rejected, (state, action) => {
            state.loadingProducts = false;
            state.error = action.payload;
            });
         
    }
});
export const { clearImagensLists } = materialSlice.actions;
export default materialSlice.reducer;