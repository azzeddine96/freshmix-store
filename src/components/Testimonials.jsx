import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, ChevronLeft, ChevronRight, Quote, Trophy, Truck, Users } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Casablanca',
    initials: 'SM',
    bgColor: '#FF6B35',
    rating: 5,
    text: {
      en: 'The best fresh juice I\'ve ever had! The fruit mixer is so fun to use, and the delivery was super fast.',
      fr: 'Le meilleur jus frais que j\'ai jamais eu! Le mixeur de fruits est tellement amusant à utiliser.',
      ar: 'أفضل عصير طازج جربته! خلاط الفواكه ممتع جدًا للاستخدام.',
      es: '¡El mejor jugo fresco que he probado! El mezclador de frutas es muy divertido.',
    },
  },
  {
    id: 2,
    name: 'Ahmed K.',
    location: 'Rabat',
    initials: 'AK',
    bgColor: '#4ECDC4',
    rating: 5,
    text: {
      en: 'I order every week! The Green Detox mix is my favorite. Perfect for my morning routine.',
      fr: 'Je commande chaque semaine! Le mix Détox Vert est mon préféré. Parfait pour ma routine matinale.',
      ar: 'أطلب كل أسبوع! مزيج الديتوكس الأخضر هو المفضل لدي.',
      es: '¡Pido cada semana! El mix Detox Verde es mi favorito.',
    },
  },
  {
    id: 3,
    name: 'Fatima Z.',
    location: 'Marrakech',
    initials: 'FZ',
    bgColor: '#FFE66D',
    rating: 5,
    text: {
      en: 'The premium bottles are beautiful and the juice tastes amazing. Highly recommend the Tropical Blast!',
      fr: 'Les bouteilles premium sont magnifiques et le jus a un goût incroyable!',
      ar: 'الزجاجات الفاخرة جميلة والعصير طعمه رائع!',
      es: '¡Las botellas premium son hermosas y el jugo sabe increíble!',
    },
  },
  {
    id: 4,
    name: 'Youssef B.',
    location: 'Tangier',
    initials: 'YB',
    bgColor: '#9C27B0',
    rating: 4,
    text: {
      en: 'Great concept and excellent quality. My whole family loves FreshMix!',
      fr: 'Excellent concept et qualité supérieure. Toute ma famille adore FreshMix!',
      ar: 'فكرة رائعة وجودة ممتازة. كل عائلتي تحب FreshMix!',
      es: '¡Gran concepto y excelente calidad. A toda mi familia le encanta FreshMix!',
    },
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

// Avatar component with initials
const Avatar = ({ initials, bgColor }) => (
  <div
    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
    style={{ backgroundColor: bgColor }}
  >
    {initials}
  </div>
);

const TestimonialCard = ({ testimonial, language }) => {
  const text = testimonial.text[language] || testimonial.text.en;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl p-8 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quote icon */}
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-text text-lg leading-relaxed italic">"{text}"</p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <Avatar initials={testimonial.initials} bgColor={testimonial.bgColor} />
        <div>
          <h4 className="font-semibold text-text">{testimonial.name}</h4>
          <p className="text-sm text-text-light">{testimonial.location}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto">
          {/* Navigation buttons */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-text" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-text" />
          </motion.button>

          {/* Testimonial cards */}
          <div className="relative h-72 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  language={i18n.language}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-primary' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-bold text-text">1000+</p>
              <p className="text-sm text-text-light">{t('testimonials.happyCustomers')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            </div>
            <div>
              <p className="font-bold text-text">4.9/5</p>
              <p className="text-sm text-text-light">{t('testimonials.averageRating')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-text">24h</p>
              <p className="text-sm text-text-light">{t('testimonials.fastDelivery')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
