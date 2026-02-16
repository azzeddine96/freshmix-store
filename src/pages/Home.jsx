import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

// Lazy load components for better performance
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const ProductShowcase = lazy(() => import('../components/ProductShowcase'));
const Testimonials = lazy(() => import('../components/Testimonials'));

// Loading skeleton
const SectionSkeleton = () => (
  <div className="py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-6 w-96 bg-gray-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <Suspense fallback={<SectionSkeleton />}>
        <HowItWorks />
      </Suspense>

      {/* Product Showcase */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProductShowcase />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
    </motion.main>
  );
};

export default Home;
