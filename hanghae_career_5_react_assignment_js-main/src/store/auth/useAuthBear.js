import { create } from "zustand";
import { registerUserAPI } from "../../api/auth";

const useUserAuth = create((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // 로그인
  setIsLogin: () => set({ isLogin : true }),
  setUser: (user) => set({ user, isLogin: true }),
  setLogOut: () => set({ isLogin: false, user: null }),

  // 회원가입
  registerUser: async ({ email, password, name }) => {
    set({ registerStatus: 'loading', registerError: null });
    try {
      const userData = await registerUserAPI(email, password, name);
      set({ registerStatus: 'succeeded', user: userData, isLogin: true });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({ registerStatus: 'failed', registerError: errorMsg });
    }
  },
}));

export const selectIsLogin = (state) => state.isLogin;
export const selectIsUser = (state) => state.user;

export default useUserAuth;
