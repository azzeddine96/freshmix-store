import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  MapPin,
  Home,
  MessageSquare,
  CreditCard,
  Banknote,
  Check,
  AlertCircle,
  PartyPopper,
  ArrowLeft,
  Truck,
} from 'lucide-react';
import useStore, { SIZES, LIQUIDS } from '../store/useStore';
import FruitIcon from './FruitIcon';
import DeliveryTracking from './DeliveryTracking';

const cities = [
  'casablanca',
  'rabat',
  'marrakech',
  'fes',
  'tangier',
  'agadir',
  'meknes',
  'oujda',
  'benimellal',
];

// Store locations for delivery tracking
const storeLocations = {
  marrakech: { name: 'Gueliz', lat: 31.6295, lng: -8.0084 },
  casablanca: { name: 'Maarif', lat: 33.5731, lng: -7.6236 },
  rabat: { name: 'Agdal', lat: 33.9716, lng: -6.8498 },
  agadir: { name: 'Marina', lat: 30.4278, lng: -9.5981 },
  benimellal: { name: 'Oulad Hemdan', lat: 32.3373, lng: -6.3498 },
  tangier: { name: 'Malabata', lat: 35.7895, lng: -5.8030 },
};

// Confetti component
const Confetti = () => {
  const colors = ['#FF6B35', '#4ECDC4', '#FFE66D', '#FF4444', '#77DD77'];
  const confettiPieces = [...Array(50)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: '100vh',
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Input field component
const FormField = ({
  label,
  icon: Icon,
  error,
  children,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-text">
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-1 text-sm text-error"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const OrderForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    selectedFruits,
    selectedSize,
    selectedLiquid,
    calculateTotal,
    setOrderDetails,
    resetOrder,
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  const pricing = calculateTotal();
  const size = SIZES.find((s) => s.id === selectedSize);

  // Redirect if no items in cart
  useEffect(() => {
    if (selectedFruits.length === 0 && !isSuccess) {
      navigate('/mixer');
    }
  }, [selectedFruits, navigate, isSuccess]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('checkout.errors.required');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('checkout.errors.required');
    } else if (!/^[\+]?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('checkout.errors.invalidPhone');
    }

    if (!formData.city) {
      newErrors.city = t('checkout.errors.selectCity');
    }

    if (!formData.address.trim()) {
      newErrors.address = t('checkout.errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrderNumber = `FM-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(newOrderNumber);

    setOrderDetails({
      ...formData,
      orderNumber: newOrderNumber,
      items: selectedFruits,
      size: selectedSize,
      total: pricing.total,
      createdAt: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Check if this city has delivery tracking
  const hasDeliveryTracking = storeLocations[formData.city];

  if (isSuccess) {
    return (
      <>
        <Confetti />
        <motion.div
          className="min-h-screen bg-cream py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-xl mx-auto">
            {/* Success Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 text-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <PartyPopper className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                className="text-2xl font-heading font-bold text-text mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t('checkout.success.title')}
              </motion.h2>

              <motion.p
                className="text-text-light mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {t('checkout.success.message')}
              </motion.p>

              <motion.div
                className="bg-cream rounded-xl p-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-text-light">{t('checkout.success.orderNumber')}</p>
                <p className="text-xl font-bold text-primary">{orderNumber}</p>
              </motion.div>

              <div className="flex gap-3">
                {hasDeliveryTracking && !showTracking && (
                  <motion.button
                    onClick={() => setShowTracking(true)}
                    className="flex-1 py-3 bg-secondary text-white rounded-full font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Truck className="w-5 h-5" />
                    {t('checkout.success.trackDelivery')}
                  </motion.button>
                )}
                <motion.button
                  onClick={() => {
                    resetOrder();
                    navigate('/');
                  }}
                  className={`py-3 rounded-full font-semibold ${
                    hasDeliveryTracking && !showTracking
                      ? 'flex-1 bg-gray-100 text-gray-700'
                      : 'w-full bg-primary text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {t('checkout.success.backHome')}
                </motion.button>
              </div>
            </motion.div>

            {/* Delivery Tracking */}
            <AnimatePresence>
              {showTracking && hasDeliveryTracking && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <DeliveryTracking city={formData.city} orderNumber={orderNumber} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/mixer')}
          className="flex items-center gap-2 text-text-light hover:text-text mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.back')}
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-heading font-bold text-text mb-2">
              {t('checkout.title')}
            </h1>
            <p className="text-text-light mb-8">{t('checkout.subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <FormField label={t('checkout.form.name')} icon={User} error={errors.name}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t('checkout.form.namePlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.name
                      ? 'border-error focus:border-error'
                      : 'border-gray-200 focus:border-primary'
                  } outline-none`}
                />
              </FormField>

              {/* Phone */}
              <FormField label={t('checkout.form.phone')} icon={Phone} error={errors.phone}>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={t('checkout.form.phonePlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.phone
                      ? 'border-error focus:border-error'
                      : 'border-gray-200 focus:border-primary'
                  } outline-none`}
                />
              </FormField>

              {/* City */}
              <FormField label={t('checkout.form.city')} icon={MapPin} error={errors.city}>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.city
                      ? 'border-error focus:border-error'
                      : 'border-gray-200 focus:border-primary'
                  } outline-none bg-white`}
                >
                  <option value="">{t('checkout.form.cityPlaceholder')}</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {t(`checkout.cities.${city}`)}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Address */}
              <FormField label={t('checkout.form.address')} icon={Home} error={errors.address}>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={t('checkout.form.addressPlaceholder')}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
                    errors.address
                      ? 'border-error focus:border-error'
                      : 'border-gray-200 focus:border-primary'
                  } outline-none`}
                />
              </FormField>

              {/* Notes */}
              <FormField label={t('checkout.form.notes')} icon={MessageSquare}>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder={t('checkout.form.notesPlaceholder')}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary outline-none resize-none"
                />
              </FormField>

              {/* Payment Method */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-text">
                  <CreditCard className="w-4 h-4 text-primary" />
                  {t('checkout.form.payment')}
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'cod')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Banknote className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">{t('checkout.form.cod')}</span>
                    {formData.paymentMethod === 'cod' && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">{t('checkout.form.card')}</span>
                    {formData.paymentMethod === 'card' && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white rounded-full font-semibold shadow-lg disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    {t('checkout.processing')}
                  </span>
                ) : (
                  t('checkout.placeOrder')
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-6">
                {t('checkout.orderSummary')}
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 max-h-64 overflow-y-auto">
                {selectedFruits.map((fruit) => (
                  <div key={fruit.uniqueId} className="flex items-center gap-3">
                    <FruitIcon fruit={fruit.id} size={32} />
                    <span className="flex-1 text-text capitalize">{t(`fruits.${fruit.id}`)}</span>
                    <span className="font-medium">{fruit.price} DH</span>
                  </div>
                ))}
              </div>

              {/* Size */}
              <div className="flex justify-between mb-4">
                <span className="text-text-light">{t('mixer.size')}</span>
                <span className="font-medium">{size?.label}</span>
              </div>

              {/* Pricing */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">{t('mixer.fruitsTotal')}</span>
                  <span>{pricing.fruitsTotal} DH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">{t('mixer.bottleFee')} ({size?.label})</span>
                  <span>{pricing.bottlePrice} DH</span>
                </div>
                {pricing.liquidPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light">{t('mixer.liquidFee')} ({t(`mixer.liquids.${selectedLiquid}`)})</span>
                    <span>{pricing.liquidPrice} DH</span>
                  </div>
                )}
                {pricing.icePrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light">{t('mixer.iceFee')}</span>
                    <span>{pricing.icePrice} DH</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{t('mixer.total')}</span>
                <span className="text-3xl font-bold text-primary">
                  {pricing.total} DH
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
