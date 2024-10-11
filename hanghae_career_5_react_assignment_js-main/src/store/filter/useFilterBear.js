import { create } from "zustand";
import { ALL_CATEGORY_ID } from "../../constants";

const useFilterStore = create(()=>({
  filterState: {
    minPrice: 0,
    maxPrice: 0,
    title: '',
    categoryId: ALL_CATEGORY_ID,
  },

  //filter
  setMinPrice: (minPrice) =>
    set((state) => ({
      filterState: { ...state.filterState, minPrice },
    })),
  setMaxPrice: (maxPrice) =>
    set((state) => ({
      filterState: { ...state.filterState, maxPrice },
    })),
  setTitle: (title) =>
    set((state) => ({
      filterState: { ...state.filterState, title },
    })),
  setCategoryId: (categoryId) =>
    set((state) => ({
      filterState: { ...state.filterState, categoryId },
    })),

  restFilter : () => 
    set({
      filterState : {
        minPrice: 0,
        maxPrice: 0,
        title: '',
        categoryId: ALL_CATEGORY_ID
      },
  }),
}));

export default useFilterStore