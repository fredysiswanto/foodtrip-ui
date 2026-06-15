import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { useCart } from '@/features/cart';
import { useState } from 'react';

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!user) {
      login({
        name: 'Ahmad',
        avatar:
          'https://ui-avatars.com/api/?name=Ahmad&background=F97316&color=fff&size=32',
      });
      alert('Login berhasil sebagai Ahmad.');
    } else {
      logout();
      alert('Logout berhasil.');
      setDropdownOpen(false);
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Menu */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-extrabold text-orange-500">
              🍔 FoodTrip
            </Link>
            <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
              <Link to="/restaurants" className="hover:text-orange-500">
                Restaurants
              </Link>
              <Link to="/orders" className="hover:text-orange-500">
                Orders
              </Link>
            </div>
          </div>

          {/* Aksi kanan */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-orange-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User area */}
            <div className="relative">
              {!user ? (
                <button
                  onClick={handleLogin}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600"
                >
                  Login
                </button>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-orange-300"
                  />
                  <span className="text-sm font-medium hidden md:inline">
                    {user.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
              {user && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-orange-50 text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 inline mr-2 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogin}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 inline mr-2 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-orange-500"
            >
              Restaurants
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-orange-500"
            >
              Orders
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
