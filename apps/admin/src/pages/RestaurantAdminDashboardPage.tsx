/**
 * Restaurant Admin - Dashboard Page
 */

export function RestaurantAdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <p className="text-slate-600 mt-2">Manage your restaurant operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Orders Today</p>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Menu Items</p>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="text-4xl">🍽️</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">
                Pending Orders
              </p>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <p className="text-sm font-medium">Add Dish</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm font-medium">View Orders</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-sm font-medium">Opening Hours</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="text-sm font-medium">Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}
