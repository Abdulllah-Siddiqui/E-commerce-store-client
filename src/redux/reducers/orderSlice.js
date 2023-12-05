import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  sortedOrders: [], 
  dashboardStats: [],
  todayStats: [],
  sevenDayStats: [],
  thirtyDayStats: [],
  topSellingProducts: [],
  statsOfYear: [],
  cardID:null,
  loading: false,
  totalAmount: 0,
  totalUnits: 0,
  totalOrders: 0,
  totalPages: 0,
  error: null,
};

export const placeOrder = createAsyncThunk('orders/placeOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/orders/placeOrder', orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ userID, page }, { rejectWithValue }) => {
  console.log(userID);
  try {
    const response = await axios.post('http://localhost:4000/orders/fetchOrders', { userID, page });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/orders/fetchAllOrders', page);
    const totalPages = response.data.totalPages;
    const sortedOrders = response.data.orders.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log('total pages in think', response.data.totalPages)
    return { sortedOrders, totalPages };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchOrdersDetails = createAsyncThunk('orders/orderDetails', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/orders/orderDetails');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateOrdersAction = createAsyncThunk('orders/orderAction', async ( {orderID}, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/orders/orderAction', {orderID} );
    return {orderID};
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchDashboardStats = createAsyncThunk('orders/dashboardStats', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/jobs/dashboardStats');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addNewCard = createAsyncThunk('orders/addNewCard', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/orders/addNewCard');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.sortedOrders = action.payload.sortedOrders;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersDetails.fulfilled, (state, action) => {
        state.loading = false;
        // console.log('12345',action.payload)
        state.totalAmount = action.payload.totalAmount;
        state.totalUnits = action.payload.totalUnits;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchOrdersDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        console.log('stats', action.payload);
        state.dashboardStats = action.payload;
        state.todayStats = action.payload[0]?.todayStats;
        state.sevenDayStats = action.payload[0]?.sevenDayStats;
        state.thirtyDayStats = action.payload[0]?.thirtyDayStats;
        state.statsOfYear = action.payload[0]?.statsOfYear;
        state.topSellingProducts = action.payload[0]?.topSellingOrders;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardID = action.payload.id;
      })
      .addCase(addNewCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;


