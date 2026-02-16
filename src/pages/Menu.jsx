import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Droplets,
  Leaf,
  Zap,
  Heart,
  Star,
  ArrowRight,
  GlassWater,
  Milk,
  Filter,
} from 'lucide-react';
import useStore, { FRUITS } from '../store/useStore';
import FruitIcon from '../components/FruitIcon';

// Menu item data with real ingredients
const menuItems = [
  {
    id: 'tropicalSunrise',
    fruits: ['mango', 'pineapple', 'orange', 'honey'],
    liquid: 'orange',
    price: 45,
    calories: 180,
    category: 'energy',
    gradient: 'from-orange-400 to-yellow-400',
    popular: true,
  },
  {
    id: 'berryBlast',
    fruits: ['strawberry', 'blueberry', 'grape'],
    liquid: 'water',
    price: 48,
    calories: 150,
    category: 'immunity',
    gradient: 'from-pink-500 to-purple-600',
    popular: true,
  },
  {
    id: 'greenDetox',
    fruits: ['cucumber', 'apple', 'mint', 'lemon'],
    liquid: 'water',
    price: 36,
    calories: 90,
    category: 'detox',
    gradient: 'from-green-400 to-emerald-500',
    popular: true,
  },
  {
    id: 'citrusBurst',
    fruits: ['orange', 'lemon', 'pineapple', 'honey'],
    liquid: 'water',
    price: 42,
    calories: 160,
    category: 'immunity',
    gradient: 'from-yellow-400 to-orange-500',
    isNew: true,
  },
  {
    id: 'peachyDream',
    fruits: ['peach', 'mango', 'honey'],
    liquid: 'milk',
    price: 50,
    calories: 220,
    category: 'refresh',
    gradient: 'from-pink-300 to-orange-300',
  },
  {
    id: 'carrotGinger',
    fruits: ['carrot', 'apple', 'lemon', 'honey'],
    liquid: 'water',
    price: 38,
    calories: 120,
    category: 'detox',
    gradient: 'from-orange-500 to-red-400',
  },
  {
    id: 'kiwiRefresh',
    fruits: ['kiwi', 'apple', 'mint', 'cucumber'],
    liquid: 'water',
    price: 40,
    calories: 100,
    category: 'refresh',
    gradient: 'from-green-300 to-lime-400',
    isNew: true,
  },
  {
    id: 'mangoLassi',
    fruits: ['mango', 'honey'],
    liquid: 'milk',
    price: 44,
    calories: 250,
    category: 'energy',
    gradient: 'from-yellow-300 to-orange-400',
    popular: true,
  },
];

const categories = ['all', 'energy', 'detox', 'immunity', 'refresh'];

const categoryIcons = {
  all: Filter,
  energy: Zap,
  detox: Leaf,
  immunity: Heart,
  refresh: Droplets,
};

const liquidIcons = {
  water: GlassWater,
  milk: Milk,
  orange: Droplets,
};

const MenuItem = ({ item, onOrder, onCustomize }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const LiquidIcon = liquidIcons[item.liquid];

  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-xl overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex gap-2">
        {item.popular && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full flex items-center gap-1"
          >
            <Star className="w-3 h-3" />
            {t('menu.popular')}
          </motion.span>
        )}
        {item.isNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 bg-secondary text-white text-xs font-bold rounded-full"
          >
            {t('menu.new')}
          </motion.span>
        )}
      </div>

      {/* Header with gradient and fruits */}
      <div className={`h-44 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 p-4">
            {item.fruits.map((fruit, i) => (
              <motion.div
                key={i}
                animate={{
                  y: isHovered ? [0, -8, 0] : 0,
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                <FruitIcon fruit={fruit} size={40} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Liquid indicator */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <LiquidIcon className="w-3 h-3 text-gray-600" />
          <span className="text-xs font-medium text-gray-700">
            {t(`mixer.liquids.${item.liquid}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
          {t(`menu.mixes.${item.id}.name`)}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {t(`menu.mixes.${item.id}.description`)}
        </p>

        {/* Ingredients */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {t('menu.ingredients')}
          </span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.fruits.map((fruit) => (
              <span
                key={fruit}
                className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700 capitalize"
              >
                {t(`fruits.${fruit}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Price and calories */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">{item.price}</span>
            <span className="text-sm text-gray-500 ml-1">DH</span>
          </div>
          <span className="text-sm text-gray-400">
            {item.calories} {t('menu.calories')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onOrder(item)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('menu.orderNow')}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => onCustomize(item)}
            className="px-4 py-2.5 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('menu.customizeIt')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadPreset, clearMixer } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleOrder = (item) => {
    // Load the preset and go to checkout
    clearMixer();
    const store = useStore.getState();

    // Add fruits to mix
    item.fruits.forEach(fruitId => {
      store.addFruit(fruitId);
    });

    // Set liquid
    store.setLiquid(item.liquid);

    navigate('/checkout');
  };

  const handleCustomize = (item) => {
    // Load preset and go to mixer for customization
    clearMixer();
    const store = useStore.getState();

    item.fruits.forEach(fruitId => {
      store.addFruit(fruitId);
    });

    store.setLiquid(item.liquid);

    navigate('/mixer');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-green-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-gray-600">
              {t('menu.subtitle')}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            {t('menu.title')}
          </h1>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {t(`menu.filter${category.charAt(0).toUpperCase() + category.slice(1)}`)}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onOrder={handleOrder}
                onCustomize={handleCustomize}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-4">
            {t('mixer.subtitle')}
          </p>
          <motion.button
            onClick={() => navigate('/mixer')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-full font-bold text-lg shadow-xl shadow-secondary/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            {t('mixer.title')}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Menu;
