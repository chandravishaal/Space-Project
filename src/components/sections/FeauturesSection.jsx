import { motion } from "framer-motion";
import { useEffect } from "react";
import features from "../../data/features";

const FeaturesSection = () => {
  useEffect(() => {
    console.log("%c[FeaturesSection] Mounted", "color:yellow;");
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
        In Progress Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            onAnimationStart={() => console.log(`[FeaturesSection] Feature ${i + 1} animation start`)}
            onAnimationComplete={() => console.log(`[FeaturesSection] Feature ${i + 1} animation complete`)}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
