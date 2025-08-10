




import { useEffect } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import HeroSection from "../../components/sections/HeroSection";
import StarParticles from "../../components/common/StarParticles";
import BlackHole from "../../components/blackhole/BlackHole";
import BlackHoleInfo from "../../components/blackhole/BlackHoleInfo";

const HomePage = () => {
  return (
    <PageWrapper>
      {/* Background particles */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <StarParticles />
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <BlackHole/>
        <BlackHoleInfo />
      </div>
    </PageWrapper>
  );
};

export default HomePage;