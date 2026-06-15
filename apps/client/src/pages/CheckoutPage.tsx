import { useNavigate } from 'react-router-dom';
import { useCart } from '@/features/cart';
import { useOrder } from '@/features/order';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) navigate('/cart');
  }, [cart, navigate]);

  const handlePlaceOrder = () => {
    const orderId = placeOrder();
    if (orderId) navigate('/orders');
  };

  if (cart.length === 0) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">Detail Pengiriman</h2>
          <input
            type="text"
            placeholder="Nama lengkap"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ring-orange-300"
          />
          <input
            type="tel"
            placeholder="Nomor telepon"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ring-orange-300"
          />
          <textarea
            placeholder="Alamat lengkap"
            rows={3}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ring-orange-300"
          ></textarea>
          <textarea
            placeholder="Catatan (opsional)"
            rows={2}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          ></textarea>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp{cartTotal.toLocaleString('id-ID')}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-full font-bold hover:bg-orange-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
