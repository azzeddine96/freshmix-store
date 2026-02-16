import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Droplets, Leaf, Sparkles } from 'lucide-react';

// Premium juice bottles data with real high-quality images - Full Menu
const JUICES = [
  {
    id: 1,
    nameKey: 'juiceShowcase.juices.orangeSunrise.name',
    descKey: 'juiceShowcase.juices.orangeSunrise.description',
    color: '#FF9500',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=90',
    calories: '120',
    vitamin: 'C',
  },
  {
    id: 2,
    nameKey: 'juiceShowcase.juices.greenDetox.name',
    descKey: 'juiceShowcase.juices.greenDetox.description',
    color: '#22C55E',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=90',
    calories: '85',
    vitamin: 'K',
  },
  {
    id: 3,
    nameKey: 'juiceShowcase.juices.berryBlast.name',
    descKey: 'juiceShowcase.juices.berryBlast.description',
    color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=90',
    calories: '95',
    vitamin: 'E',
  },
  {
    id: 4,
    nameKey: 'juiceShowcase.juices.tropicalMango.name',
    descKey: 'juiceShowcase.juices.tropicalMango.description',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=90',
    calories: '110',
    vitamin: 'A',
  },
  {
    id: 5,
    nameKey: 'juiceShowcase.juices.purpleGrape.name',
    descKey: 'juiceShowcase.juices.purpleGrape.description',
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400&q=90',
    calories: '100',
    vitamin: 'B6',
  },
  {
    id: 6,
    nameKey: 'juiceShowcase.juices.watermelonFresh.name',
    descKey: 'juiceShowcase.juices.watermelonFresh.description',
    color: '#EF4444',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&q=90',
    calories: '75',
    vitamin: 'A',
  },
  {
    id: 7,
    nameKey: 'juiceShowcase.juices.carrotGlow.name',
    descKey: 'juiceShowcase.juices.carrotGlow.description',
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=90',
    calories: '90',
    vitamin: 'A',
  },
  {
    id: 8,
    nameKey: 'juiceShowcase.juices.pineappleParadise.name',
    descKey: 'juiceShowcase.juices.pineappleParadise.description',
    color: '#EAB308',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=90',
    calories: '115',
    vitamin: 'C',
  },
  {
    id: 9,
    nameKey: 'juiceShowcase.juices.appleCrisp.name',
    descKey: 'juiceShowcase.juices.appleCrisp.description',
    color: '#84CC16',
    image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&q=90',
    calories: '80',
    vitamin: 'K',
  },
  {
    id: 10,
    nameKey: 'juiceShowcase.juices.beetrootPower.name',
    descKey: 'juiceShowcase.juices.beetrootPower.description',
    color: '#DC2626',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=90',
    calories: '95',
    vitamin: 'B9',
  },
];

