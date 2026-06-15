import { Link } from 'react-router-dom';
import { useOrder } from '@/features/order';

export default function OrdersPage() {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Pesanan Saya</h1>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-400 py-20">
          Belum ada pesanan.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Pesanan Saya</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            to={`/orders/${order.id}`}
            key={order.id}
            className="bg-white rounded-xl shadow-md p-5 block hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.restaurant}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                {order.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              {order.items.map((i) => i.name).join(', ')}
            </div>
            <p className="text-right font-bold text-orange-500">
              Rp{order.total.toLocaleString('id-ID')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
