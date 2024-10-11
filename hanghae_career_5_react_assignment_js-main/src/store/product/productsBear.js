import { create } from "zustand";
import { fetchProducts, addProductAPI } from "../../api/product";

// zustand 스토어 생성
const useProductsStore = create((set) => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  // 제품 리스트 로드
  loadProducts: async ({ filter, pageSize, page, isInitial }) => {
    set({ isLoading: true, error: null });

    try {
      const result = await fetchProducts(filter, pageSize, page);
      const { products, hasNextPage, totalCount } = result;

      set((state) => ({
        items: isInitial ? products : [...state.items, ...products],
        hasNextPage,
        totalCount,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  // 제품 추가
  addProduct: async (productData) => {
    set({ isLoading: true, error: null });

    try {
      const newProduct = await addProductAPI(productData);

      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message || '상품 등록에 실패하였습니다.' });
    }
  },
}));

export default useProductsStore;
