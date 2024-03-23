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
export const validateEmailExist = createAsyncThunk(
  "validate/email/exist",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/email/${data.email}/${data.idUser}`);
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
export const getUserProcess = createAsyncThunk(
  "get/user/process",
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/process/${uid}`);
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
export const getUsersTypes = createAsyncThunk(
  "get/users/types",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/types`);
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
export const createUserAdmind = createAsyncThunk(
  "create/user/admind",
  async(data,thunkAPI) =>{
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.post(`${API_BASE_URL}/user/admind`,data,{
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
export const updateUser = createAsyncThunk(
  "update/user",
  async(data,thunkAPI) =>{
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.patch(`${API_BASE_URL}/user/admind`,data,{
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
export const deleteUser = createAsyncThunk(
  "delete/user",
  async(idUser,thunkAPI) => {
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.delete(`${API_BASE_URL}/user/delete/${idUser}`,{
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
export const sendResetPasswort = createAsyncThunk(
  "send/reset/passwort",
  async(idUser,thunkAPI) =>{
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.post(`${API_BASE_URL}/user/send/reset/passwort`,{idUser},{
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
export const resetPasswort = createAsyncThunk(
  "reset/passwort",
  async(data,thunkAPI) =>{
      try {
          const token = sessionStorage.getItem(NAME_TOKEN);
          const response = await axios.patch(`${API_BASE_URL}/user/reset/passwort`,data,{
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
  usersTypes: [],
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
          state.loadingUser = true;
          state.errorUser = null;
        })
        .addCase(createUser.fulfilled, (state) => {
          state.loadingUser = false;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loadingUser = false;
          state.errorUser = action.payload;
        });
      builder
        .addCase(getUsers.pending, (state) => {
          state.loadingUser = true;
          state.errorUser = null;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.loadingUser = false;
          state.users = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.loadingUser = false;
          state.errorUser = action.payload;
        });
      builder
        .addCase(getUsersTypes.pending, (state) => {
          state.loadingUser = true;
          state.errorUser = null;
        })
        .addCase(getUsersTypes.fulfilled, (state, action) => {
          state.loadingUser = false;
          state.usersTypes = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getUsersTypes.rejected, (state, action) => {
          state.loadingUser = false;
          state.errorUser = action.payload;
        });
      builder
        .addCase(getUser.pending, (state) => {
          state.loadingUser = true;
          state.errorUser = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.loadingUser = false;
          state.users = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getUser.rejected, (state, action) => {
          state.loadingUser = false;
          state.errorUser = action.payload;
        });
      builder
        .addCase(getUserProcess.pending, (state) => {
          state.loadingUser = true;
          state.errorUser = null;
        })
        .addCase(getUserProcess.fulfilled, (state, action) => {
          state.loadingUser = false;
          state.users = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(getUserProcess.rejected, (state, action) => {
          state.loadingUser = false;
          state.errorUser = action.payload;
        });
    },
});
  
export default productSlice.reducer;