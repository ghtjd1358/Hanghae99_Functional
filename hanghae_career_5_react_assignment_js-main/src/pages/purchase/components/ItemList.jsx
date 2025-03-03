import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
// import { useAppSelector } from '@/store/hooks';
import { formatPrice } from '@/utils/formatter';
// import { selectCart } from '../../../store/cart/cartSlice';
import cartBear from '../../../store/cart/cartBear'

export const ItemList = () => {
  // const cart = useAppSelector(selectCart);
  const { cart } = cartBear()

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" />
          구매 물품
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>상품명</TableHead>
              <TableHead>수량</TableHead>
              <TableHead>가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(cart).map(({ id, title, count, price }) => (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{count}개</TableCell>
                <TableCell>{formatPrice(price * count)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
