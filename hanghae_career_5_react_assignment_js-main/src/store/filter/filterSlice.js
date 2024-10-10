import { createSlice, createAction } from '@reduxjs/toolkit';
import { ALL_CATEGORY_ID } from '@/constants';

const initialState = {
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setMinPrice, (state, action) => {
        state.minPrice = action.payload;
      })
      .addCase(setMaxPrice, (state, action) => {
        state.maxPrice = action.payload;
      })
      .addCase(setTitle, (state, action) => {
        state.title = action.payload;
      })
      .addCase(setCategoryId, (state, action) => {
        state.categoryId = action.payload;
      })
      .addCase(resetFilter, () => initialState);
  },
});

export const setMinPrice = createAction('filter/setMinPrice');
export const setMaxPrice = createAction('filter/setMaxPrice');
export const setTitle = createAction('filter/setTitle');
export const setCategoryId = createAction('filter/setCategoryId');
export const resetFilter = createAction('filter/resetFilter');

export const selectMinPrice = (state) => state.filter.minPrice;
export const selectMaxPrice = (state) => state.filter.maxPrice;
export const selectTitle = (state) => state.filter.title;
export const selectCategoryId = (state) => state.filter.categoryId;
export const selectFilter = (state) => state.filter;


export default filterSlice.reducer;
