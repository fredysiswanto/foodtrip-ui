import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../../types';
import { useCart } from '@/features/cart';
import { useAuth } from '@/features/auth/index';

interface OrderContextType {
  orders: Order[];
  placeOrder: () => string | false;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { cart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();

  const placeOrder = (): string | false => {
    if (!user) {
      alert('Silakan login terlebih dahulu.');
      return false;
    }
    if (cart.length === 0) return false;
    const newOrder: Order = {
      id: 'ORD-' + Date.now().toString().slice(-5),
      items: [...cart],
      total: cartTotal,
      status: 'Preparing',
      date: new Date().toLocaleString('id-ID'),
      restaurant: cart[0]?.restaurant || 'Unknown',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    alert('Pesanan berhasil dibuat!');
    return newOrder.id;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};
