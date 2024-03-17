import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL,NAME_TOKEN } from "../../config";
export const validateEmail = createAsyncThunk(
  "validate/email",
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/email/${email}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const createUser = createAsyncThunk(
  "create/user",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const loginValidate = createAsyncThunk(
  "loginValidate/user",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const getUser = createAsyncThunk(
  "get/user",
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${uid}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const getUsers = createAsyncThunk(
  "get/users",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const validateUser = createAsyncThunk(
  "validate/user",async (uid, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/validate`, {uid:uid});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const getMenuUser = createAsyncThunk(
  "menu/user", async(uid,thunkAPI) =>{
    try {
      const response = await axios.post(`${API_BASE_URL}/user/menu`,{idUser:uid});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const createMaterial = createAsyncThunk(
  "create/user/admind",
  async(data,thunkAPI) =>{
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.post(`${API_BASE_URL}/user/create`,data,{
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
  users: [],
  loadingUser: false,
  errorUser: null,
}
const productSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createUser.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
      builder
        .addCase(getUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});
  
export default productSlice.reducer;