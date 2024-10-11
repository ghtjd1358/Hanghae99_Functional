// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchProducts, addProductAPI } from '../../api/product'

// export const loadProducts = createAsyncThunk(
//   'products/loadProducts',
//   async ({ filter, pageSize, page, isInitial }, { rejectWithValue }) => {
//     try {
//       const result = await fetchProducts(filter, pageSize, page);
//       return { ...result, isInitial };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const newProduct = await addProductAPI(productData);
//       return newProduct;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   items: [],
//   hasNextPage: true,
//   isLoading: false,
//   error: null,
//   totalCount: 0,
// };

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loadProducts.fulfilled, (state, action) => {
//         const { products, hasNextPage, totalCount, isInitial } = action.payload;
//         state.items = isInitial ? products : [...state.items, ...products];
//         state.hasNextPage = hasNextPage;
//         state.totalCount = totalCount;
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(loadProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(addProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.items.unshift(action.payload);
//         state.totalCount += 1;
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(addProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || '상품 등록에 실패하였습니다.';
//       });
//   },
// });

// export const selectProducts = (state) => state.products.items;
// export const selectHasNextPage = (state) => state.products.hasNextPage;
// export const selectIsLoading = (state) => state.products.isLoading;
// export const selectError = (state) => state.products.error;
// export const selectTotalCount = (state) => state.products.totalCount;


// export default productsSlice.reducer;
