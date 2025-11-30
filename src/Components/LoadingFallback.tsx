const LoadingFallback = () => (
  // Ensuring the return value is clean JSX
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="text-lg font-mono text-gray-600 animate-pulse">
      Loading module...
    </div>
  </div>
);

export default LoadingFallback;
