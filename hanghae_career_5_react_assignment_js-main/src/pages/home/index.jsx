import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import { Layout } from '@/pages/common/components/Layout';
import React, { Suspense, useEffect } from 'react';
import { ProductFilter } from './components/ProductFilter';
import { ProductList } from './components/ProductList';
import useUserBear from '../../store/auth/useAuthBear';
import Toast from '../../components/ui/Toast';

export const Home = () => {
  const { initializeAuth } = useUserBear() 

  useEffect(()=>{
    initializeAuth()
  },[initializeAuth])

  return (
    <Layout className="p-4">
      <ProductFilter />
      <ApiErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductList />
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(12)].map((_, index) => (
      <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ))}
  </div>
);
