import { FormEvent, useState } from 'react';
import { useLogin } from '../hooks';
import { Button } from '@foodtrip/ui';

export interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const isLoading = loginMutation.isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);
    setEmailError(null);
    setPasswordError(null);

    let hasError = false;

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      await loginMutation.mutateAsync({
        email,
        password,
      });
      // Toast notification is handled in useLogin hook
      onSuccess?.();
    } catch (err) {
      // Error handling is done in useLogin hook
      console.error('Login error:', err);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError && value.includes('@')) {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError && value.length >= 6) {
      setPasswordError(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              FoodTrip
            </h1>
            <p className="text-center text-sm text-gray-600 mt-2">
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {validationError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                <span className="mt-0.5 text-lg">⚠️</span>
                <span>{validationError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 disabled:cursor-not-allowed transition-all ${
                  emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
              {emailError && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>✕</span> {emailError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  disabled={isLoading}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 disabled:cursor-not-allowed transition-all ${
                    passwordError
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {showPassword ? '👁️ Hide' : '🙈 Show'}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>✕</span> {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading && (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <p className="text-xs text-gray-600 font-medium mb-3">
            Demo Credentials:
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded">
              <code className="text-sm font-mono text-blue-900">
                admin@example.com | Password123!
              </code>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded font-semibold">
                Admin
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEmail('admin@example.com');
                  setPassword('Password123!');
                }}
              >
                Copy
              </Button>
            </div>
            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded">
              <code className="text-sm font-mono text-blue-900">
                owner@example.com | Password123!
              </code>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded font-semibold">
                Owner
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEmail('owner@example.com');
                  setPassword('Password123!');
                }}
              >
                Copy
              </Button>
            </div>
            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded">
              <code className="text-sm font-mono text-blue-900">
                staff@example.com | Password123!
              </code>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded font-semibold">
                Staff
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEmail('staff@example.com');
                  setPassword('Password123!');
                }}
              >
                Copy
              </Button>
            </div>
            <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded">
              <code className="text-sm font-mono text-blue-900">
                customer@example.com | Password123!
              </code>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded font-semibold">
                Customer
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEmail('customer@example.com');
                  setPassword('Password123!');
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2 italic">
            Use these credentials for demo login
          </p>
        </div>
      </div>
    </div>
  );
}
