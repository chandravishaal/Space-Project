// src/pages/Store.jsx
import PageWrapper from '../../components/common/PageWrapper';
import { motion } from 'framer-motion';

// ✅ NEW — import the StarParticles component
import StarParticles from '../../components/common/StarParticles';

const Store = () => {
  return (
    <PageWrapper>
      {/* ✅ Added relative so particles position correctly */}
      <section className="relative min-h-[80vh] py-20 px-6 max-w-4xl mx-auto text-white">
        
        {/* ✅ Particles in background */}
        <div className="absolute inset-0">
          <StarParticles />
        </div>

        {/* ✅ Content stays above particles with z-index */}
        <motion.h1
          className="relative z-10 text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Interstellar Store
        </motion.h1>

        <p className="relative z-10 text-center text-gray-400 max-w-xl mx-auto">
          Soon, you’ll be able to download cosmic e-books, purchase digital starmaps, and more — all from our galactic marketplace.
        </p>
      </section>
    </PageWrapper>
  );
};

export default Store;
