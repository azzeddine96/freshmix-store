import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import useStore from '../store/useStore';

// Logo SVG Component
const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" fill="url(#logoGrad)" />
    <circle cx="18" cy="18" r="12" fill="url(#logoInner)" />
    <path d="M18 8V6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="18" cy="7" rx="3" ry="1.5" fill="#66BB6A" />
    <circle cx="14" cy="16" r="2" fill="rgba(255,255,255,0.4)" />
    <defs>
      <linearGradient id="logoGrad" x1="2" y1="2" x2="34" y2="34">
        <stop stopColor="#FFB74D" />
        <stop offset="1" stopColor="#FF9800" />
      </linearGradient>
      <radialGradient id="logoInner" cx="0.3" cy="0.3" r="0.7">
        <stop stopColor="#FFCC80" />
        <stop offset="1" stopColor="#FF9800" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { selectedFruits } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/mixer', label: t('nav.mixer') },
  ];

  const cartCount = selectedFruits.length;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2'
            : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between px-4 md:px-6 h-14 md:h-16 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/50'
                : 'bg-white/40 backdrop-blur-md border border-white/30'
            }`}
          >
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Logo />
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-heading font-bold leading-tight">
                    <span className="text-primary">Fresh</span>
                    <span className="text-secondary">Mix</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase hidden sm:block">
                    {t('nav.customJuice')}
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  <motion.div
                    className={`relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      location.pathname === link.to
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {location.pathname === link.to && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Cart */}
              <Link to="/mixer">
                <motion.div
                  className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                    cartCount > 0
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-primary-dark text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              {/* CTA Button - Desktop */}
              <Link to="/mixer" className="hidden lg:block">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-4 h-4" />
                  {t('nav.createMix')}
                </motion.button>
              </Link>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className="p-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 py-3.5 px-4 rounded-xl font-medium transition-all ${
                          location.pathname === link.to
                            ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          location.pathname === link.to ? 'bg-primary' : 'bg-gray-300'
                        }`} />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <Link to="/mixer" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/30">
                      <Sparkles className="w-4 h-4" />
                      {t('nav.createYourMix')}
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
