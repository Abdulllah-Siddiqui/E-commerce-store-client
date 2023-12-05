import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';


const initialState = {
  products: [],
  topProducts: [],
  count: 0,
  totalPages: 0,
  loading: false,
  error: null,
  bulkUploadResult: null
};

export const fetchUserProducts = createAsyncThunk('products/fetchUserProducts', async ({ page, filter }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/products/getUserProducts', { page, filter });
    console.log('data in fetchUsers', response.data);
    return response.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, filter }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const body = {};
    body.page = page;
    body.filter = filter;

    const response = await axios.post(`http://localhost:4000/products/getProducts`,
      body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products', error);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const body = {};
    body.productId = productId;
    await axios.delete(`http://localhost:4000/products/deleteProduct/${productId}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    });
    return productId;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const data = new FormData();
    data.append('title', productData.title);
    data.append('price', productData.price);
    data.append('quantity', productData.quantity);
    data.append('rating', productData.rating);
    data.append('brand', productData.brand);
    data.append('images', productData.images);
    console.log('form Data', data)

    const response = await axios.post('http://localhost:4000/products/addProduct',
    data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    } );
    return response.data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (productData, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const response = await axios.patch(`http://localhost:4000/products/updateProduct`, 
    productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;

  } catch (error) {
    throw new Error('Failed to update product');
  }
});

export const getTopProducts = createAsyncThunk('products/getTopProducts', async () => {
  try {
    const response = await axios.get(`http://localhost:4000/products/getTopProducts`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to top products');
  }
});
export const addBulkProducts = createAsyncThunk('addBulkProducts', async(data, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;
  const res = await axios({
    method: 'post',
    url: 'http://localhost:4000/products/addBulkProducts',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data
  });

  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsStates: (state, { payload: { field, value } }) => {
      state[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        console.log('products in reducer:', state.products)
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("fetch products action rejected: ", action.error);
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.count = 1;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload.products);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.products);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.topProducts = [];
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload.products;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBulkProducts.pending, (state) => {
        state.error = null;
        state.bulkUploadResult = null;
      })
      .addCase(addBulkProducts.fulfilled, (state, action) => {
        state.bulkUploadResult = action.payload.bulkUploadResult;
      })
      .addCase(addBulkProducts.rejected, (state) => {
        state.bulkUploadResult = null;
      });
  },
},
);

const { reducer, actions } = productSlice;
export const { setProductsStates } = actions;
export default reducer;

