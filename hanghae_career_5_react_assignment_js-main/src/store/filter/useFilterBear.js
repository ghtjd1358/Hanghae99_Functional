import { create } from "zustand";
import { ALL_CATEGORY_ID } from "../../constants";

const useFilterStore = create(()=>({
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  //filter
  setMinPrice : (minPrice) =>set({minPrice}),
  setMaxPrice : (maxPrice) =>set({maxPrice}),
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  restFilter : () => set({
    minPrice: 0,
    maxPrice: 0,
    title: '',
    categoryId: ALL_CATEGORY_ID
  }),
}));

export default useFilterStore