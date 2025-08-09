// components/SpaceParticles.jsx
import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SpaceParticles = () => {
  console.log("SpaceParticles: Component render started");

  const particlesInit = useCallback(async (engine) => {
    console.log("SpaceParticles: particlesInit called", engine);
    await loadSlim(engine);
    console.log("SpaceParticles: Slim engine loaded");
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("SpaceParticles: particlesLoaded called", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: "transparent",
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // stays behind all content
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: true,
          },
          size: {
            value: { min: 0.5, max: 2 },
            random: true,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default SpaceParticles;


// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// const ParticlesBackground = () => {
//   const init = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={init}
//       options={{
//         fullScreen: { enable: false }, // Keeps it inside hero section
//         background: { color: "#000000" },
//         fpsLimit: 60,
//         particles: {
//           number: { value: 120, density: { enable: true, area: 800 } },
//           color: { value: "#ffffff" },
//           shape: { type: "circle" },
//           opacity: { value: 0.8 },
//           size: { value: 1 },
//           move: { enable: true, speed: 0.3, outModes: { default: "out" } },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default ParticlesBackground;
