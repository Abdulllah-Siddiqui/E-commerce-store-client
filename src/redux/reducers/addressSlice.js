import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

export const addAddress = createAsyncThunk('address/addAddress', async (newAddress, { rejectWithValue }) => {
  try {
    await axios.post('http://localhost:4000/address/addAddress', newAddress);
    return newAddress;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchAddress = createAsyncThunk('address/fetchUserAddresses', async (userID, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/address/getAddress', { userID });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
