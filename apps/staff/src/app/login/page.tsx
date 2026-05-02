'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ALL_ROLES, ROLE_LABELS } from '@/lib/constants';
import type { StaffRole } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<StaffRole>('ceo');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), role);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight via-midnight-light to-midnight px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Branding */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-text-primary">Prop</span>
              <span className="text-emerald">Vest</span>
              <span className="text-text-tertiary text-lg font-medium ml-1.5">ADMIN</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-text-tertiary font-medium mt-1.5">
              Staff Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@propvest.co"
                required
                className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
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

            {/* Role Selector */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as StaffRole)}
                className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237A8BA0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_10px_center] bg-no-repeat pr-8"
              >
                {ALL_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
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
            This is a mock login. Select a role to explore the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
