import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Play,
  Star,
  Zap,
  Shield,
  Truck,
  Leaf,
} from 'lucide-react';
import FruitIcon from './FruitIcon';
import JuiceShowcase from './JuiceShowcase';

// ─── Animated juice bottle SVG for the hero ──────────────────────────────────

const HeroBottle = () => {
  const id = useId();
  const [activeFruits, setActiveFruits] = useState([0, 1, 2]);

  const fruits = [
    { name: 'orange', color: '#FF9500', x: 55, delay: 0 },
    { name: 'strawberry', color: '#FF4757', x: 70, delay: 0.3 },
    { name: 'mango', color: '#FFA502', x: 45, delay: 0.6 },
    { name: 'kiwi', color: '#7CB342', x: 65, delay: 0.9 },
    { name: 'blueberry', color: '#5352ED', x: 50, delay: 1.2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFruits((prev) => {
        const next = prev.map((i) => (i + 1) % fruits.length);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glow behind bottle */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, rgba(0,212,170,0.15) 50%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 120 220" className="w-full h-full relative z-10 drop-shadow-2xl">
        <defs>
          <linearGradient id={`hero-liq-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{
                stopColor: [
                  '#FF9500',
                  '#FF4757',
                  '#FFA502',
                  '#7CB342',
                  '#FF9500',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: [
                  '#FF950099',
                  '#FF475799',
                  '#FFA50299',
                  '#7CB34299',
                  '#FF950099',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </linearGradient>
          <linearGradient id={`hero-glass-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
          </linearGradient>
          <radialGradient id={`hero-shine-${id}`} cx="0.3" cy="0.15" r="0.8">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <clipPath id={`hero-clip-${id}`}>
            <path d="M30 50 Q18 60 18 75 L18 195 Q18 210 35 210 L85 210 Q102 210 102 195 L102 75 Q102 60 90 50 L85 50 L85 28 Q85 22 78 22 L42 22 Q35 22 35 28 L35 50 Z" />
          </clipPath>
        </defs>

        {/* Cap */}
        <rect x="42" y="2" width="36" height="16" rx="4" fill="#1a1a1a" />
        <rect x="45" y="5" width="30" height="5" rx="2" fill="#444" />
        <rect x="45" y="12" width="30" height="3" fill="#0a0a0a" />

        {/* Neck */}
        <path d="M35 18 L35 50 L85 50 L85 18" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="1" />

        {/* Body */}
        <path
          d="M30 50 Q18 60 18 75 L18 195 Q18 210 35 210 L85 210 Q102 210 102 195 L102 75 Q102 60 90 50 Z"
          fill="#fcfcfc"
          stroke="#e0e0e0"
          strokeWidth="1.5"
        />
        <path
          d="M30 50 Q18 60 18 75 L18 195 Q18 210 35 210 L85 210 Q102 210 102 195 L102 75 Q102 60 90 50 Z"
          fill={`url(#hero-shine-${id})`}
        />

        {/* Liquid with wave */}
        <g clipPath={`url(#hero-clip-${id})`}>
          <motion.path
            d={`M18 90 Q39 85 60 90 Q81 95 102 90 L102 210 L18 210 Z`}
            fill={`url(#hero-liq-${id})`}
            animate={{
              d: [
                'M18 90 Q39 85 60 90 Q81 95 102 90 L102 210 L18 210 Z',
                'M18 90 Q39 95 60 90 Q81 85 102 90 L102 210 L18 210 Z',
                'M18 90 Q39 85 60 90 Q81 95 102 90 L102 210 L18 210 Z',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Second wave layer */}
          <motion.path
            d={`M18 94 Q42 98 60 94 Q78 90 102 94 L102 210 L18 210 Z`}
            fill={`url(#hero-liq-${id})`}
            opacity={0.4}
            animate={{
              d: [
                'M18 94 Q42 98 60 94 Q78 90 102 94 L102 210 L18 210 Z',
                'M18 94 Q42 90 60 94 Q78 98 102 94 L102 210 L18 210 Z',
                'M18 94 Q42 98 60 94 Q78 90 102 94 L102 210 L18 210 Z',
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Bubbles */}
          {[30, 50, 70, 40, 80, 55].map((cx, i) => (
            <motion.circle
              key={i}
              cx={cx}
              r={1 + (i % 3) * 0.6}
              fill="rgba(255,255,255,0.5)"
              animate={{
                cy: [200, 100 + (i % 4) * 15, 200],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </g>

        {/* Glass highlight */}
        <path
          d="M24 75 L24 195 Q24 202 30 202 L38 202 L38 75 Q38 68 34 60 L30 60 Q24 65 24 75"
          fill={`url(#hero-glass-${id})`}
        />
        <path
          d="M96 75 L96 195 Q96 202 92 202 L88 202 L88 75 Q88 68 90 60 L92 60 Q96 65 96 75"
          fill="rgba(255,255,255,0.1)"
        />

        {/* FreshMix label on bottle */}
        <text
          x="60"
          y="155"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.5)"
          fontWeight="800"
          fontFamily="Sora, sans-serif"
          letterSpacing="1"
        >
          FRESHMIX
        </text>
      </svg>

      {/* Floating fruits around the bottle */}
      <AnimatePresence mode="popLayout">
        {activeFruits.map((fruitIndex, i) => {
          const fruit = fruits[fruitIndex];
          const positions = [
            { x: '-40%', y: '10%', rotate: -15 },
            { x: '80%', y: '30%', rotate: 12 },
            { x: '-35%', y: '58%', rotate: -8 },
          ];
          const pos = positions[i];
          return (
            <motion.div
              key={`${fruitIndex}-${i}`}
              className="absolute z-20"
              style={{ left: pos.x, top: pos.y }}
              initial={{ scale: 0, rotate: pos.rotate - 40, opacity: 0 }}
              animate={{ scale: 1, rotate: pos.rotate, opacity: 1 }}
              exit={{ scale: 0, rotate: pos.rotate + 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className="rounded-full p-2.5 sm:p-3 backdrop-blur-sm shadow-lg"
                  style={{
                    background: `${fruit.color}20`,
                    border: `1px solid ${fruit.color}30`,
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
                    <FruitIcon fruit={fruit.name} size={56} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Animated counter ────────────────────────────────────────────────────────

const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Hero Component
// ═════════════════════════════════════════════════════════════════════════════

const Hero = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ─── Layered Background ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 25%, #FEF3C7 50%, #ECFDF5 75%, #FFF7ED 100%)',
          }}
        />

        {/* Animated mesh orbs */}
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,107,53,0.18) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-48 -left-32 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,212,170,0.14) 0%, rgba(0,212,170,0.04) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,230,109,0.12) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />

        {/* Grain overlay for premium texture */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* ─── Floating Fruits (all devices) ────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orange — top-left */}
        <motion.div
          className="absolute top-20 left-[3%] sm:left-[5%] lg:left-[6%]"
          animate={{ y: [0, -22, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
            <FruitIcon fruit="orange" size={96} />
          </div>
        </motion.div>
        {/* Strawberry — top-right */}
        <motion.div
          className="absolute top-28 sm:top-36 right-[3%] sm:right-[8%] lg:right-[10%]"
          animate={{ y: [0, -16, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 flex items-center justify-center">
            <FruitIcon fruit="strawberry" size={80} />
          </div>
        </motion.div>
        {/* Mango — mid-left */}
        <motion.div
          className="absolute bottom-[42%] sm:bottom-[38%] left-[2%] sm:left-[8%] lg:left-[12%]"
          animate={{ y: [0, -28, 0], rotate: [0, 14, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 flex items-center justify-center">
            <FruitIcon fruit="mango" size={88} />
          </div>
        </motion.div>
        {/* Blueberry — mid-right (hidden on small mobile) */}
        <motion.div
          className="absolute top-[50%] right-[2%] sm:right-[4%] lg:right-[6%] hidden sm:block"
          animate={{ y: [0, -18, 0], rotate: [0, -12, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 flex items-center justify-center">
            <FruitIcon fruit="blueberry" size={80} />
          </div>
        </motion.div>
        {/* Kiwi — lower-right (tablet+) */}
        <motion.div
          className="absolute bottom-[44%] right-[12%] sm:right-[16%] lg:right-[18%] hidden sm:block"
          animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
            <FruitIcon fruit="kiwi" size={72} />
          </div>
        </motion.div>
        {/* Pineapple — left (tablet+) */}
        <motion.div
          className="absolute top-[30%] left-[1%] sm:left-[3%] lg:left-[4%] hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.5,
          }}
        >
          <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 flex items-center justify-center">
            <FruitIcon fruit="pineapple" size={80} />
          </div>
        </motion.div>
      </div>

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 pt-28 md:pt-32 lg:pt-36 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Rating Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-xl rounded-full shadow-lg shadow-black/5 border border-white/50 mb-6"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <span className="text-sm font-semibold text-gray-700">
                {t('hero.rating')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 leading-[1.08] tracking-tight"
            >
              <span className="text-gray-900">{t('hero.titleLine1')}</span>
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">{t('hero.titleLine2')}</span>
                {/* Underline decoration */}
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <motion.path
                    d="M2 8 Q50 2 100 7 Q150 12 198 4"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1 }}
                  />
                  <defs>
                    <linearGradient
                      id="underline-grad"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF6B35" />
                      <stop offset="1" stopColor="#00D4AA" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />
              <span className="text-gray-900">{t('hero.titleLine3')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link to="/mixer">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-2xl shadow-xl shadow-primary/25 overflow-hidden text-base"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(255,107,53,0.35)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                  <span className="relative flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <motion.a
                href="#how-it-works"
                className="group flex items-center gap-3 px-6 py-4 text-gray-700 font-semibold hover:text-primary transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                  <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                </div>
                {t('hero.learnMore')}
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900">
                  <AnimatedCounter target={1000} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {t('hero.statCustomers')}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-primary">
                  4.9
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {t('hero.statRating')}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary">
                  <AnimatedCounter target={50} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {t('hero.statRecipes')}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Animated Bottle */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <HeroBottle />
          </motion.div>
        </div>

        {/* ─── Trust Bar ─────────────────────────────────────────────── */}
        <motion.div
          className="mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              {
                icon: Leaf,
                text: t('hero.trustFresh'),
                color: '#22C55E',
              },
              {
                icon: Truck,
                text: t('hero.trustDelivery'),
                color: '#3B82F6',
              },
              {
                icon: Shield,
                text: t('hero.trustNoSugar'),
                color: '#8B5CF6',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-white/60"
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon
                    className="w-3.5 h-3.5"
                    style={{ color: item.color }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Juice Showcase ──────────────────────────────────────────── */}
      <JuiceShowcase />

      {/* ─── Scroll Indicator ────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {t('hero.scroll')}
        </span>
        <motion.div
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
          animate={{ borderColor: ['#D1D5DB', '#9CA3AF', '#D1D5DB'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2.5 bg-gray-400 rounded-full"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
