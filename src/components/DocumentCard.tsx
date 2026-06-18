import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IdCard, 
  CreditCard as CreditCardIcon, 
  Mail, 
  Home, 
  Image as ImageIcon, 
  Check, 
  AlertTriangle, 
  Link as LinkIcon, 
  RefreshCw, 
  Sparkles,
  Info
} from 'lucide-react';
import { AppTheme, DocumentState } from '../types';

interface DocumentCardProps {
  document: DocumentState;
  theme: AppTheme;
  index: number;
  onUpdateHotlink: (url: string) => void;
  onTriggerScan: () => void;
  onClear: () => void;
  isInformationalOnly?: boolean;
  children?: React.ReactNode;
}

export default function DocumentCard({
  document,
  theme,
  index,
  onUpdateHotlink,
  onTriggerScan,
  onClear,
  isInformationalOnly = false,
  children
}: DocumentCardProps) {
  const [hotlinkInput, setHotlinkInput] = useState('');
  const [isExpandingHotlink, setIsExpandingHotlink] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'license':
        return <IdCard className="w-6 h-6 text-blue-600 dark:text-cyan-400" id={`icon-license-${index}`} />;
      case 'creditcard':
        return <CreditCardIcon className="w-6 h-6 text-indigo-600 dark:text-blue-400" id={`icon-card-${index}`} />;
      case 'contact':
        return <Mail className="w-6 h-6 text-[#1e88e5] dark:text-[#00d1ff]" id={`icon-contact-${index}`} />;
      case 'address':
        return <Home className="w-6 h-6 text-purple-600 dark:text-indigo-400" id={`icon-[#00d1ff]`} />;
      default:
        return <IdCard className="w-6 h-6" id={`icon-default-${index}`} />;
    }
  };

  const isLight = theme === 'light-classic';

  // Warnings / Caution Box Styles
  const getCautionStyles = () => {
    if (document.id === 'license') {
      return isLight
        ? 'bg-rose-50/90 border border-rose-100 text-rose-800 text-[12px] sm:text-[13px] leading-relaxed p-4 rounded-2xl mt-4 font-normal'
        : 'bg-rose-950/20 border border-rose-900/40 text-rose-300 text-[12px] sm:text-[13px] leading-relaxed p-4 rounded-2xl mt-4 font-normal';
    } else if (document.id === 'creditCardDoc') {
      return isLight
        ? 'bg-sky-50/50 border border-sky-100 text-sky-800 text-[12px] sm:text-[13px] leading-relaxed p-4 rounded-xl mt-4 font-normal'
        : 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-[12px] sm:text-[13px] leading-relaxed p-4 rounded-xl mt-4 font-normal';
    }
    return '';
  };

  const handleHotlinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hotlinkInput.trim()) {
      onUpdateHotlink(hotlinkInput.trim());
      setIsExpandingHotlink(false);
    }
  };

  // Custom presets for clicking
  const applyPreset = (url: string) => {
    setHotlinkInput(url);
    onUpdateHotlink(url);
    setIsExpandingHotlink(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative w-full rounded-[28px] ${
        isLight
          ? 'bg-white border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.015)]'
          : 'bg-[#191c1e] border border-zinc-80/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
      } p-5 sm:p-6 transition-all duration-300`}
      id={`doc-card-${document.id}`}
    >
      {/* Top Section with Status Badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`p-3.5 rounded-2xl flex items-center justify-center ${
              isLight ? 'bg-[#f0f4f9]' : 'bg-[#101415]/85 border border-zinc-800'
            }`}
          >
            {getIcon(document.icon)}
          </div>
          <div>
            <h3
              className={`text-[17px] sm:text-lg font-bold ${
                isLight ? 'text-gray-900 font-sans' : 'text-neutral-200 font-display'
              } tracking-tight`}
            >
              {document.title}
            </h3>
            <p
              className={`text-xs sm:text-[13px] mt-1.5 ${
                isLight ? 'text-gray-500' : 'text-zinc-400'
              } leading-relaxed`}
            >
              {document.description}
            </p>
          </div>
        </div>

        {/* Dynamic Badge for Upload state */}
        {!isInformationalOnly && (
          <div className="shrink-0">
            <AnimatePresence mode="wait">
              {document.status === 'valid' && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/40'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  確認済
                </motion.span>
              )}
              {document.status === 'scanning' && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isLight ? 'bg-amber-50 text-amber-700' : 'bg-cyan-950/30 text-cyan-400 border border-cyan-900/40'
                  }`}
                >
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  解析中
                </motion.span>
              )}
              {document.status === 'invalid' && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 dark:border dark:border-rose-900/40"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  再確認
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Children Custom Rendering (credit card brands, etc.) */}
      {children}

      {/* Caution Box for matching details */}
      {getCautionStyles() && (
        <div className={getCautionStyles()}>
          {document.id === 'license' ? (
            <p>※ 「マイナ免許証」や有効期限切れ、旧姓のままの免許証はご利用いただけません。</p>
          ) : (
            <p>※ デビットカード、プリペイドカード、海外発行のカードはご利用いただけません。</p>
          )}
        </div>
      )}

      {/* Hotlinked Image Preview & Upload Controls hidden in informational mockup mode */}
      {!isInformationalOnly && (
        <div className="mt-4 pt-4 border-t border-dashed border-gray-100 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {document.imageUrl ? (
              <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-mono bg-sky-50 dark:bg-sky-950/20 px-2 py-1 rounded-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{document.imageUrl}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <ImageIcon className="w-4 h-4" />
                <span>画像をホットリンクまたは入力してください</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {!document.imageUrl ? (
                <button
                  type="button"
                  onClick={() => setIsExpandingHotlink(!isExpandingHotlink)}
                  className={`text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    isLight
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                  id={`btn-hotlink-${document.id}`}
                >
                  <LinkIcon className="w-3 h-3" />
                  画像ホットリンク
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  {document.status === 'empty' && (
                    <button
                      type="button"
                      onClick={onTriggerScan}
                      className="text-xs font-semibold bg-emerald-600  text-white hover:bg-emerald-500 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      解析
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-2 py-1.5 rounded-md transition-all cursor-pointer"
                  >
                    クリア
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hotlink Input Panel expansion with presets */}
          <AnimatePresence>
            {isExpandingHotlink && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-3"
              >
                <form onSubmit={handleHotlinkSubmit} className="space-y-3 p-3 rounded-xl bg-gray-50 dark:bg-[#101415] border border-gray-100 dark:border-zinc-800">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/your-card-image.jpg"
                      value={hotlinkInput}
                      onChange={(e) => setHotlinkInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                    />
                    <button
                      type="submit"
                      className="text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 px-3 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      適用
                    </button>
                  </div>

                  {/* Popular hotlink presets for instant mock values */}
                  <div className="text-[11px] text-zinc-500">
                    <span className="font-semibold text-zinc-600 dark:text-zinc-400">推奨テスト画像 (Click directly to use):</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {document.id === 'license' && (
                        <>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            日本の顔写真免許証 1
                          </button>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            日本の顔写真免許証 2
                          </button>
                        </>
                      )}
                      {document.id === 'creditCardDoc' && (
                        <>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            ブラックプレミアムカード
                          </button>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            ゴールドカード
                          </button>
                        </>
                      )}
                      {document.id === 'addressDoc' && (
                        <>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            公共料金領収書
                          </button>
                          <button
                            type="button"
                            onClick={() => applyPreset('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600')}
                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded px-2 py-0.5 hover:border-sky-500 transition-colors text-zinc-600 dark:text-zinc-300 cursor-pointer"
                          >
                            住民票の写し
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hotlinked Image Preview Display */}
          {document.imageUrl && (
            <div className="mt-3 relative rounded-xl overflow-hidden bg-black aspect-[16/9] border border-gray-100 dark:border-zinc-800">
              <img
                src={document.imageUrl}
                alt={document.title}
                className="w-full h-full object-cover opacity-85 transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Real-time scanner beam animation */}
              {document.status === 'scanning' && (
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 1.5,
                    ease: 'easeInOut'
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 shadow-[0_0_12px_#38bdf8] z-10"
                />
              )}

              {/* Simulated OCR data tag */}
              {document.status === 'valid' && document.extractedData && (
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col justify-end p-3 animate-fade-in text-[11px] font-mono whitespace-pre text-emerald-400">
                  <div className="flex items-center gap-1 mb-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI OCR RESULT: SUCCESS</span>
                  </div>
                  {Object.entries(document.extractedData).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-emerald-900/40 py-0.5">
                      <span className="text-zinc-300 capitalize">{key}:</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Error Overlay */}
              {document.status === 'invalid' && (
                <div className="absolute inset-0 bg-rose-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                  <AlertTriangle className="w-8 h-8 text-rose-400 mb-1" />
                  <span className="text-xs font-bold text-rose-200">読み取りエラー</span>
                  <span className="text-[11px] text-rose-300 mt-1 max-w-xs">{document.errorMessage || '要件を満たしていません'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
