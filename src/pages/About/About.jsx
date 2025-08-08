import PageWrapper from '../../components/common/PageWrapper';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <PageWrapper>
      <section className="min-h-[80vh] py-20 px-6 max-w-4xl mx-auto text-white">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Astrosapientes
        </motion.h1>
        <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
          Astrosapientes is a cosmic initiative to bridge the mysteries of the universe with everyday curiosity. We’re building tools, stories, and communities for star lovers and space learners.
        </p>
      </section>
    </PageWrapper>
  );
};

export default About;
