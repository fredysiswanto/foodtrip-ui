import { useParams } from 'react-router-dom';
import { useOrder } from '@/features/order/index';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrder();
  const order = orders.find((o) => o.id === id);

  if (!order)
    return <p className="text-center py-20">Pesanan tidak ditemukan.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Detail Pesanan</h1>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Order #{order.id}</h2>
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            {order.status}
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          {order.date} · {order.restaurant}
        </p>
        <div className="border-t pt-4 space-y-2 mt-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>
                Rp{(item.price * item.quantity).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 mt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rp{order.total.toLocaleString('id-ID')}</span>
        </div>
        {/* Timeline */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Status Pengiriman</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>{' '}
              Dibuat
            </span>
            <span className="flex-1 border-t border-dashed border-gray-300"></span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>{' '}
              Dikonfirmasi
            </span>
            <span className="flex-1 border-t border-dashed border-gray-300"></span>
            <span className="flex flex-col items-center">
              <span
                className={`w-3 h-3 ${order.status === 'Preparing' ? 'bg-orange-500' : 'bg-gray-300'} rounded-full`}
              ></span>{' '}
              Disiapkan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
