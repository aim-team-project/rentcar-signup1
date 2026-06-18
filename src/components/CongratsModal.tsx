import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle, Car, ArrowRight, ShieldCheck, Key, RefreshCw } from 'lucide-react';
import { AppTheme } from '../types';

interface CongratsModalProps {
  theme: AppTheme;
  userName: string;
  onReset: () => void;
}

export default function CongratsModal({ theme, userName, onReset }: CongratsModalProps) {
  const isLight = theme === 'light-classic';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className={`relative w-full max-w-lg overflow-hidden rounded-[32px] p-8 ${
          isLight 
            ? 'bg-white text-gray-900 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)]' 
            : 'bg-[#191c1e] text-neutral-100 border border-zinc-800/80 shadow-[0_24px_60px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Glow decoration for Electric theme */}
        {!isLight && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
        )}

        <div className="relative flex flex-col items-center text-center">
          {/* Animated check bubble */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
              isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/50'
            }`}
          >
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </motion.div>

          <h2 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'font-sans' : 'font-display'} tracking-tight`}>
            ユーザー登録が完了しました
          </h2>
          <p className="text-xs sm:text-sm mt-1 text-zinc-500 dark:text-zinc-400">
            ご登録の審査がリアルタイムで承認されました。
          </p>

          <div className={`w-full mt-6 p-5 rounded-2xl ${
            isLight ? 'bg-gray-50/80 border border-gray-100' : 'bg-[#101415]/70 border border-zinc-800'
          } text-left space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono uppercase">MEMBER</span>
              <span className="text-sm font-bold">{userName || 'GUEST USER'}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-dashed border-gray-200 dark:border-zinc-800 pt-3">
              <span className="text-xs text-zinc-400 font-mono uppercase">SERVICE TIER</span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Electric Velocity Pro</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-gray-200 dark:border-zinc-800 pt-3">
              <span className="text-xs text-zinc-400 font-mono uppercase">SECURITY KEY ID</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">EV-SEC-77402685-X</span>
            </div>
          </div>

          {/* EV Cockpit Card Interaction */}
          <div className="relative w-full mt-6 p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-cyan-500/20 text-left overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px]" />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">VIRTUAL CABIN KEY</span>
                <h4 className="text-neutral-100 font-display font-semibold mt-1">NISSAN ARIYA / TESLA MODEL X</h4>
                <p className="text-[11px] text-neutral-400 mt-1">車両周辺でスマホを近づけると自動で開錠します</p>
              </div>
              <Key className="w-8 h-8 text-cyan-400 shrink-0" />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px]">
              <span className="text-zinc-500 font-mono">STATUS: ACTIVE & READY</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="inline-block w-2 bg-emerald-500 h-2 rounded-full animate-ping" />
                CONNECTED TO VEHICLE
              </span>
            </div>
          </div>

          <div className="w-full mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onReset}
              className={`flex-1 font-semibold text-sm py-3.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isLight 
                  ? 'border-gray-200 text-gray-700 hover:bg-gray-50' 
                  : 'border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              最初から登録を試す
            </button>
            <button
              type="button"
              onClick={() => alert("EVコックピットダッシュボードへ遷移しました！（シミュレーション）")}
              className="flex-1 font-semibold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer transition-all hover:scale-[1.02]"
            >
              ダッシュボードへ
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
