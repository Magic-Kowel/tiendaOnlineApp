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
export const createPermissionsUser = createAsyncThunk(
    "create/permissions/type/user",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/user/permissions/type/user`,data,{
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
export const getTypeUserPermissions = createAsyncThunk(
    "get/type/user/permissions",
    async(id,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/user/type/permissions/${id}`,{
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
export const getAccessControl = createAsyncThunk(
    "get/type/access/control",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/user/access/control`,{
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
export const getAccessControlMenu = createAsyncThunk(
    "get/type/access/control/menu",
    async(typeUser,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/user/access/control/menu/${typeUser}`,{
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
export const createAccessControlMenu = createAsyncThunk(
    "create/type/access/control/menu",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.post(`${API_BASE_URL}/user/access/control/menu/`,data,{
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
export const getAccessControlMenuPermissions = createAsyncThunk(
    "create/type/access/control/menu/permissions",
    async(typeUser,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/user/access/control/menu/permissions/${typeUser}`,{
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
export const getSubMenuPermission = createAsyncThunk(
    "get/subMenu/permission",
    async(idTypeUser,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/submenu/permission/${idTypeUser}`,{
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
export const getUserTypePermissions = createAsyncThunk(
    "/type/user/permissions",
    async(thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/type/user/permissions`,{
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
export const getPermissionTypeUser = createAsyncThunk(
    "/permission/type/user",
    async(idTypeUserPermission,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.get(`${API_BASE_URL}/permission/type/user/${idTypeUserPermission}`,{
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
export const updatePermissionTypeUser = createAsyncThunk(
    "/permission/type/user/update",
    async(data,thunkAPI) =>{
        try {
            const token = sessionStorage.getItem(NAME_TOKEN);
            const response = await axios.patch(`${API_BASE_URL}/permission/type/user/`,data,{
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
    submenuTypeUser:[],
    listAccessControl:[],
    listAccessControlMenu:[],
    listAccessControlMenuPermissions:[],
    userPermissions:[],
    permissions:[],
    loading:false,
    error:null
}
const securitySlice = createSlice({
    name:"security",
    initialState:initialState,
    reducers:{
        clearListTransferPermission: (state) => {
            state.listAccessControlMenu = [];
            state.listAccessControlMenuPermissions =[];
        },
    },
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
            .addCase(createPermissionsUser.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(createPermissionsUser.fulfilled, (state) => {
              state.loading = false;
            })
            .addCase(createPermissionsUser.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getTypeUserPermissions.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getTypeUserPermissions.fulfilled, (state,action) => {
              state.loading = false;
              state.userPermissions = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getTypeUserPermissions.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getAccessControl.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getAccessControl.fulfilled, (state,action) => {
              state.loading = false;
              state.listAccessControl = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getAccessControl.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getAccessControlMenu.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getAccessControlMenu.fulfilled, (state,action) => {
              state.loading = false;
              state.listAccessControlMenu = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getAccessControlMenu.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getSubMenuPermission.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getSubMenuPermission.fulfilled, (state,action) => {
              state.loading = false;
              state.submenuTypeUser = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getSubMenuPermission.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getUserTypePermissions.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getUserTypePermissions.fulfilled, (state,action) => {
              state.loading = false;
              state.userPermissions = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getUserTypePermissions.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(getPermissionTypeUser.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getPermissionTypeUser.fulfilled, (state,action) => {
              state.loading = false;
              state.permissions = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getPermissionTypeUser.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
        builder
            .addCase(updatePermissionTypeUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(updatePermissionTypeUser.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(updatePermissionTypeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        builder
            .addCase(getAccessControlMenuPermissions.pending, (state) => {
              state.loadingUser = true;
              state.error = null;
            })
            .addCase(getAccessControlMenuPermissions.fulfilled, (state,action) => {
              state.loading = false;
              state.listAccessControlMenuPermissions = action.payload.length > 0 ? action.payload : [];
            })
            .addCase(getAccessControlMenuPermissions.rejected, (state, action) => {
              state.loadingUser = false;
              state.error = action.payload;
            });
    }
})
export default securitySlice.reducer;
export const { clearListTransferPermission } = securitySlice.actions;