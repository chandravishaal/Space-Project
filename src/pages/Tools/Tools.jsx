import PageWrapper from '../../components/common/PageWrapper';
import { motion } from 'framer-motion';
import features from '../../data/features';

const Tools = () => {
  return (
    <PageWrapper>
      <section className="min-h-[80vh] py-20 px-6 max-w-5xl mx-auto text-white">
        <motion.h1
          className="text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Cosmic Tools
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((tool, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{tool}</h3>
              <p className="text-gray-400 text-sm">
                This interactive tool will launch soon and take your cosmic learning to the next level.
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Tools;
