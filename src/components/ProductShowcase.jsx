import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useStore from '../store/useStore';
import FruitIcon from './FruitIcon';

const popularMixes = [
  {
    id: 'tropical',
    fruits: ['mango', 'pineapple', 'orange'],
    gradient: 'from-orange-400 to-yellow-400',
    price: 45,
    preset: 'tropical',
  },
  {
    id: 'berry',
    fruits: ['strawberry', 'blueberry', 'grape'],
    gradient: 'from-pink-500 to-purple-600',
    price: 48,
    preset: 'berry',
  },
  {
    id: 'green',
    fruits: ['cucumber', 'apple', 'mint', 'lemon'],
    gradient: 'from-green-400 to-emerald-500',
    price: 36,
    preset: 'green',
  },
];

const ProductCard = ({ mix, onSelect }) => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
        animate={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Gradient header */}
        <div className={`h-40 bg-gradient-to-br ${mix.gradient} relative overflow-hidden`}>
          {/* Floating fruits */}
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {mix.fruits.map((fruit, i) => (
              <motion.div
                key={i}
                animate={{
                  y: isHovered ? [0, -10, 0] : 0,
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <FruitIcon fruit={fruit} size={48} />
              </motion.div>
            ))}
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-text mb-2">
            {t(`showcase.${mix.id}.name`)}
          </h3>
          <p className="text-text-light text-sm mb-4">
            {t(`showcase.${mix.id}.description`)}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{mix.price} MAD</span>

            <motion.button
              onClick={() => onSelect(mix.preset)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('showcase.tryIt')}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* 3D edge effect */}
        <motion.div
          className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadPreset } = useStore();

  const handleSelectMix = (preset) => {
    loadPreset(preset);
    navigate('/mixer');
  };

  // Featured fruits for decoration
  const decorativeFruits = ['orange', 'lemon', 'strawberry', 'blueberry', 'mango', 'pineapple'];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            {t('showcase.title')}
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            {t('showcase.subtitle')}
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularMixes.map((mix) => (
            <ProductCard
              key={mix.id}
              mix={mix}
              onSelect={handleSelectMix}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center mt-12 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {decorativeFruits.map((fruit, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <FruitIcon fruit={fruit} size={40} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
