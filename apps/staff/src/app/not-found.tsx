import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
      <div className="text-center">
        <p className="text-6xl font-bold text-text-tertiary">404</p>
        <h1 className="text-2xl font-bold text-text-primary mt-4">Page Not Found</h1>
        <p className="text-text-secondary mt-2">The page you're looking for doesn't exist.</p>
        <Link
          href="/dashboard"
          className="inline-block mt-6 px-6 py-2.5 bg-emerald text-white font-semibold rounded-xl hover:bg-emerald-dark transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
