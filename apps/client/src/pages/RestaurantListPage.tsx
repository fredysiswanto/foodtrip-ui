import { Link } from 'react-router-dom';
import { restaurants } from '../dummy';

export default function RestaurantListPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Semua Restoran</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Cari restoran..."
            className="border rounded-full px-4 py-2 w-full md:w-64 outline-none focus:ring-2 ring-orange-300"
          />
          <select className="border rounded-full px-3 py-2 outline-none">
            <option>Semua Kategori</option>
            <option>Indonesia</option>
            <option>Italia</option>
            <option>Fast Food</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <Link
            to={`/restaurant/${r.id}`}
            key={r.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={r.img}
              alt={r.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg">{r.name}</h3>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-yellow-500">⭐{r.rating}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{r.category}</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-400">🕒 {r.time}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${r.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                >
                  {r.open ? 'Buka' : 'Tutup'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
