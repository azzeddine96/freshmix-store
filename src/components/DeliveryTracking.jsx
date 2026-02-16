import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Package,
  Truck,
  Check,
  Clock,
  Store,
  Navigation,
} from 'lucide-react';

// Store locations for each city
const storeLocations = {
  marrakech: { name: 'Gueliz', area: 'Gueliz, Avenue Mohammed V' },
  casablanca: { name: 'Maarif', area: 'Maarif, Rue Normandie' },
  rabat: { name: 'Agdal', area: 'Agdal, Avenue Fal Ould Oumeir' },
  agadir: { name: 'Marina', area: 'Marina, Boulevard du 20 Août' },
  benimellal: { name: 'Oulad Hemdan', area: 'Oulad Hemdan, Route de Fquih Ben Salah' },
  tangier: { name: 'Malabata', area: 'Malabata, Route de Malabata' },
  fes: { name: 'Ville Nouvelle', area: 'Ville Nouvelle, Avenue Hassan II' },
  meknes: { name: 'Hamria', area: 'Hamria, Avenue des FAR' },
  oujda: { name: 'Centre Ville', area: 'Centre Ville, Boulevard Mohammed V' },
};

// Delivery stages
const stages = ['preparing', 'onTheWay', 'arriving', 'delivered'];

// Animated delivery scooter/bike path SVG
const DeliveryMap = ({ currentStage, city }) => {
  const progress = (stages.indexOf(currentStage) + 1) / stages.length;
  const store = storeLocations[city] || storeLocations.casablanca;

  return (
    <div className="relative w-full h-48 sm:h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl overflow-hidden">
      {/* Map grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
        {/* Horizontal lines */}
        {[...Array(10)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 20}
            x2="400"
            y2={i * 20}
            stroke="#94a3b8"
            strokeWidth="0.5"
          />
        ))}
        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 20}
            y1="0"
            x2={i * 20}
            y2="200"
            stroke="#94a3b8"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Delivery path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        {/* Road/path */}
        <path
          d="M 50 160 Q 100 140 150 120 T 250 80 T 350 50"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M 50 160 Q 100 140 150 120 T 250 80 T 350 50"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="4"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* Animated progress path */}
        <motion.path
          d="M 50 160 Q 100 140 150 120 T 250 80 T 350 50"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
        </defs>

        {/* Store marker */}
        <g transform="translate(40, 145)">
          <circle r="12" fill="#FF6B35" />
          <circle r="8" fill="white" />
          <Store className="w-3 h-3" x="-6" y="-6" stroke="#FF6B35" strokeWidth="2" />
        </g>

        {/* Destination marker */}
        <g transform="translate(360, 35)">
          <circle r="12" fill="#00D4AA" />
          <circle r="8" fill="white" />
          <MapPin className="w-3 h-3" x="-6" y="-8" fill="#00D4AA" />
        </g>
      </svg>

      {/* Animated delivery scooter */}
      <motion.div
        className="absolute"
        initial={{ left: '10%', top: '75%' }}
        animate={{
          left: `${10 + progress * 80}%`,
          top: `${75 - progress * 60}%`,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          {/* Pulse effect */}
          {currentStage !== 'delivered' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Store label */}
      <div className="absolute left-2 bottom-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
        <div className="flex items-center gap-1">
          <Store className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-gray-700">{store.name}</span>
        </div>
      </div>

      {/* Destination label */}
      <div className="absolute right-2 top-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-secondary" />
          <span className="text-xs font-medium text-gray-700">Your Location</span>
        </div>
      </div>
    </div>
  );
};

// Stage indicator component
const StageIndicator = ({ stage, currentStage, label }) => {
  const currentIndex = stages.indexOf(currentStage);
  const stageIndex = stages.indexOf(stage);
  const isCompleted = stageIndex < currentIndex;
  const isActive = stage === currentStage;

  const icons = {
    preparing: Package,
    onTheWay: Truck,
    arriving: Navigation,
    delivered: Check,
  };
  const Icon = icons[stage];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isActive
            ? 'bg-primary text-white ring-4 ring-primary/30'
            : 'bg-gray-200 text-gray-400'
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>
      <span className={`text-[10px] sm:text-xs mt-2 font-medium text-center ${
        isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  );
};

// Progress line between stages
const ProgressLine = ({ isCompleted }) => (
  <div className="flex-1 h-1 mx-1 sm:mx-2 rounded-full bg-gray-200 overflow-hidden">
    <motion.div
      className="h-full bg-green-500"
      initial={{ width: '0%' }}
      animate={{ width: isCompleted ? '100%' : '0%' }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const DeliveryTracking = ({ city, orderNumber }) => {
  const { t } = useTranslation();
  const [currentStage, setCurrentStage] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate delivery progress
  useEffect(() => {
    const stageTimings = [0, 5000, 12000, 20000]; // Time in ms for each stage

    const timers = stageTimings.map((time, index) => {
      if (index === 0) return null;
      return setTimeout(() => {
        setCurrentStage(stages[index]);
        setEstimatedTime(Math.max(0, 25 - index * 8));
      }, time);
    });

    return () => timers.forEach(timer => timer && clearTimeout(timer));
  }, []);

  const store = storeLocations[city] || storeLocations.casablanca;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark p-4 text-white">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Truck className="w-5 h-5" />
          {t('checkout.delivery.title')}
        </h3>
        <p className="text-sm text-white/80 mt-1">
          {t('checkout.delivery.fromStore')}: {store.name} ({store.area})
        </p>
      </div>

      {/* Map */}
      <div className="p-4">
        <DeliveryMap currentStage={currentStage} city={city} />
      </div>

      {/* Stage indicators */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <StageIndicator
                stage={stage}
                currentStage={currentStage}
                label={t(`checkout.delivery.${stage}`)}
              />
              {index < stages.length - 1 && (
                <ProgressLine
                  isCompleted={stages.indexOf(currentStage) > index}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Estimated time */}
      <AnimatePresence>
        {currentStage !== 'delivered' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <div className="bg-orange-50 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {t('checkout.delivery.estimatedTime')}
                </span>
              </div>
              <motion.span
                key={estimatedTime}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-lg font-bold text-primary"
              >
                ~{estimatedTime} {t('checkout.delivery.minutes')}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delivered message */}
      <AnimatePresence>
        {currentStage === 'delivered' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-4 pb-4"
          >
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-green-700 font-semibold">
                {t('checkout.delivery.delivered')}!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeliveryTracking;
