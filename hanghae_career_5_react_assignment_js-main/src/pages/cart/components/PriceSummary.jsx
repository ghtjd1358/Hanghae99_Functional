import { pageRoutes } from '@/apiRoutes';
import { Button } from '@/components/ui/button';
// import { selectTotalCount, selectTotalPrice } from '@/store/cart/cartSelectors';
// import { useAppSelector } from '@/store/hooks';
import { formatNumber, formatPrice } from '@/utils/formatter';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { selectTotalCount, selectTotalPrice } from '../../../store/cart/cartSlice';
import cartBear from '../../../store/cart/cartBear'

export const PriceSummary = () => {
  const navigate = useNavigate();
  // const totalCount = useAppSelector(selectTotalCount);
  // const totalPrice = useAppSelector(selectTotalPrice);
  const { totalCount, totalPrice } = cartBear()

  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <div className="pt-4 flex flex-col items-end">
      <p>
        총 {formatNumber(totalCount)}개, {formatPrice(totalPrice)}
      </p>
      <Button onClick={handleClickPurchase} className="mt-2">
        구매하기
      </Button>
    </div>
  );
};
