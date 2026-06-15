import { useParams } from 'react-router-dom';
import { restaurants, dishes } from '../dummy';
import { useCart } from '@/features/cart';
import { Dish } from '../types';

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find((r) => r.id === parseInt(id || '0'));
  const { addToCart } = useCart();

  if (!restaurant)
    return <p className="text-center py-20">Restoran tidak ditemukan.</p>;

  const menuDishes = dishes.filter((d) => d.restaurantId === restaurant.id);

  const handleAdd = (dish: Dish) => {
    addToCart({ ...dish, restaurant: restaurant.name });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={restaurant.banner}
            alt="Banner"
            className="w-full h-56 object-cover"
          />
          <div className="absolute bottom-0 left-0 p-5 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex gap-4 text-sm mt-1">
              <span>⭐{restaurant.rating}</span>
              <span>{restaurant.category}</span>
              <span>🕒 {restaurant.time}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuDishes.map((d) => (
            <div
              key={d.id}
              className="flex gap-4 items-center border rounded-xl p-4 hover:shadow transition"
            >
              <img
                src={d.img}
                alt={d.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{d.name}</h4>
                <p className="text-xs text-gray-500">{d.desc}</p>
                <p className="text-orange-500 font-bold mt-1">
                  Rp{d.price.toLocaleString('id-ID')}
                </p>
                <button
                  onClick={() => handleAdd(d)}
                  className="mt-2 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-orange-600"
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
