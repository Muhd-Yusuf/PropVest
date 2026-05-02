'use client';

import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-error-bg flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-error" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Access Denied</h1>
        <p className="text-sm text-text-secondary mb-6 max-w-sm">
          You don&apos;t have permission to access this page.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center justify-center h-10 px-5 bg-emerald text-midnight text-sm font-semibold rounded-lg hover:bg-emerald-dark transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
