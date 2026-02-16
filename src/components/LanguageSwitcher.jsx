import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

// SVG Flag Icons
const FlagIcon = ({ code, className = '' }) => {
  const flags = {
    en: (
      <svg viewBox="0 0 60 30" className={className}>
        <clipPath id="flagClipEN">
          <rect width="60" height="30" rx="2" />
        </clipPath>
        <g clipPath="url(#flagClipEN)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    ),
    fr: (
      <svg viewBox="0 0 60 40" className={className}>
        <rect width="60" height="40" rx="2" fill="#fff" />
        <rect width="20" height="40" fill="#0055A4" />
        <rect x="40" width="20" height="40" fill="#EF4135" />
      </svg>
    ),
    ar: (
      <svg viewBox="0 0 60 40" className={className}>
        <rect width="60" height="40" rx="2" fill="#C1272D" />
        <g transform="translate(30, 20)">
          <path
            d="M0,-10 L2.35,-3.09 L9.51,-3.09 L3.58,1.18 L5.88,8.09 L0,3.82 L-5.88,8.09 L-3.58,1.18 L-9.51,-3.09 L-2.35,-3.09 Z"
            fill="none"
            stroke="#006233"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 60 40" className={className}>
        <rect width="60" height="40" rx="2" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
      </svg>
    ),
  };

  return flags[code] || flags.en;
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-text" />
        <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
          <FlagIcon code={currentLang.code} className="w-full h-full" />
        </div>
        <span className="hidden sm:inline text-sm font-medium text-text">
          {currentLang.code.toUpperCase()}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-text" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  currentLang.code === lang.code
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-gray-50 text-text'
                }`}
                whileHover={{ x: 5 }}
              >
                <div className="w-7 h-5 rounded overflow-hidden shadow-sm">
                  <FlagIcon code={lang.code} className="w-full h-full" />
                </div>
                <span className="font-medium">{lang.name}</span>
                {currentLang.code === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
