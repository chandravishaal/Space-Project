import PageWrapper from '../../src/components/common/PageWrapper';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <PageWrapper>
      <section className="min-h-[80vh] py-20 px-6 max-w-3xl mx-auto text-white">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Mission Control
        </motion.h1>
        <p className="text-gray-400 text-center mb-10">
          Got a cosmic idea or space question? Let us know. Our crew will respond at lightspeed (almost).
        </p>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </PageWrapper>
  );
};

export default Contact;
