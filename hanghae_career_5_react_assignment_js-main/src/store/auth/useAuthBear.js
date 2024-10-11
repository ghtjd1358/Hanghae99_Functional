import { create } from "zustand";
import { registerUserAPI } from "../../api/auth";
import Cookies from 'js-cookie'

const useUserAuth = create((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  initializeAuth: () => {
    const token = Cookies.get('accessToken');
    const user = Cookies.get('user');
    if (token && user) {
    set({ isLogin: true, user: JSON.parse(user) });
    }
    },

  // 로그인
  setIsLogin: (isLogin) => {
    set({ isLogin });
    if (!isLogin) {
    Cookies.remove('accessToken'); // 로그아웃 시 쿠키 삭제
    Cookies.remove('user');
    }
    },
    setUser: (user) => {
      set({ user, isLogin: true });
      Cookies.set('user', JSON.stringify(user), { expires: 7 }); // 쿠키에 사용자 정보 저장
      },
      setLogout: () => {
        set({ isLogin: false, user: null });
        Cookies.remove('accessToken'); // 쿠키에서 로그인 정보 삭제
        Cookies.remove('user');
        },

  // 회원가입
  registerUser: async ({ email, password, name }) => {
    set({ registerStatus: 'loading', registerError: null });
    try {
      const userData = await registerUserAPI(email, password, name);
      set({ registerStatus: 'succeeded', user: userData, isLogin: true });
      Cookies.set('accessToken', userData.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(userData.user), { expires: 7 });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({ registerStatus: 'failed', registerError: errorMsg });
      set({ registerStatus: 'failed', registerError: errorMsg });
    }
  },
}));


export default useUserAuth;
