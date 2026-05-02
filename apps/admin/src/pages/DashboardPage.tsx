import { Link } from 'react-router-dom';
import { SummaryCard } from '../components/SummaryCard';

export function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to FoodTrip Admin Panel</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Foods" value="1,234" icon="🍔" />
        <SummaryCard title="Total Trips" value="567" icon="✈️" />
        <SummaryCard title="Total Restaurants" value="89" icon="🏪" />
        <SummaryCard title="Total Users" value="2,345" icon="👥" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/foods?action=create"
            className="btn btn-primary btn-md"
          >
            + Add Food
          </Link>
          <Link
            to="/trips?action=create"
            className="btn btn-primary btn-md"
          >
            + Create Trip
          </Link>
          <Link
            to="/restaurants?action=create"
            className="btn btn-primary btn-md"
          >
            + Add Restaurant
          </Link>
        </div>
      </div>

      {/* Placeholder for Recent Activities */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activities</h2>
        <p className="text-slate-600">Recent activities will appear here</p>
      </div>
    </div>
  );
}
