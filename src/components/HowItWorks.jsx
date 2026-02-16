import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Hand, Blend, Truck } from 'lucide-react';
import FruitIcon from './FruitIcon';

const steps = [
  {
    key: 'step1',
    icon: Hand,
    color: '#FF6B35',
    bgColor: '#FFF0EB',
  },
  {
    key: 'step2',
    icon: Blend,
    color: '#4ECDC4',
    bgColor: '#E8FAF9',
  },
  {
    key: 'step3',
    icon: Truck,
    color: '#FFE66D',
    bgColor: '#FFFBE8',
  },
];

const HowItWorks = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={itemVariants}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* Step number */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: step.bgColor }}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <step.icon
                    className="w-14 h-14"
                    style={{ color: step.color }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-heading font-semibold text-text mb-2">
                  {t(`howItWorks.${step.key}.title`)}
                </h3>
                <p className="text-text-light max-w-xs mx-auto">
                  {t(`howItWorks.${step.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="relative mt-16">
          <motion.div
            className="absolute -top-8 left-1/4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FruitIcon fruit="orange" size={48} />
          </motion.div>
          <motion.div
            className="absolute -top-12 right-1/4"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <FruitIcon fruit="strawberry" size={40} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
