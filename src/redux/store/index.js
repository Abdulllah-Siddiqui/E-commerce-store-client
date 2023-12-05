import thunk from 'redux-thunk';
import authReducer from '../reducers/authSlice';
import productReducer from '../reducers/productSlice';
import cartReducer from '../reducers/cartSlice';
import addressReducer from '../reducers/addressSlice';
import paymentReducer from '../reducers/paymentSlice';
import orderReducer from '../reducers/orderSlice';
import notificationReducer from '../reducers/notificationSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { notification } from 'antd';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'product', 'order']
};

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  payment: paymentReducer,
  order: orderReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true
});
