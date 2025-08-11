import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarParticles from "../components/common/StarParticles";
import CosmicButton from "../components/common/Buttons";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Star Particles Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <StarParticles />
      </div>

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
        
        {/* Button to return home */}
        <CosmicButton onClick={() => navigate("/")}>
          Return To Home Planet!
        </CosmicButton>{" "}
      </motion.div>
    </motion.section>
  );
};

export default NotFound;
