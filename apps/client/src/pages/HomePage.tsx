import { Link } from 'react-router-dom';
import { useCart } from '@/features/cart';
import { restaurants, dishes } from '../dummy';
import { Dish } from '../types';

export default function HomePage() {
  const { addToCart } = useCart();

  const featuredRestos = restaurants.slice(0, 3);
  const popularDishes = dishes.slice(0, 3);

  const handleAddToCart = (dish: Dish) => {
    const restaurantName =
      restaurants.find((r) => r.id === dish.restaurantId)?.name || 'Unknown';
    addToCart({ ...dish, restaurant: restaurantName });
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your Favorite Food Delivered Fast
          </h1>
          <p className="text-lg text-orange-100">
            Temukan restoran dan hidangan terbaik di sekitarmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-full shadow-md">
            <div className="flex items-center bg-white rounded-full px-4 py-2 flex-1">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Cari makanan atau restoran..."
                className="w-full outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <svg
                className="w-5 h-5 text-orange-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <select className="outline-none text-gray-700 bg-transparent">
                <option>📍 Batam</option>
                <option>Jakarta</option>
                <option>Surabaya</option>
              </select>
            </div>
            <Link
              to="/restaurants"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center"
            >
              Cari
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg"
            alt="Hero"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Kategori */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Kategori Populer
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {[
            '🍚 Nasi',
            '🍕 Pizza',
            '🍜 Mie',
            '🍔 Burger',
            '🥤 Minuman',
            '🍰 Dessert',
          ].map((cat) => (
            <Link
              to="/restaurants"
              key={cat}
              className="flex-shrink-0 w-28 h-28 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition"
            >
              <span className="text-4xl">{cat.split(' ')[0]}</span>
              <span className="text-sm font-medium mt-2 text-gray-700">
                {cat.split(' ')[1]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Restoran Unggulan
          </h2>
          <Link
            to="/restaurants"
            className="text-orange-500 font-medium hover:underline text-sm"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredRestos.map((r) => (
            <Link
              to={`/restaurant/${r.id}`}
              key={r.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={r.img}
                alt={r.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{r.name}</h3>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-yellow-500">⭐{r.rating}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{r.category}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">🕒 {r.time}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${r.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                  >
                    {r.open ? 'Buka' : 'Tutup'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Dishes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Hidangan Populer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition"
            >
              <img
                src={d.img}
                alt={d.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{d.name}</h3>
                <p className="text-xs text-gray-500">
                  {restaurants.find((r) => r.id === d.restaurantId)?.name}
                </p>
                <p className="text-orange-500 font-bold mt-1">
                  Rp{d.price.toLocaleString('id-ID')}
                </p>
                <button
                  onClick={() => handleAddToCart(d)}
                  className="mt-2 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-orange-600"
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="bg-orange-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <span className="text-orange-600 font-semibold text-sm">
            Weekend Promo
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            Diskon 20% untuk semua menu!
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Gunakan kode:{' '}
            <span className="bg-white px-3 py-1 rounded-full font-mono font-bold text-orange-600">
              FOOD20
            </span>
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/special-offer-banner-with-20-percent-discount_79603-1256.jpg"
          alt="Promo"
          className="w-32 h-32 object-contain"
        />
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cara Kerja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '📍',
              title: 'Pilih Restoran',
              desc: 'Telusuri restoran favoritmu',
            },
            {
              icon: '🍽️',
              title: 'Pilih Makanan',
              desc: 'Tambahkan ke keranjang',
            },
            { icon: '🛵', title: 'Pesanan Diantar', desc: 'Nikmati makananmu' },
          ].map((step, idx) => (
            <div key={idx} className="text-center p-5">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {step.icon}
              </div>
              <h4 className="font-semibold text-gray-800">{step.title}</h4>
              <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
