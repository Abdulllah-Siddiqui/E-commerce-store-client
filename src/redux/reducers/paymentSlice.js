import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  methods: [],
  stripeCardId: null,
  loading: false,
  error: null,

};

export const addPaymentMethod = createAsyncThunk('payment/addPaymentMethod', async (newMethod, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:4000/payment/addPaymentMethod', newMethod);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchPaymentMethods = createAsyncThunk('payment/getPaymentMethod', async (userID, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/payment/getPaymentMethod', { userID });
    console.log('user id in payment method', userID);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        console.log('Stripe payload: ', action.payload);
        console.log('Local payload: ', action.payload);
        state.loading = false;
        state.methods.push(action.payload.savedCard);
        state.stripeCardId = action.payload.stripeCard.id;
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.methods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default paymentSlice.reducer;
