import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
// import { useAppSelector } from '@/store/hooks';
import React from 'react';
import cartBear from '../../store/cart/cartBear';


export const Cart = () => {
  // const cart = useAppSelector(selectCart);
    const { cart } = cartBear()

  const isExist = cart.length > 0;

  return (
    <Layout
      className="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};
