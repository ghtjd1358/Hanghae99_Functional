import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // react-hook-form import
import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN } from '@/constants';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import useAuthBear from '../../store/auth/useAuthBear';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerStatus, registerUser, registerError } = useAuthBear();
  // const [errors, setErrors] = useState({});

  // react-hook-form hooks
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      navigate(pageRoutes.login);
    }
  }, [registerStatus, navigate]);

  const onSubmit = async (data) => {
    try {
      await registerUser({ email: data.email, password: data.password, name: data.name });
      console.log('가입 성공!');
      navigate(pageRoutes.login);
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.', error);
    }
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="name"
                type="text"
                className="pl-10"
                {...register('name', { required: '이름을 입력하세요' })}
              />
            </div>
            {formErrors.name && (
              <p className="text-sm text-red-500">{formErrors.name.message}</p>
            )}
          </div>
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
                    message: '이메일 양식이 올바르지 않습니다',
                  },
                })}
              />
            </div>
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email.message}</p>
            )}
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
            {formErrors.password && (
              <p className="text-sm text-red-500">{formErrors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={registerStatus === 'loading'}
          >
            {registerStatus === 'loading' ? '가입 중...' : '회원가입'}
          </Button>
          {registerError && (
            <p className="text-sm text-red-500">{registerError}</p>
          )}
        </form>
      </div>
    </Layout>
  );
};
