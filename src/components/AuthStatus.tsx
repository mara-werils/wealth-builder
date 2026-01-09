"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { User, LogOut, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
        <div className="w-6 h-6 bg-slate-600 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-slate-600 rounded animate-pulse"></div>
      </div>
    );
  }

  if (session?.user) {
    // Mock premium status - in real app, check from user metadata
    const isPremium = session.user.email?.includes('premium') || false;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-slate-400" />
          )}

          <span className="text-sm text-slate-300 max-w-24 truncate">
            {session.user.name || session.user.email}
          </span>

          {isPremium && (
            <div title="Premium User">
              <Crown className="w-4 h-4 text-yellow-400" />
            </div>
          )}
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => signIn()}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
    >
      <User className="w-4 h-4" />
      Sign In
    </motion.button>
  );
}
