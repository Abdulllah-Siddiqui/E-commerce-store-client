
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  cartLength: 0,
  loading: false,
  error: null,
};

export const addToCart = createAsyncThunk('cart/addToCart', async (item, thunkAPI) => {
  try {
    await axios.post('http://localhost:4000/cart/addToCart', item);
    console.log('cartItems:', item);
    return item;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userID) => {
try {
  const response = await axios.post(`http://localhost:4000/cart/getCart`, { userID });
  console.log('fetchUserCart',response.data);
  return response.data;
} catch (error) {
  throw new Error('Failed to fetch user cart');
}
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ cartID }) => {
  try {
    await axios.post('http://localhost:4000/cart/deleteCart', { cartID });
    return { cartID };
  } catch (error) {
    throw new Error('Failed to delete item from the cart');
  }
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ itemID, key }) => {
  try {
    await axios.post('http://localhost:4000/cart/updateQuantity', { itemID, key });
    return { itemID, key };
  } catch (error) {
    throw new Error('Failed to update quantity');
  }
});

export const emptyCart = createAsyncThunk('cart/emptyCart', async ({ userID }) => {
  try {
    const response = await axios.post('http://localhost:4000/cart/emptyCart', { userID });
    return { userID };
  } catch (error) {
    throw new Error('Failed to empty user cart');
  }
});


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    nullCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.cartLength = action.payload.length;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload.cartID);
        state.cartLength = state.cartLength > 0 ? state.cartLength - 1 : 0;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCartItem = action.payload;
        if (state.cart) {
          const index = state.cart.findIndex(item => item._id === updatedCartItem._id);
          if (index !== -1) {
            state.cart[index] = updatedCartItem;
          }
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(emptyCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartLength = 0;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { incrementCartItemQuantity, decrementCartItemQuantity } = cartSlice.actions;
export const { nullCart } = cartSlice.actions;

export default cartSlice.reducer;

