import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Twitter,
  Send,
  MapPin,
  Phone,
  Mail,
  Heart,
} from 'lucide-react';
import FruitIcon from './FruitIcon';

// Logo component
const Logo = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <circle cx="20" cy="20" r="18" fill="url(#logoGradFooter)" />
    <ellipse cx="20" cy="20" rx="14" ry="14" fill="url(#logoInnerFooter)" opacity="0.3" />
    <path d="M20 4V2" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="20" cy="4" rx="4" ry="2" fill="#66BB6A" />
    <circle cx="14" cy="16" r="2" fill="rgba(255,255,255,0.4)" />
    <defs>
      <linearGradient id="logoGradFooter" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFB74D" />
        <stop offset="1" stopColor="#FF9800" />
      </linearGradient>
      <radialGradient id="logoInnerFooter" cx="0.3" cy="0.3" r="0.7">
        <stop stopColor="#FFCC80" />
        <stop offset="1" stopColor="#FF9800" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/mixer', label: t('nav.mixer') },
  ];

  // Decorative fruits
  const decorativeFruits = ['orange', 'lemon', 'strawberry', 'blueberry', 'mango'];

  return (
    <footer className="bg-text text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/">
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Logo />
                <span className="text-2xl font-heading font-bold">
                  <span className="text-primary">Fresh</span>
                  <span className="text-secondary">Mix</span>
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6">{t('footer.tagline')}</p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <motion.span
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">{t('footer.email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">
              {t('footer.newsletter')}
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-success text-sm"
                >
                  {t('footer.subscribeSuccess')}
                </motion.p>
              )}
            </form>

            {/* Fruit decoration */}
            <div className="flex gap-2 mt-6">
              {decorativeFruits.map((fruit, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <FruitIcon fruit={fruit} size={24} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} FreshMix. {t('footer.rights')}
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-4 h-4 text-primary fill-primary" /> {t('footer.inMorocco')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
