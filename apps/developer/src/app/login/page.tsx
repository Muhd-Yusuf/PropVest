'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight via-midnight-light to-midnight px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Branding */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-text-primary">Prop</span>
              <span className="text-emerald">Vest</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-text-tertiary font-medium mt-1.5">
              Developer Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
                className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 bg-emerald text-midnight font-semibold text-sm rounded-lg hover:bg-emerald-dark focus:outline-none focus:ring-2 focus:ring-emerald/30 transition-colors cursor-pointer mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-text-tertiary text-center mt-6">
            This is a mock login. Enter any email to explore the portal.
          </p>
        </div>
      </div>
    </div>
  );
}
