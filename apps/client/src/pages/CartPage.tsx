import { Link } from 'react-router-dom';
import { useCart } from '@/features/cart';

export default function CartPage() {
  const { cart, removeFromCart, changeQty, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Keranjang</h1>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-400 py-20">
          Keranjang masih kosong.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Keranjang</h1>
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.restaurant}</p>
              <p className="text-orange-500 font-bold">
                Rp{item.price.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQty(item.id, -1)}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-orange-100"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => changeQty(item.id, 1)}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-orange-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500">Subtotal ({cartCount} item)</p>
          <p className="text-2xl font-bold">
            Rp{cartTotal.toLocaleString('id-ID')}
          </p>
        </div>
        <Link
          to="/checkout"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
