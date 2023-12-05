import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  notifications: [],
  body:[],
  loading: false,
  error: null,

};

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async (userID, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/notifications/fetchNotifications', { userID });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred while fetching notifications');
  }
});export const markaAsRead = createAsyncThunk('notification/markAsRead', async (notificationId, { rejectWithValue }) => {
  try {
    console.log('notification id in thunk', notificationId)
    const response = await axios.post('http://localhost:4000/notifications/markAsRead', { notificationId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});
export const selectNotifications = (state) => state.notifications.notifications;

export default notificationSlice.reducer;
