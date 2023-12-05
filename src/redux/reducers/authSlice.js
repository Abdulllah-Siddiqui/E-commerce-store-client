import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  user: {},
  loading: false,
  error: null,
  success: false,
  isAdmin: false,
  isLoggedIn: false,
};

export const userLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/login', {
      email: data.email,
      password: data.password,

    });
    const { token, user } = response.data;

    window.localStorage.setItem('name', response.data.user.name)
    window.localStorage.setItem('userImg', response.data.user.image)
    return { token, user };
  } catch (error) {
    rejectWithValue(error)
  }
})


export const userSignup = createAsyncThunk('user/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/signup', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/forgotPassword', email);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async ({token, password}, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/resetPassword', {token, password});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const verifyToken = createAsyncThunk('user/verifyToken', async (token, { rejectWithValue }) => {
  try {
    console.log('token in thunk', token)
    const response = await axios.post('http://localhost:4000/auth/verifyToken', {token});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const isVerified = createAsyncThunk('user/isVerified', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/isVerified', {token});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.token = true;

    },
    logout: (state) => {
      state.token = false;
      state.isLoggedIn = false;
      state.isAdmin = false;
      localStorage.clear();
    },
    setAuthStates: (state, { payload: { field, value } }) => {
      state[field] = value;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        console.log('user in login Slice', state.user);
        state.token = action.payload.token;
        console.log('tokrn in login Slice', state.token);

        state.isAdmin = action.payload.user.isAdmin;
        console.log('isAdmin in login Slice', state.isAdmin);
        state.isLoggedIn = true;
        console.log('state.success', state.success);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload ? action.payload.message : 'Login failed';
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

const { reducer, actions } = authSlice;
export const { login, logout, setAuthStates } = actions;
export default reducer;
