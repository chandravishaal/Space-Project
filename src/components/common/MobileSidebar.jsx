import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Home, FileText, ShoppingBag, Wrench, Info, Mail
} from 'lucide-react';


const sidebarVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

const MobileSidebar = ({ isOpen, setIsOpen, navLinks }) => {
  const iconMap = {
    '/': <Home size={16} />,
    '/blog': <FileText size={16} />,
    '/store': <ShoppingBag size={16} />,
    '/store/tools': <Wrench size={16} />,
    '/about': <Info size={16} />,
    '/contact': <Mail size={16} />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          className="fixed top-0 right-0 h-screen w-1/2 z-[9999] bg-gray-900 text-white px-5 py-6 md:hidden flex flex-col shadow-lg"
          style={{ maxWidth: '50vw' }}
        >
       
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 font-semibold text-sm"
            >
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
              <X size={20} className="text-white" />
            </button>
          </div>

          <ul className="flex flex-col gap-5 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                >
                  {iconMap[link.to]} {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
