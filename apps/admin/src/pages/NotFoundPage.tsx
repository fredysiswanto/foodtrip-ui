import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { ADMIN_ROLES } from '../features/auth';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    // Redirect to appropriate dashboard based on user role
    if (user?.user_type === ADMIN_ROLES.ADMIN) {
      navigate('/admin/dashboard', { replace: true });
    } else if (user?.user_type === ADMIN_ROLES.RESTO_ADMIN) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved. Please
          check the URL and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Security Info */}
        <p className="text-gray-500 text-xs mt-6 text-center">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
