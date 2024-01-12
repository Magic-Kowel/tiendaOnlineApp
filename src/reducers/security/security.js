import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL, NAME_TOKEN } from "../../config";
export const getStatus = createAsyncThunk(
    "get/status",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/status`,{
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
export const getMenus = createAsyncThunk(
    "get/menus",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/menus`,{
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
export const getMenusActive = createAsyncThunk(
    "get/menus/active",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/menus/active`,{
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
export const getMenu = createAsyncThunk(
    "get/menu",
    async(id,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/menu/${id}`,{
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
export const createMenu = createAsyncThunk(
    "create/menu",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/menu`,data,{
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
export const updateMenu = createAsyncThunk(
    "update/menu",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.patch(`${API_BASE_URL}/menu`,data,{
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
export const getSubMenus = createAsyncThunk(
    "get/submenus",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/submenus`,{
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
export const getSubMenusActive = createAsyncThunk(
    "get/submenus/active",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/submenus/active`,{
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
export const getSubMenu = createAsyncThunk(
    "get/submenu",
    async(id,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/submenu/${id}`,{
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
export const createSubMenu = createAsyncThunk(
    "create/submenu",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/submenu`,data,{
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
export const updateSubMenu = createAsyncThunk(
    "update/submenu",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.patch(`${API_BASE_URL}/submenu`,data,{
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
export const createViewUser = createAsyncThunk(
    "user/view",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/user/view`,data,{
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
    status:[],
    menu:[],
    submenu:[],
    loading:false,
    error:null
}
const securitySlice = createSlice({
    name:"security",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getMenus.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getMenus.fulfilled, (state, action) => {
            state.loading = false;
            state.menu = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getMenus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getMenusActive.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getMenusActive.fulfilled, (state, action) => {
            state.loading = false;
            state.menu = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getMenusActive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(createMenu.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(createMenu.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(createMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(updateMenu.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(updateMenu.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(updateMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getSubMenus.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getSubMenus.fulfilled, (state, action) => {
            state.loading = false;
            state.submenu = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSubMenus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getSubMenusActive.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getSubMenusActive.fulfilled, (state, action) => {
            state.loading = false;
            state.submenu = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSubMenusActive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(createSubMenu.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(createSubMenu.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(createSubMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(updateSubMenu.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(updateSubMenu.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(updateSubMenu.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(createViewUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(createViewUser.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(createViewUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    
    }
})
export default securitySlice.reducer;