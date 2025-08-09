import React, { useEffect } from "react";
import StarParticles from "../components/common/StarParticles";

const TestParticles = () => {
  useEffect(() => {
    console.log("[TestParticles] mounted");
    return () => console.log("[TestParticles] unmounted");
  }, []);

  return (
    <div className="relative h-screen bg-black">
  <StarParticles />
  <h1 className="relative z-10 text-white text-center pt-[45vh]">
    This is astrosapientes Prime.
  </h1>
</div>
  );
};

export default TestParticles;
