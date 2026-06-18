import React from 'react';
import { 
  Sparkles, 
  Upload, 
  AlertCircle, 
  User, 
  CreditCard, 
  Mail, 
  Phone, 
  FileCheck, 
  RotateCcw,
  Bot,
  Shuffle
} from 'lucide-react';
import { AppTheme, OnboardingState } from '../types';

interface MockDataControlProps {
  theme: AppTheme;
  onThemeToggle: () => void;
  state: OnboardingState;
  userName: string;
  onUserNameChange: (name: string) => void;
  onQuickFillPresets: (success: boolean) => void;
  onResetAll: () => void;
  simulationMode: 'always-succeed' | 'always-fail';
  setSimulationMode: (mode: 'always-succeed' | 'always-fail') => void;
  onFieldChange: (field: string, value: any) => void;
  mobileStep: 'checklist' | 'verification';
  setMobileStep: (step: 'checklist' | 'verification') => void;
}

export default function MockDataControl({
  theme,
  onThemeToggle,
  state,
  userName,
  onUserNameChange,
  onQuickFillPresets,
  onResetAll,
  simulationMode,
  setSimulationMode,
  onFieldChange,
  mobileStep,
  setMobileStep
}: MockDataControlProps) {
  const isLight = theme === 'light-classic';

  return (
    <div className={`p-6 sm:p-8 rounded-[32px] ${
      isLight 
        ? 'bg-white border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)]' 
        : 'bg-[#191c1e] border border-zinc-800/80 shadow-[0_16px_48px_rgba(0,0,0,0.4)]'
    } h-full space-y-6 sm:space-y-8 flex flex-col justify-between`} id="mock-control-panel">
      
      {/* Top Header section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00d1ff]/15 flex items-center justify-center">
              <Bot className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-neutral-100 font-display'}`}>
                Simulation Inspector
              </h2>
              <p className="text-xs text-zinc-400">アプリの挙動＆画像解析を操作できます</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onThemeToggle}
            className={`text-xs font-semibold px-4 py-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
              isLight 
                ? 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100' 
                : 'bg-zinc-800 border-zinc-700 text-neutral-200 hover:bg-zinc-700'
            }`}
          >
            テーマ: {isLight ? 'ライト (白)' : 'EVダーク (黒)'}
          </button>
        </div>

        {/* Dynamic Mobile Simulator Step Selector */}
        <div className={`p-4 rounded-2xl border ${
          isLight ? 'bg-indigo-50/50 border-indigo-100' : 'bg-cyan-950/20 border-cyan-900/30'
        } space-y-2`}>
          <span className="text-xs font-bold text-sky-600 dark:text-cyan-400">シミュレーターの画面セクション:</span>
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            <button
              type="button"
              onClick={() => setMobileStep('checklist')}
              className={`text-xs py-2 px-3 rounded-lg border font-bold cursor-pointer transition-all ${
                mobileStep === 'checklist'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800'
              }`}
            >
              1. 書類確認 (静的モックアップ)
            </button>
            <button
              type="button"
              onClick={() => setMobileStep('verification')}
              className={`text-xs py-2 px-3 rounded-lg border font-bold cursor-pointer transition-all ${
                mobileStep === 'verification'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800'
              }`}
            >
              2. アクティブ書類提出 (OCR/解析)
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1 leading-normal">
            ※ ステップ1は、ご提出いただいた「要件を事前に伝える案内画面（入力項目なし）」となります。ステップ2へ進めると、実際に画像を渡したOCR検証を実演可能です。
          </p>
        </div>

        {/* Global Auto Simulation configuration */}
        <div className={`p-4 rounded-2xl border ${
          isLight ? 'bg-sky-50/50 border-sky-100' : 'bg-cyan-950/10 border-cyan-900/30'
        } space-y-2`}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>AI OCR 解析シミュレーター設定</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            ホットリンク画像を「解析」した際のAIの検証結果を設定します。
          </p>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              type="button"
              onClick={() => setSimulationMode('always-succeed')}
              className={`text-xs py-2 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-colors ${
                simulationMode === 'always-succeed'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-800 hover:bg-gray-50'
              }`}
            >
              常に合格
            </button>
            <button
              type="button"
              onClick={() => setSimulationMode('always-fail')}
              className={`text-xs py-2 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-colors ${
                simulationMode === 'always-fail'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-800 hover:bg-gray-50'
              }`}
            >
              不合格 (期限切れ等)
            </button>
          </div>
        </div>

        {/* Form Inputs representing fields */}
        <div className="space-y-4">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-400' : 'text-neutral-500'}`}>
            登録者プロフィール情報
          </h3>

          {/* User Name input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> 氏名 (ローマ字または日本語)
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUserNameChange(e.target.value)}
              placeholder="山田 太郎 / TARO YAMADA"
              className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#101415] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {/* Phone & Email contact inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> 携帯電話番号
              </label>
              <input
                type="text"
                value={state.contact.phone}
                onChange={(e) => onFieldChange('phone', e.target.value)}
                placeholder="090-1234-5678"
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#101415] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> メールアドレス
              </label>
              <input
                type="email"
                value={state.contact.email}
                onChange={(e) => onFieldChange('email', e.target.value)}
                placeholder="yamada@gmail.com"
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#101415] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {/* Credit card inputs to test validations */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> クレジットカード情報
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={state.creditCardDetails.number}
                onChange={(e) => onFieldChange('cardNumber', e.target.value)}
                placeholder="1234-5678-9012-3456"
                className="col-span-2 text-xs px-3.5 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#101415] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="text"
                value={state.creditCardDetails.brand}
                onChange={(e) => onFieldChange('cardBrand', e.target.value)}
                placeholder="VISA"
                className="text-xs px-2.5 py-3 text-center uppercase font-bold rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="checkbox-secured"
                checked={state.creditCardDetails.secured}
                onChange={(e) => onFieldChange('cardSecured', e.target.checked)}
                className="rounded border-gray-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
              />
              <label htmlFor="checkbox-secured" className="text-[11px] text-zinc-500 select-none">
                3Dセキュア 2.0に対応している
              </label>
            </div>
          </div>

          {/* Address Details input selection */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">書類種別</label>
              <select
                value={state.addressDetails.type}
                onChange={(e) => onFieldChange('addressType', e.target.value)}
                className="w-full text-xs px-2.5 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#101415] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="住民票の写し">住民票の写し</option>
                <option value="公共料金領収書">公共料金領収書</option>
                <option value="在留カード">在留カード</option>
                <option value="マイナンバーカード">マイナンバーカード</option>
              </select>
            </div>
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-[11px] font-semibold text-zinc-500 mb-1 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" /> 発行3ヶ月以内
              </label>
              <div className="flex items-center h-10 gap-2">
                <input
                  type="checkbox"
                  id="issued3months"
                  checked={state.addressDetails.issuedWithin3Months}
                  onChange={(e) => onFieldChange('addressIssued', e.target.checked)}
                  className="rounded border-gray-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <label htmlFor="issued3months" className="text-xs text-zinc-500 select-none cursor-pointer">
                  はい
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Fast Actions Footer */}
      <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            <Shuffle className="w-3.5 h-3.5" /> ワンタップ爆速入力
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onQuickFillPresets(true)}
            className="text-xs font-bold py-3 px-4 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 transition-all flex items-center justify-center gap-1.5 border border-emerald-200/40 dark:border-emerald-800/30 cursor-pointer"
          >
            健康プロファイルを適用 (合格)
          </button>
          <button
            type="button"
            onClick={() => onQuickFillPresets(false)}
            className="text-xs font-bold py-3 px-4 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 dark:text-rose-300 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 transition-all flex items-center justify-center gap-1.5 border border-rose-200/40 dark:border-rose-800/30 cursor-pointer"
          >
            期限切れ不備プロファイル (不合格)
          </button>
        </div>

        <button
          type="button"
          onClick={onResetAll}
          className="w-full text-xs font-bold py-3 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          全てのデータをリセット
        </button>
      </div>
    </div>
  );
}
