import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error) || (
          <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
              <div className="mb-4 text-4xl">⚠️</div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">Something went wrong</h1>
              <p className="text-red-700 mb-4">{this.state.error.message}</p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
