// import PageWrapper from '../../components/common/PageWrapper';
// import features from '../../data/features';
// import blogPosts from '../../data/blogPosts';
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <PageWrapper>
//       {/* Hero */}
//       <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center text-center relative overflow-hidden px-4">
//         <div className="absolute inset-0 overflow-hidden z-0">
//           <motion.div
//             className="w-[200%] h-[200%] bg-[radial-gradient(white,transparent_30%)] opacity-10 animate-pulse"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.1 }}
//             transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
//           />
//         </div>
//         <motion.div
//           className="z-10"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.h1
//             className="text-4xl md:text-6xl font-extrabold mb-3"
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", duration: 1.5 }}
//           >
//             astrosapientes
//           </motion.h1>
//           <p className="text-sm text-gray-400 mb-6 tracking-widest">
//             FROM STRINGS TO SINGULARITY
//           </p>
//           <p className="text-xl text-gray-300 max-w-xl mx-auto">
//             This cosmic space is under development. Something extraordinary is in the making.
//           </p>
//         </motion.div>
//       </section>

//       {/* Features */}
//       <section className="py-20 px-6 max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-10 text-center"> In Progress Features</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, i) => (
//             <motion.div
//               key={feature.id}
//               className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400 text-sm">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Blog Teasers */}
//       <section className="py-20 px-6 max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-10 text-center"> Signals from Deep Space (Blog)</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {blogPosts.map((post, id) => (
//             <motion.div
//               key={post.id}
//               className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700"
//               initial={{ opacity: 0, x: id % 2 === 0 ? 50 : -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
//               <p className="text-gray-400 text-sm mb-2">{post.snippet}</p>
//               <Link to={`/blog/${post.id}`} className="text-sm text-blue-400 underline">Read More</Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </PageWrapper>
//   );
// };

// export default Home;



import { useEffect } from "react";
import PageWrapper from "../../components/common/PageWrapper";
// import HeroSection from "./sections/HeroSection";
// import FeaturesSection from "./sections/FeaturesSection";
import BlogSection from "../../components/sections/BlogSection";
import FeaturesSection from "../../components/sections/FeauturesSection";
import HeroSection from "../../components/sections/HeroSection";
import StarParticles from "../../components/common/StarParticles";

const HomePage = () => {
  return (
    <PageWrapper>
      {/* Background particles */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <StarParticles />
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <BlogSection />
      </div>
    </PageWrapper>
  );
};

export default HomePage;