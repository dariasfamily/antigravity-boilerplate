
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';

/**
 * ðŸ” DEV LOGIN
 * Supports Email/Password AND GitHub OAuth.
 */
export default function DevLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('Idle');

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleEmailLogin = async () => {
        setStatus('Logging in with Email...');
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setStatus('Error: ' + error.message);
        } else {
            setStatus('Success! Session established.');
            window.location.reload();
        }
    };

    const handleGithubLogin = async () => {
        setStatus('Redirecting to GitHub...');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/dev/login`
            }
        });

        if (error) {
            setStatus('Error: ' + error.message);
        }
        // Redirect happens automatically
    };

    return (
        <div className="p-10 max-w-md mx-auto bg-black text-white border border-gray-800 mt-20 rounded-xl">
            <h1 className="text-xl font-bold mb-4">ðŸ”® AXON Dev Auth</h1>

            <div className="space-y-6">
                {/* OAUTH SECTION */}
                <div>
                    <button
                        onClick={handleGithubLogin}
                        className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white font-bold py-3 rounded flex items-center justify-center gap-2 border border-gray-700 transition-colors"
                    >
                        {/* GitHub Icon */}
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        Sign in with GitHub
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">Recommended if you used GitHub for Supabase</p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-gray-500">Or use Credentials</span></div>
                </div>

                {/* EMAIL SECTION */}
                <div className="space-y-4 opacity-50 hover:opacity-100 transition-opacity">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 p-2 rounded"
                            placeholder="admin@AXON.io"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 p-2 rounded"
                            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        />
                    </div>

                    <button
                        onClick={handleEmailLogin}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded transition-colors"
                    >
                        Sign In with Email
                    </button>
                </div>

                <div className="text-xs text-gray-500 font-mono mt-4 border-t border-gray-800 pt-2">
                    Status: <span className={status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}>{status}</span>
                </div>

                <div className="mt-4">
                    <a href="/api/test/runner" target="_blank" className="text-blue-400 text-sm hover:underline block">
                        âž¡ï¸ After Login: Open E2E Test Route
                    </a>
                </div>
            </div>
        </div>
    );
}
