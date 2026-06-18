import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Smartphone, 
  Sparkles, 
  Car, 
  RotateCcw, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  ChevronLeft,
  BookOpen,
  Info,
  HelpCircle,
  Mail
} from 'lucide-react';
import { OnboardingState, AppTheme } from './types';
import DocumentCard from './components/DocumentCard';
import MockDataControl from './components/MockDataControl';
import CongratsModal from './components/CongratsModal';

const initialOnboardingState = (): OnboardingState => ({
  license: {
    id: 'license',
    title: '運転免許証',
    description: 'ご本人様の運転免許証をご用意ください。',
    icon: 'license',
    imageUrl: '',
    status: 'empty'
  },
  creditCardDoc: {
    id: 'creditCardDoc',
    title: 'クレジットカード',
    description: '本人認証サービス（3Dセキュア2.0）に対応したクレジットカードが必要です。',
    icon: 'creditcard',
    imageUrl: '',
    status: 'empty'
  },
  creditCardDetails: {
    number: '',
    expiry: '',
    cvv: '',
    brand: 'VISA',
    secured: true
  },
  contact: {
    phone: '',
    email: ''
  },
  addressDoc: {
    id: 'addressDoc',
    title: '現住所確認書類',
    description: '現住所が記載されている公的書類（住民票の写し、公共料金領収書など）が必要です。',
    icon: 'address',
    imageUrl: '',
    status: 'empty'
  },
  addressDetails: {
    type: '住民票の写し',
    issuedWithin3Months: true
  }
});

