import React from 'react'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN } from '@/constants';
import { auth } from '@/firebase';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import userAuthBear from '../../store/auth/useAuthBear';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const { setIsLogin, setUser } = userAuthBear();
  const navigate = useNavigate();

  // react-hook-form을 통해 상태 관리
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClickRegister = () => {
    navigate(pageRoutes.register);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      
      Cookies.set('accessToken', token, { expires: 7 });

      setIsLogin(true);
      setUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
      });

      navigate(pageRoutes.main);
    } catch (error) {
      console.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.', error);
    }
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                {...register('email', {
                  required: '이메일을 입력하세요',
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: '이메일 양식이 올바르지 않습니다'
                  }
                })}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                {...register('password', { required: '비밀번호를 입력하세요' })}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" aria-label="로그인">
            로그인
          </Button>
        </form>
        <Button variant="outline" className="w-full" onClick={handleClickRegister}>
          회원가입
        </Button>
      </div>
    </Layout>
  );
};
