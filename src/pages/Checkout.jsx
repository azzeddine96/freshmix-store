import { motion } from 'framer-motion';
import OrderForm from '../components/OrderForm';

const Checkout = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <OrderForm />
    </motion.main>
  );
};

export default Checkout;
