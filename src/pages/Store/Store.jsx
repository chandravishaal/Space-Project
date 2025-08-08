// src/pages/Store.jsx
import PageWrapper from '../../components/common/PageWrapper';
import { motion } from 'framer-motion';

const Store = () => {
  return (
    <PageWrapper>
      <section className="min-h-[80vh] py-20 px-6 max-w-4xl mx-auto text-white">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Interstellar Store
        </motion.h1>
        <p className="text-center text-gray-400 max-w-xl mx-auto">
          Soon, you’ll be able to download cosmic e-books, purchase digital starmaps, and more — all from our galactic marketplace.
        </p>
      </section>
    </PageWrapper>
  );
};

export default Store;
