import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blogPosts from "../../data/blogPosts";

const BlogSection = () => {
  useEffect(() => {
    console.log("%c[BlogSection] Mounted", "color:orange;");
  }, []);

  return (
    <motion.section
      className="py-20 px-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-10 text-center">
        Signals from Deep Space (Blog)
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post, id) => (
          <motion.div
            key={post.id}
            className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700"
            initial={{ opacity: 0, x: id % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onAnimationStart={() => console.log(`[BlogSection] Post ${id + 1} animation start`)}
            onAnimationComplete={() => console.log(`[BlogSection] Post ${id + 1} animation complete`)}
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{post.snippet}</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-sm text-blue-400 underline"
            >
              Read More
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BlogSection;