export default function App() {
  const [theme, setTheme] = useState<AppTheme>('light-classic');
  const [state, setState] = useState<OnboardingState>(initialOnboardingState());
  const [userName, setUserName] = useState<string>('');
  const [simulationMode, setSimulationMode] = useState<'always-succeed' | 'always-fail'>('always-succeed');
  const [showCongrats, setShowCongrats] = useState(false);
  const [selectedMobileLanguage, setSelectedMobileLanguage] = useState<'ja' | 'zh'>('ja');
  const [validationAlert, setValidationAlert] = useState<string | null>(null);
  const [mobileStep, setMobileStep] = useState<'checklist' | 'verification'>('checklist');

  // Auto detect fields when mock profile is updated to set appropriate values
  const handleQuickFill = (success: boolean) => {
    if (success) {
      setUserName('山田 太郎 (TARO YAMADA)');
      setState({
        license: {
          id: 'license',
          title: '運転免許証',
          description: 'ご本人様の運転免許証をご用意ください。',
          icon: 'license',
          imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
          status: 'valid',
          extractedData: {
            '氏名': '山田 太郎',
            '免許証番号': '第 301234567890 号',
            '有効期間': '令和10年(2028年)07月20日',
            '区分': '中型 / 二輪免'
          }
        },
        creditCardDoc: {
          id: 'creditCardDoc',
          title: 'クレジットカード',
          description: '本人認証サービス（3Dセキュア2.0）に対応したクレジットカードが必要です。',
          icon: 'creditcard',
          imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=600',
          status: 'valid',
          extractedData: {
            'ブランド': 'VISA PREMIUM',
            'カード番号': '•••• •••• •••• 8820',
            '名義人': 'TARO YAMADA',
            '3D認証': 'セキュリティ認証済 (3D Secure 2.0)'
          }
        },
        creditCardDetails: {
          number: '4111-2222-3333-8820',
          expiry: '12/29',
          cvv: '123',
          brand: 'VISA',
          secured: true
        },
        contact: {
          phone: '090-1234-5820',
          email: 'taro.yamada@gmail.com'
        },
        addressDoc: {
          id: 'addressDoc',
          title: '現住所確認書類',
          description: '現住所が記載されている公的書類（住民票の写し、公共料金領収書など）が必要です。',
          icon: 'address',
          imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=600',
          status: 'valid',
          extractedData: {
            '書類種別': '住民票の写し',
            '発行日': '2026年05月15日 (3ヶ月以内)',
            '現住所': '東京都港区芝浦 3-4-1',
            '状態': '現住住所と完全一致'
          }
        },
        addressDetails: {
          type: '住民票の写し',
          issuedWithin3Months: true
        }
      });
      setValidationAlert(null);
    } else {
      setUserName('鈴木 不備夫 (FUBIO SUZUKI)');
      setState({
        license: {
          id: 'license',
          title: '運転免許証',
          description: 'ご本人様の運転免許証をご用意ください。',
          icon: 'license',
          imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
          status: 'invalid',
          errorMessage: '有効期限が切れています (満了：令和5年)。更新済みの免許証を添付してください。'
        },
        creditCardDoc: {
          id: 'creditCardDoc',
          title: 'クレジットカード',
          description: '本人認証サービス（3Dセキュア2.0）に対応したクレジットカードが必要です。',
          icon: 'creditcard',
          imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=600',
          status: 'invalid',
          errorMessage: 'デビットカードはご利用いただけません。3Dセキュア対応のクレジットカードを使用してください。'
        },
        creditCardDetails: {
          number: '5311-2222-3333-1111',
          expiry: '04/24',
          cvv: '999',
          brand: 'MASTERCARD',
          secured: false
        },
        contact: {
          phone: '090-0000-0000',
          email: 'invalid-email-pattern'
        },
        addressDoc: {
          id: 'addressDoc',
          title: '現住所確認書類',
          description: '現住所が記載されている公的書類（住民票の写し、公共料金領収書など）が必要です。',
          icon: 'address',
          imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
          status: 'invalid',
          errorMessage: '発行日から3ヶ月以上経過しています。3ヶ月以内の最新原本をご用意ください。',
        },
        addressDetails: {
          type: '公共料金領収書',
          issuedWithin3Months: false
        }
      });
      setValidationAlert("不備データを検出しました。警告メッセージを確認し修正してください。");
    }
  };

  const handleUpdateHotlink = (field: 'license' | 'creditCardDoc' | 'addressDoc', url: string) => {
    setState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        imageUrl: url,
        status: prev[field].status === 'valid' || prev[field].status === 'invalid' ? 'empty' : prev[field].status
      }
    }));
    setValidationAlert(null);
  };

  const handleTriggerScan = (field: 'license' | 'creditCardDoc' | 'addressDoc') => {
    setState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        status: 'scanning'
      }
    }));

    setTimeout(() => {
      setState(prev => {
        if (simulationMode === 'always-succeed') {
          let extracted: Record<string, string> = {};
          if (field === 'license') {
            extracted = {
              '氏名': userName || '山田 太郎',
              '免許証番号': '第 301234567890 号',
              '有効期間': '令和10年(2028年)07月20日',
              '区分': '中型 / 自二'
            };
          } else if (field === 'creditCardDoc') {
            extracted = {
              'ブランド': prev.creditCardDetails.brand || 'VISA',
              'カード番号': '•••• •••• •••• ' + (prev.creditCardDetails.number.slice(-4) || '9981'),
              '名義人': userName.toUpperCase() || 'TARO YAMADA',
              '3D認証': '適格確認済 (Active)'
            };
          } else if (field === 'addressDoc') {
            extracted = {
              '書類種別': prev.addressDetails.type,
              '状態': '発行から3ヶ月以内を確認済',
              '現住所': '日本の登録現住所と完全一致'
            };
          }
          return {
            ...prev,
            [field]: {
              ...prev[field],
              status: 'valid',
              extractedData: extracted
            }
          };
        } else {
          let err = 'AI OCRの品質チェックに合格しませんでした。';
          if (field === 'license') {
            err = '有効期限切れ、または「マイナ免許証」不適合。登録を確認できません。';
          } else if (field === 'creditCardDoc') {
            err = 'デビット/プリペイドカード、または3Dセキュア2.0非対応カードと識別されました。';
          } else if (field === 'addressDoc') {
            err = '発行から3ヶ月以上経過しているか、文字の不鮮明な領収書です。';
          }
          return {
            ...prev,
            [field]: {
              ...prev[field],
              status: 'invalid',
              errorMessage: err
            }
          };
        }
      });
    }, 1500);
  };

  const handleClearDoc = (field: 'license' | 'creditCardDoc' | 'addressDoc') => {
    setState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        imageUrl: '',
        status: 'empty',
        extractedData: undefined,
        errorMessage: undefined
      }
    }));
  };

  const handleFieldChange = (field: string, value: any) => {
    setValidationAlert(null);
    setState(prev => {
      if (field === 'phone') {
        const contact = { ...prev.contact, phone: value };
        return { ...prev, contact };
      }
      if (field === 'email') {
        const contact = { ...prev.contact, email: value };
        return { ...prev, contact };
      }
      if (field === 'cardNumber') {
        const creditCardDetails = { ...prev.creditCardDetails, number: value };
        return { ...prev, creditCardDetails };
      }
      if (field === 'cardBrand') {
        const creditCardDetails = { ...prev.creditCardDetails, brand: value };
        return { ...prev, creditCardDetails };
      }
      if (field === 'cardSecured') {
        const creditCardDetails = { ...prev.creditCardDetails, secured: value };
        return { ...prev, creditCardDetails };
      }
      if (field === 'addressType') {
        const addressDetails = { ...prev.addressDetails, type: value };
        return { ...prev, addressDetails };
      }
      if (field === 'addressIssued') {
        const addressDetails = { ...prev.addressDetails, issuedWithin3Months: value };
        return { ...prev, addressDetails };
      }
      return prev;
    });
  };

  const handleResetAll = () => {
    setState(initialOnboardingState());
    setUserName('');
    setValidationAlert(null);
  };

  // Validation before allowing submit
  const checkCanSubmit = () => {
    // 1. All docs must be valid state
    const licenseValid = state.license.status === 'valid';
    const cardValid = state.creditCardDoc.status === 'valid';
    const addressValid = state.addressDoc.status === 'valid';

    // 2. Details verification
    const hasPhone = state.contact.phone.trim() !== '';
    const hasEmail = state.contact.email.trim() !== '' && state.contact.email.includes('@');
    const hasCardNumber = state.creditCardDetails.number.trim() !== '';
    const securedCard = state.creditCardDetails.secured;
    const addressIssueOk = state.addressDetails.issuedWithin3Months;

    return licenseValid && cardValid && addressValid && hasPhone && hasEmail && hasCardNumber && securedCard && addressIssueOk;
  };

  const handleAgreeAndContinue = () => {
    const isOk = checkCanSubmit();
    if (isOk) {
      setValidationAlert(null);
      setShowCongrats(true);
    } else {
      // Find what is missing and show user action guidance
      let missingMsg = '';
      if (state.license.status !== 'valid') {
        missingMsg = '運転免許証の画像をホットリンクし、「解析」ボタンを押して承認をシミュレートしてください。';
      } else if (state.creditCardDoc.status !== 'valid') {
        missingMsg = 'クレジットカードの画像をホットリンクし、「解析」させてください。';
      } else if (!state.creditCardDetails.secured) {
        missingMsg = 'クレジットカードが「3Dセキュア 2.0に対応」しているか確認し、シミュレーターでチェックを入れてください。';
      } else if (state.contact.phone.trim() === '' || !state.contact.email.includes('@')) {
        missingMsg = '連絡先情報の携帯番号と有効なメールアドレスをご入力ください。';
      } else if (state.addressDoc.status !== 'valid') {
        missingMsg = '現住所確認書類の画像を適用し、承認プロセスに合格させてください。';
      } else if (!state.addressDetails.issuedWithin3Months) {
        missingMsg = '住所確認書類の発行年月は 3ヶ月以内 である必要があります。';
      } else {
        missingMsg = '必須要件がまだ不足しています。各ドキュメントにホットリンク画像を付与してお試しください。';
      }
      setValidationAlert(missingMsg);
    }
  };

  const isLight = theme === 'light-classic';

  return (
    <div className={`min-h-screen ${
      isLight 
        ? 'bg-slate-50 text-gray-900' 
        : 'bg-[#101415] text-[#e0e3e5] font-sans'
    } transition-colors duration-500 pb-12`}>
      
      {/* Top Professional Header for EV Portal */}
      <header className={`w-full py-4 sm:py-5 px-6 border-b ${
        isLight ? 'bg-white border-slate-100 shadow-sm' : 'bg-[#14191b] border-zinc-800/80 shadow-md'
      } transition-colors`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/10">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-sky-500 font-bold">Velocity Drive</span>
              <h1 className={`text-base font-bold tracking-tight mt-0.5 ${isLight ? 'text-gray-900' : 'text-neutral-100 font-display'}`}>
                Electric Velocity 会員要件検証
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-medium ${
              isLight ? 'bg-gray-100 text-gray-600' : 'bg-zinc-800 text-zinc-400'
            }`}>
              SYSTEM PORT: 3000
            </span>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Interactive Mobile Smartphone Emulator Shell */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full max-w-sm shrink-0">
              {/* Header inside mockup wrapper */}
              <div className="mb-3 flex justify-between items-center px-2">
                <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  モバイルシミュレーター
                </span>
                
                {/* Language Switch for High Fidelity translation layout */}
                <div className="flex gap-1 bg-gray-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded-lg text-[10px]">
                  <button 
                    type="button"
                    onClick={() => setSelectedMobileLanguage('ja')}
                    className={`px-1.5 py-0.5 rounded ${selectedMobileLanguage === 'ja' ? 'bg-white dark:bg-zinc-700 font-bold shadow-sm' : 'text-zinc-500'}`}
                  >
                    JP
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedMobileLanguage('zh')}
                    className={`px-1.5 py-0.5 rounded ${selectedMobileLanguage === 'zh' ? 'bg-white dark:bg-zinc-700 font-bold shadow-sm' : 'text-zinc-500'}`}
                  >
                    ZH
                  </button>
                </div>
              </div>

              {/* Smartphone Frame Wrapper */}
              <div 
                className={`relative w-full aspect-[9/19] rounded-[44px] border-[10px] ${
                  isLight 
                    ? 'border-neutral-900 bg-[#f7f9fa] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]' 
                    : 'border-neutral-800 bg-[#0b0f10] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]'
                } overflow-hidden p-0 flex flex-col justify-between`}
                style={{ height: '780px' }}
                id="smartphone-frame"
              >
                {/* Speaker Grill / Notch Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-between px-4">
                  <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
                  <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                  <div className="w-2 h-2 bg-zinc-950 rounded-full flex items-center justify-center">
                    <span className="block w-1 h-1 bg-blue-950 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Simulated Screen Top Status Bar */}
                <div className="h-10 pt-4 px-6 flex justify-between items-center text-xs font-semibold select-none z-20 text-gray-900 dark:text-neutral-400">
                  <span className="font-mono">16:22</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                      <div className="h-full w-full bg-current rounded-2xs" />
                    </div>
                    <span className="text-[10px]">LTE</span>
                  </div>
                </div>

                {/* Smartphone Custom Back Header (Matching exact screenshot title "用户登录" / "ユーザー登録") */}
                <div className="py-2.5 px-5 flex items-center justify-between border-b border-gray-100 dark:border-zinc-900 bg-white/70 dark:bg-[#101415]/70 backdrop-blur-md z-10">
                  <button 
                    onClick={() => {
                      if (mobileStep === 'verification') {
                        setMobileStep('checklist');
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  </button>
                  <h2 className="text-[17px] font-bold text-gray-900 dark:text-white font-sans mt-0.5">
                    {mobileStep === 'checklist' 
                      ? (selectedMobileLanguage === 'zh' ? '用户条件確認' : 'ご本人確認要件')
                      : (selectedMobileLanguage === 'zh' ? '本人認証・アップロード' : '本人確認書類の提出')
                    }
                  </h2>
                  <div className="w-8" />
                </div>

                {/* Screen Scrollable Body Content matching screenshot structure */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
                  
                  {mobileStep === 'checklist' ? (
                    // STEP 1: PURELY INFORMATIONAL CHECKLIST (Identical representation of the screenshot)
                    <>
                      <div className="text-center py-2 px-1">
                        <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                          登録情報の審査のため、以下の書類が必要となります。<br />
                          お手元にご用意があるかご確認ください。
                        </p>
                      </div>

                      {/* Driver License Core Box */}
                      <DocumentCard
                        document={state.license}
                        theme={theme}
                        index={0}
                        onUpdateHotlink={(url) => handleUpdateHotlink('license', url)}
                        onTriggerScan={() => handleTriggerScan('license')}
                        onClear={() => handleClearDoc('license')}
                        isInformationalOnly={true}
                      />

                      {/* Credit Card Verification Box with toggle brand list chips */}
                      <DocumentCard
                        document={state.creditCardDoc}
                        theme={theme}
                        index={1}
                        onUpdateHotlink={(url) => handleUpdateHotlink('creditCardDoc', url)}
                        onTriggerScan={() => handleTriggerScan('creditCardDoc')}
                        onClear={() => handleClearDoc('creditCardDoc')}
                        isInformationalOnly={true}
                      >
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {['VISA', 'MASTERCARD', 'JCB', 'AMEX', 'DINERS'].map((b) => (
                              <span
                                key={b}
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-md border tracking-wider bg-gray-50 dark:bg-[#101415] text-zinc-400 dark:text-zinc-500 border-gray-100 dark:border-zinc-800/80`}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </DocumentCard>

                      {/* Contact info element box */}
                      <div className={`relative w-full rounded-[28px] ${
                        isLight
                          ? 'bg-white border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.015)]'
                          : 'bg-[#191c1e] border border-zinc-80/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                      } p-5 sm:p-6 transition-all`}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3.5 rounded-2xl flex items-center justify-center ${
                            isLight ? 'bg-[#f0f4f9]' : 'bg-[#101415]/85 border border-zinc-800'
                          }`}>
                            <Mail className="w-6 h-6 text-[#1e88e5] dark:text-[#00d1ff]" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-[17px] sm:text-lg font-bold ${isLight ? 'text-gray-900' : 'text-neutral-200'}`}>
                              連絡先情報
                            </h3>
                            <p className={`text-xs sm:text-[13px] mt-1.5 ${isLight ? 'text-gray-500' : 'text-zinc-400'} leading-relaxed`}>
                              携帯電話番号と、キャリアメールまたはGmail、Yahoo!メール等のフリーメールが必要です。
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Address Document proof box */}
                      <DocumentCard
                        document={state.addressDoc}
                        theme={theme}
                        index={3}
                        onUpdateHotlink={(url) => handleUpdateHotlink('addressDoc', url)}
                        onTriggerScan={() => handleTriggerScan('addressDoc')}
                        onClear={() => handleClearDoc('addressDoc')}
                        isInformationalOnly={true}
                      />
                    </>
                  ) : (
                    // STEP 2: ACTIVE OCR SUBMISSION (User actually performs actions, hotlinks, scans here)
                    <>
                      <div className="bg-sky-500/10 rounded-2xl p-4 border border-sky-400/20 text-center">
                        <span className="text-[11px] font-bold text-sky-600 dark:text-cyan-400">STAGE 2: 本人照合アクティブ検証</span>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                          右の Simulation Inspector もしくは各カードから画像を紐付け、AI OCR解析を起動させてください。
                        </p>
                      </div>

                      {/* Driver License Card */}
                      <DocumentCard
                        document={state.license}
                        theme={theme}
                        index={0}
                        onUpdateHotlink={(url) => handleUpdateHotlink('license', url)}
                        onTriggerScan={() => handleTriggerScan('license')}
                        onClear={() => handleClearDoc('license')}
                        isInformationalOnly={false}
                      />

                      {/* Credit Card Verification Box with toggle brand list chips */}
                      <DocumentCard
                        document={state.creditCardDoc}
                        theme={theme}
                        index={1}
                        onUpdateHotlink={(url) => handleUpdateHotlink('creditCardDoc', url)}
                        onTriggerScan={() => handleTriggerScan('creditCardDoc')}
                        onClear={() => handleClearDoc('creditCardDoc')}
                        isInformationalOnly={false}
                      >
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1.5">
                            {['VISA', 'MASTERCARD', 'JCB', 'AMEX', 'DINERS'].map((b) => {
                              const isActive = state.creditCardDetails.brand.toUpperCase() === b;
                              return (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => handleFieldChange('cardBrand', b)}
                                  className={`text-[10px] font-bold px-2 py-1.5 rounded-md border tracking-wider transition-all cursor-pointer ${
                                    isActive 
                                      ? 'bg-sky-600 text-white border-sky-500 scale-105 shadow-sm'
                                      : isLight
                                        ? 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                        : 'bg-[#101415] text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                                  }`}
                                >
                                  {b}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </DocumentCard>

                      {/* Contact info element Box with live simulator sync */}
                      <div className={`relative w-full rounded-[28px] ${
                        isLight
                          ? 'bg-white border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.015)]'
                          : 'bg-[#191c1e] border border-zinc-80/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                      } p-5 sm:p-6 transition-all`}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3.5 rounded-2xl flex items-center justify-center ${
                            isLight ? 'bg-[#f0f4f9]' : 'bg-[#101415]/85 border border-zinc-800'
                          }`}>
                            <Mail className="w-6 h-6 text-[#1e88e5] dark:text-[#00d1ff]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className={`text-[17px] sm:text-lg font-bold ${isLight ? 'text-gray-900' : 'text-neutral-200 font-display'}`}>
                                連絡先情報
                              </h3>
                              {state.contact.phone && state.contact.email.includes('@') && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-950/40 text-emerald-400'
                                }`}>適合</span>
                              )}
                            </div>
                            <p className={`text-xs mt-1 sm:text-[13px] ${isLight ? 'text-gray-500' : 'text-zinc-400'} leading-relaxed`}>
                              携帯電話番号と、キャリアメールまたはGmail、Yahoo!メール等のフリーメールが必要です。
                            </p>

                            {/* Interactive live indicators representing simulation credentials */}
                            <div className="mt-3.5 space-y-2 p-3 rounded-xl bg-gray-50/70 dark:bg-[#101415]/70 border border-gray-100 dark:border-zinc-800 text-xs font-mono">
                              <div className="flex justify-between">
                                <span className="text-zinc-400">PHONE:</span>
                                <span className={state.contact.phone ? 'text-sky-500' : 'text-zinc-400 italic'}>
                                  {state.contact.phone || '未設定 (右側 Inspector で変更)'}
                                </span>
                              </div>
                              <div className="flex justify-between border-t border-gray-100 dark:border-zinc-800/80 pt-1.5">
                                <span className="text-zinc-400">EMAIL:</span>
                                <span className={state.contact.email ? 'text-sky-500 truncate max-w-[150px]' : 'text-zinc-400 italic'}>
                                  {state.contact.email || '未設定 (右側 Inspector で変更)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Address Document Proof Card */}
                      <DocumentCard
                        document={state.addressDoc}
                        theme={theme}
                        index={3}
                        onUpdateHotlink={(url) => handleUpdateHotlink('addressDoc', url)}
                        onTriggerScan={() => handleTriggerScan('addressDoc')}
                        onClear={() => handleClearDoc('addressDoc')}
                        isInformationalOnly={false}
                      >
                        <div className="mt-3">
                          <div className="flex justify-between text-xs font-mono p-2 rounded-lg bg-gray-50 dark:bg-[#101415] border border-gray-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                            <span>添付書類: {state.addressDetails.type}</span>
                            <span>期間適合: {state.addressDetails.issuedWithin3Months ? 'はい (3ヶ月以内)' : '不適合'}</span>
                          </div>
                        </div>
                      </DocumentCard>
                    </>
                  )}

                  <div className="h-6" /> {/* Spacer */}
                </div>

                {/* Smartphone BOTTOM Sticky validation/continue container */}
                <div className={`p-4 border-t ${
                  isLight ? 'bg-white border-gray-100' : 'bg-[#14191b] border-zinc-900'
                } z-20`}>
                  
                  {/* Simulated alert helper */}
                  {validationAlert && mobileStep === 'verification' && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mb-3 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs leading-relaxed border border-rose-100 flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      <span>{validationAlert}</span>
                    </motion.div>
                  )}

                  {mobileStep === 'checklist' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileStep('verification');
                        setValidationAlert(null);
                      }}
                      className="w-full text-center py-4 rounded-2xl font-bold flex items-center justify-center gap-1.5 transition-all text-[15px] cursor-pointer bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 border-none hover:opacity-95 active:scale-[0.98]"
                    >
                      <span>{selectedMobileLanguage === 'zh' ? '同意并继续' : '同意して継続'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAgreeAndContinue}
                      className={`w-full text-center py-4 rounded-2xl font-bold flex items-center justify-center gap-1.5 transition-all text-[15px] cursor-pointer ${
                        checkCanSubmit()
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 border-none hover:bg-opacity-90 active:scale-[0.98]'
                          : isLight
                            ? 'bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200/80 text-center font-semibold'
                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50 hover:bg-zinc-700'
                      }`}
                    >
                      <span>{selectedMobileLanguage === 'zh' ? '提出して完了' : '検証を送信する'}</span>
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {/* Navigation bar helper */}
                  <div className="w-32 h-1 bg-neutral-300 dark:bg-zinc-800 rounded-full mx-auto mt-4" />
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT: Simulation Deck / Controller */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            
            {/* Quick guide card on hotlinking */}
            <div className={`p-6 rounded-[24px] ${
              isLight ? 'bg-white border border-gray-100 shadow-sm' : 'bg-[#191c1e] border border-zinc-800/80 shadow-md'
            }`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-neutral-200'}`}>
                    💡 HTML画像のホットリンク機能について
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    「画像ホットリンク」ボタンより、免許証やクレジットカード等の実証用イメージのURLを設定して<strong>「解析」ボタン</strong>を実行することで、シミュレートされたAI OCRデータ抽出が起動します。
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    また、お好みのWeb上の写真URL（ホットリンク）を自由に指定して表示耐久チェック等を行うこともできます。
                  </p>
                </div>
              </div>
            </div>

            <MockDataControl
              theme={theme}
              onThemeToggle={() => setTheme(prev => prev === 'light-classic' ? 'electric-velocity' : 'light-classic')}
              state={state}
              userName={userName}
              onUserNameChange={(val) => {
                setUserName(val);
                setValidationAlert(null);
              }}
              onQuickFillPresets={handleQuickFill}
              onResetAll={handleResetAll}
              simulationMode={simulationMode}
              setSimulationMode={setSimulationMode}
              onFieldChange={handleFieldChange}
              mobileStep={mobileStep}
              setMobileStep={setMobileStep}
            />

          </div>

        </div>
      </main>

      {/* Completion Modal Celebration */}
      <AnimatePresence>
        {showCongrats && (
          <CongratsModal
            theme={theme}
            userName={userName || 'TARO YAMADA'}
            onReset={() => {
              setShowCongrats(false);
              handleResetAll();
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
