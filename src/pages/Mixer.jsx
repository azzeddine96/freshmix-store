import { motion } from 'framer-motion';
import FruitMixer from '../components/FruitMixer';

const Mixer = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <FruitMixer />
    </motion.main>
  );
};

export default Mixer;
