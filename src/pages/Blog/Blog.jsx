import PageWrapper from '../../components/common/PageWrapper';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPosts from '../../data/blogPosts';

const Blog = () => {
  return (
    <PageWrapper>
      <section className="py-20 px-6 max-w-4xl mx-auto text-white">
        <motion.h1
          className="text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Signals from Deep Space
        </motion.h1>

        <ul className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.li
              key={post.id}
              className="bg-gray-800 p-5 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-400 my-2">{post.snippet}</p>
              <Link to={`/blog/${post.id}`} className="text-blue-400 underline text-sm">
                Read full article
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  );
};

export default Blog;
