import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '../features/auth';
import { navigationItems, NavItem } from './navigation';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Determine which navigation to use based on user role
  const navigation = navigationItems;

  // Determine the home path based on role
  const homePath = '/dashboard';

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Backdrop Overlay - Mobile Only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-full w-64 bg-slate-900 text-slate-100 transition-transform duration-300 transform md:transform-none flex flex-col z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-4">
          <Link to={homePath} className="font-bold text-xl">
            FoodTrip
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              item={item}
              isActive={isActive(item.path)}
              onClick={closeSidebar}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="h-16 border-t border-slate-800 px-4 flex items-center text-xs text-slate-400">
          Admin Panel v1.0
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Right Side - User Menu */}
          <UserMenu user={user} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full sm:p-6 bg-gray-50">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ item, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="text-lg">{item.icon}</span>
      <span className="text-sm font-medium">{item.label}</span>
    </Link>
  );
}

interface UserMenuProps {
  user: {
    // first_name: string;
    // last_name: string;
    role: string;
  } | null;
}

function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const displayName = user ? `${user.role}` : 'Admin';

  const initials = user ? `${user.role?.[0]}` : 'A';

  return (
    <div className="relative">
      {/* User Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {initials}
        </div>
        <span className="text-sm font-medium text-slate-900">
          {displayName}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          <button className="w-full text-left px-4 py-2 text-sm text-slate-900 hover:bg-slate-50 transition-colors">
            👤 Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-slate-900 hover:bg-slate-50 transition-colors">
            ⚙️ Settings
          </button>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}
