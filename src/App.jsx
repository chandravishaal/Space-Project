import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden px-4">
        {/* Star Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            className="w-[200%] h-[200%] bg-[radial-gradient(white,transparent_30%)] opacity-10 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-3"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
          >
            astrosapientes
          </motion.h1>
          <p className="text-sm text-gray-400 mb-6 tracking-widest">
            FROM STRINGS TO SINGULARITY
          </p>
          <p className="text-xl text-gray-300 max-w-xl mx-auto">
            This cosmic space is under development. Something extraordinary is in the making.
          </p>
        </motion.div>
      </section>

      {/* Section: Mock Features */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center"> In Progress Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "AI-powered Astronomy Tools",
            "Cosmic Blog Engine",
            "Interstellar E-commerce",
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-400 text-sm">
                This module is under construction. Stay tuned for updates as we push into deep space.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section: Mock Blog Teasers */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center"> Signals from Deep Space (Blog)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((id) => (
            <motion.div
              key={id}
              className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700"
              initial={{ opacity: 0, x: id % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {id === 1 ? "The Death of a Star" : "Time Travel in Theory"}
              </h3>
              <p className="text-gray-400 text-sm">
                Explore the edges of known physics and peek into what the universe holds.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm">
        astrosapientes - from strings to singularity. All rights reserved. &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
