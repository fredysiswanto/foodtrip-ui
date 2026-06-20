export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg mb-3">FoodTrip</h4>
          <p className="text-sm">Platform pesan antar makanan terbaik.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Tentang</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Tentang Kami</a>
            </li>
            <li>
              <a href="#">Karir</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Bantuan</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Pusat Bantuan</a>
            </li>
            <li>
              <a href="#">Syarat & Ketentuan</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Ikuti Kami</h4>
          <div className="flex gap-3 text-xl">
            <a href="#">
              <i className="fab fa-instagram hover:text-orange-400"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter hover:text-orange-400"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook hover:text-orange-400"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 pb-6 border-t border-gray-700 pt-4">
        © 2025 FoodTrip. All rights reserved.
      </div>
    </footer>
  );
}