const JuiceShowcase = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate through juices - extended time (7 seconds per juice)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % JUICES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeJuice = JUICES[activeIndex];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000"
        animate={{
          background: `linear-gradient(135deg, ${activeJuice.color}10 0%, ${activeJuice.color}05 50%, transparent 100%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `${activeJuice.color}40`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: `${activeJuice.color}15`, color: activeJuice.color }}
          >
            <Sparkles className="w-4 h-4" />
            {t('juiceShowcase.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-4">
            {t('juiceShowcase.titleLine1')}
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeJuice.color}, ${activeJuice.color}CC)`,
              }}
            >
              {t('juiceShowcase.titleLine2')}
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('juiceShowcase.description')}
          </p>
        </motion.div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left - Bottle Display */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Glow effect behind bottle */}
            <motion.div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl"
              animate={{
                backgroundColor: `${activeJuice.color}30`,
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Rotating ring */}
            <motion.div
              className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border-2 border-dashed"
              style={{ borderColor: `${activeJuice.color}30` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Second rotating ring */}
            <motion.div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border"
              style={{ borderColor: `${activeJuice.color}20` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Bottle image with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJuice.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 100, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, y: -100, scale: 0.8, rotateY: 30 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Bottle container with glass effect */}
                <div className="relative">
                  {/* Reflection/shine effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${activeJuice.color}20 0%, transparent 50%, ${activeJuice.color}10 100%)`,
                    }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Main bottle image */}
                  <motion.img
                    src={activeJuice.image}
                    alt={activeJuice.name}
                    className="relative w-48 h-72 md:w-64 md:h-96 object-cover rounded-3xl shadow-2xl"
                    style={{
                      boxShadow: `0 25px 80px -20px ${activeJuice.color}60`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Glass shine overlay */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)',
                    }}
                  />

                  {/* Floating droplets */}
                  <motion.div
                    className="absolute -top-6 -right-6"
                    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: activeJuice.color }}
                    >
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4"
                    animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5" style={{ color: activeJuice.color }} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Info Panel */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJuice.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Juice name */}
                <div>
                  <motion.h3
                    className="text-4xl md:text-5xl font-heading font-bold mb-3"
                    style={{ color: activeJuice.color }}
                  >
                    {t(activeJuice.nameKey)}
                  </motion.h3>
                  <p className="text-xl text-gray-600">{t(activeJuice.descKey)}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  <div
                    className="px-6 py-4 rounded-2xl"
                    style={{ backgroundColor: `${activeJuice.color}10` }}
                  >
                    <p className="text-sm text-gray-500 mb-1">{t('juiceShowcase.calories')}</p>
                    <p className="text-2xl font-bold" style={{ color: activeJuice.color }}>
                      {activeJuice.calories}
                    </p>
                  </div>
                  <div
                    className="px-6 py-4 rounded-2xl"
                    style={{ backgroundColor: `${activeJuice.color}10` }}
                  >
                    <p className="text-sm text-gray-500 mb-1">{t('juiceShowcase.richIn')}</p>
                    <p className="text-2xl font-bold" style={{ color: activeJuice.color }}>
                      {t('juiceShowcase.vitamin')} {activeJuice.vitamin}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {[
                    t('juiceShowcase.features.organic'),
                    t('juiceShowcase.features.coldPressed'),
                    t('juiceShowcase.features.noSugar'),
                    t('juiceShowcase.features.freshDaily')
                  ].map(
                    (feature, i) => (
                      <motion.span
                        key={i}
                        className="px-4 py-2 rounded-full text-sm font-medium border"
                        style={{
                          borderColor: `${activeJuice.color}30`,
                          color: activeJuice.color,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {feature}
                      </motion.span>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Juice selector - scrollable menu for 10 items */}
            <div className="pt-8">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {JUICES.map((juice, index) => (
                  <motion.button
                    key={juice.id}
                    className="relative group flex-shrink-0"
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Selection indicator */}
                    {activeIndex === index && (
                      <motion.div
                        className="absolute -inset-2 rounded-2xl"
                        style={{ backgroundColor: `${juice.color}20` }}
                        layoutId="selector"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Thumbnail */}
                    <div
                      className={`relative w-14 h-18 md:w-16 md:h-20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                        activeIndex === index
                          ? 'ring-2 ring-offset-2'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                      style={{
                        ringColor: juice.color,
                      }}
                    >
                      <img
                        src={juice.image}
                        alt={t(juice.nameKey)}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            activeIndex === index
                              ? 'transparent'
                              : 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                        }}
                      />
                      {/* Juice number badge */}
                      <div
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: activeIndex === index ? juice.color : 'rgba(0,0,0,0.5)' }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Progress bar for active item */}
                    {activeIndex === index && isAutoPlaying && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${juice.color}30` }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: juice.color }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 7, ease: 'linear' }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Pagination dots for mobile */}
              <div className="flex justify-center gap-1.5 mt-4 md:hidden">
                {JUICES.map((juice, index) => (
                  <button
                    key={juice.id}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: activeIndex === index ? juice.color : '#D1D5DB',
                      transform: activeIndex === index ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuiceShowcase;
