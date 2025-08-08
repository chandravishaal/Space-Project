import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Starry Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(white,transparent_30%)] opacity-10 z-0 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* 404 Content */}
      <motion.div
        className="text-center z-10 max-w-xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-widest text-red-500 drop-shadow-md">
          404
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-medium text-gray-300">
          Aliens destroyed the planet you’re looking for!
        </p>
        <p className="mb-8 text-gray-500">
          But don’t worry, we’ve found a wormhole back to the home planet.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-300 text-white font-semibold"
        >
          Return to Home Planet!
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default NotFound;
