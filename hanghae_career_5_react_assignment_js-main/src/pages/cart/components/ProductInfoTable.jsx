import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductInfoTableRow } from '@/pages/cart/components/ProductInfoTableRow';
import React from 'react';
import useAuthBear from '../../../store/auth/useAuthBear';
// import { selectCart } from '../../../store/cart/cartSlice';
import cartBear from '../../../store/cart/cartBear'


export const ProductInfoTable = () => {
  // const cart = useAppSelector(selectCart); 
  const { user } = useAuthBear();
  const { cart } = cartBear()
  console.log(cart)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>갯수</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>삭제하기</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item) => (
          <ProductInfoTableRow key={item.id} item={item} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};
