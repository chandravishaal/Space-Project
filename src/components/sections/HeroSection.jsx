import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlackHole from "../../components/blackhole/BlackHole";
import CosmicButton from "../common/Buttons";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("%c[HeroSection] Mounted", "color:cyan;");
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden px-4 text-white flex flex-col items-center justify-center">
      {/* Black Hole background */}
      <div className="absolute inset-0 z-0">
        <BlackHole />
      </div>

      {/* Main text */}
      <motion.div
        className="relative z-10 text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/name.png"
          alt="name"
          className="mx-auto mt-64 filter brightness-0 w-[90vw] max-w-[700px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
        />

        <p className="text-sm text-black mb-6 tracking-widest">
          FROM STRINGS TO SINGULARITY
        </p>
      </motion.div>

      {/* Button */}
      <motion.div
        className="relative mt-20 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div
          // onClick={() => navigate("/blackhole")}
          // className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CosmicButton onClick={() => navigate("/blackhole")} >Enter Event Horizon</CosmicButton>
          {/* <button onClick={() => navigate("/blackhole")} > Enter Event Horizon</button> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

//THE BELOW IS BASIC BLACKHOLE , WILL NOT BE USED
// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Hero.jsx - Gargantua-style black hole
// export default function BlackHole({
//   width = '100%',
//   height = '100vh',
//   clockwise = false,
//   rotationSpeed = 70.0,
//   innerRadius = 0.8,
//   outerRadius = 2.3,
//   emissivityIndex = 2.8,
//   spectralIndex = 1.0,
//   bloomIntensity = .8,
//   highQuality = true
// }) {
//   return (
//     <div style={{ width, height, position: 'relative', pointerEvents: 'none' }}>
//       <Canvas
//         gl={{ antialias: true, alpha: true }}
//         camera={{ position: [0, 0.5, 4], fov: 50 }}
//         style={{ background: 'transparent' }}
//         onCreated={({ gl }) => {
//           gl.setClearColor(0x000000, 0);
//         }}
//       >
//         <ambientLight intensity={0.1} />

//         <BlackHoleGroup
//           clockwise={clockwise}
//           rotationSpeed={rotationSpeed}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius}
//           emissivityIndex={emissivityIndex}
//           spectralIndex={spectralIndex}
//           highQuality={highQuality}
//         />

//         <EffectComposer disableNormalPass>
//           <Bloom
//             luminanceThreshold={0.3}
//             luminanceSmoothing={0.4}
//             intensity={bloomIntensity}
//             kernelSize={3}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }

// function BlackHoleGroup({ clockwise, rotationSpeed, innerRadius, outerRadius, emissivityIndex, spectralIndex, highQuality }) {
//   return (
//     <group>
//       {/* Event horizon: small dark sphere (hard occluder) */}
//       <mesh position={[0, 0, 0]} renderOrder={0}>
//         <sphereGeometry args={[innerRadius * 0.6, 32, 32]} />
//         {/* ensure this writes depth so it occludes stars behind it */}
//         <meshBasicMaterial color="#000000" depthWrite={true} depthTest={true} />
//       </mesh>

//       {/* Main accretion disk */}
//       <AccretionDisk
//         clockwise={clockwise}
//         rotationSpeed={rotationSpeed}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         emissivityIndex={emissivityIndex}
//         spectralIndex={spectralIndex}
//         highQuality={highQuality}
//         opacity={1.0}
//         renderOrder={1}
//       />

//       {/* Secondary disk for depth (parallax) */}
//       <AccretionDisk
//         clockwise={clockwise}
//         rotationSpeed={rotationSpeed * 1.2}
//         innerRadius={innerRadius * 1.1}
//         outerRadius={outerRadius * 0.8}
//         emissivityIndex={emissivityIndex}
//         spectralIndex={spectralIndex}
//         highQuality={highQuality}
//         opacity={0.45}
//         yOffset={0.05}
//         renderOrder={2}
//       />

//       {/* Photon ring - stationary, no rotation */}
//       <mesh position={[0, 0, 0]} renderOrder={3}>
//         <ringGeometry args={[innerRadius * 0.9, innerRadius * 1.0, 128]} />
//         <meshBasicMaterial
//           color="#ffffff"
//           transparent={true}
//           opacity={0.6}
//           side={THREE.DoubleSide}
//           depthWrite={false} // allow glow to bloom; maintain depthTest so it sits visually correct
//           depthTest={true}
//         />
//       </mesh>
//     </group>
//   );
// }

// function AccretionDisk({
//   clockwise,
//   rotationSpeed,
//   innerRadius,
//   outerRadius,
//   emissivityIndex,
//   spectralIndex,
//   highQuality,
//   opacity = 1.0,
//   yOffset = 0,
//   renderOrder = 1
// }) {
//   const meshRef = useRef();
//   const matRef = useRef();

//   // update rotation (Z axis only) and pass angle to shader so the doppler hotspot follows the mesh rotation
//   useFrame(({ clock }) => {
//     if (meshRef.current) {
//       // rotation.z only — the disk rotates around the Z axis (tilt is static on X for perspective)
//       const baseAngle = (clock.elapsedTime / rotationSpeed) * Math.PI * 2;
//       const rotAngle = (clockwise ? -1 : 1) * baseAngle; // negative => clockwise when camera is at +Z
//       meshRef.current.rotation.z = rotAngle;
//     }

//     if (matRef.current) {
//       // pass both time (for gentle turbulence/noise) and actual rotation angle to shader
//       matRef.current.uniforms.u_time.value = clock.elapsedTime;
//       matRef.current.uniforms.u_rotAngle.value = meshRef.current ? meshRef.current.rotation.z : 0.0;
//     }
//   });

//   const vertexShader = `
//     varying vec2 vUv;
//     varying vec3 vPosition;

//     void main() {
//       vUv = uv;
//       vPosition = position;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `;

//   const fragmentShader = `
//     precision highp float;

//     uniform float u_time;
//     uniform float u_rotAngle;
//     uniform float u_innerRadius;
//     uniform float u_outerRadius;
//     uniform float u_opacity;

//     varying vec2 vUv;
//     varying vec3 vPosition;

//     // small random-ish function for subtle turbulence
//     float hash21(vec2 p){
//       p = fract(p * vec2(123.34, 456.21));
//       p += dot(p, p + 45.32);
//       return fract(p.x * p.y);
//     }

//     void main() {
//       // ring UVs: vUv from ringGeometry typically maps 0..1 across geometry.
//       // center at 0.5 to get a radial coordinate similar to previous code.
//       vec2 center = vec2(0.5, 0.5);
//       vec2 uv = vUv - center;
//       float aspectComp = 1.0; // we keep scale within ring geometry
//       uv.x *= aspectComp;
//       float dist = length(uv);

//       // map dist into normalized ring coordinate in [0..1] where 0 at inner and 1 at outer
//       float innerEdge = 0.1; // visually tuned baseline mapping (kept similar to your map)
//       float outerEdge = 0.45;
//       // create mask from geometry's intrinsic mapping (kept for compatibility)
//       float ringMask = smoothstep(innerEdge - 0.02, innerEdge, dist) *
//                        (1.0 - smoothstep(outerEdge, outerEdge + 0.02, dist));
//       ringMask = clamp(ringMask, 0.0, 1.0);

//       // radial gradient for falloff
//       float radialNorm = clamp((dist - innerEdge) / max(0.0001, (outerEdge - innerEdge)), 0.0, 1.0);
//       float radialGrad = 1.0 - radialNorm;
//       radialGrad = pow(radialGrad, 1.8); // stronger inner concentration (emissivity-like)

//       // azimuth angle (0..2PI)
//       float angle = atan(uv.y, uv.x); // in radians

//       // Use actual mesh rotation angle u_rotAngle so doppler hotspot is physically tied to rotation
//       // Angle difference between a point and rotation gives whether it's approaching or receding
//       float angDiff = angle - u_rotAngle;
//       // normalize angDiff into [-PI, PI]
//       angDiff = mod(angDiff + 3.14159265, 2.0*3.14159265) - 3.14159265;

//       // Approximate Doppler-like brightness using cos(angDiff) (approaching side bright)
//       // scale and bias to get pleasing contrast
//       float dopplerFactor = 0.8 + 1.0 * max(0.0, cos(angDiff)); // approaching side boosts up to ~1.8

//       // small time-based turbulence (kept subtle)
//       float noise = (sin(dist * 80.0 + u_time * 3.0) * 0.5 + 0.5) * 0.06 * (1.0 - radialNorm);
//       noise *= hash21(uv * 100.0);

//       // combine intensity
//       float intensity = radialGrad * dopplerFactor + noise;

//       // color: mostly white/neutral with bluish highlight on approaching side
//       vec3 baseWhite = vec3(0.98, 0.98, 1.0); // slightly cool
//       vec3 bluish = vec3(0.85, 0.9, 1.0);
//       vec3 reddish = vec3(1.0, 0.92, 0.85);

//       // mix color by sign of cos(angDiff): approaching -> bluish, receding -> reddish
//       float approachMix = smoothstep(0.0, 1.0, cos(angDiff));
//       vec3 dopplerColor = mix(reddish, bluish, approachMix);

//       // final disk color
//       vec3 finalColor = baseWhite * 0.6 + dopplerColor * 0.4;
//       finalColor *= intensity;

//       // photon ring faint rim around inner radius
//       float ringCenterR = innerEdge + 0.02;
//       float ringThin = exp(-pow((dist - ringCenterR) / 0.006, 2.0)) * 0.6;

//       // add a subtle inner lensed ghost (faint duplicated glow) tied to the inner radii
//       float innerGhost = 0.0;
//       if (u_outerRadius > 0.0) {
//         float ghostWidth = 0.012;
//         innerGhost = exp(-pow((dist - (innerEdge + 0.03)) / ghostWidth, 2.0)) * 0.25;
//       }

//       // composite: disk + ring + ghost; enforce mask
//       vec3 color = (finalColor * ringMask) + vec3(1.0) * ringThin + vec3(1.0) * innerGhost * 0.8;

//       // alpha: use intensity * provided opacity but ensure inner shadow area remains visible
//       float alpha = clamp((intensity * 0.9 + ringThin * 0.6 + innerGhost * 0.5) * u_opacity, 0.0, 1.0);

//       // tone mapping mild
//       color = 1.0 - exp(-color * 1.5);

//       gl_FragColor = vec4(color, alpha);
//     }
//   `;

//   return (
//     <mesh
//       ref={meshRef}
//       position={[0, yOffset, 0]}
//       rotation={[Math.PI * 0.12, 0, 0]} // slight static tilt so front/behind is visible; does NOT animate on X/Y
//       renderOrder={renderOrder}
//     >
//       {/* keep your ring geometry as-is */}
//       <ringGeometry args={[innerRadius, outerRadius, 128, 32]} />
//       <shaderMaterial
//         ref={matRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent={true}
//         side={THREE.DoubleSide}
//         depthWrite={false} // don't write depth so glow doesn't hard-occlude; keep depthTest true so sphere occludes where appropriate
//         depthTest={true}
//         uniforms={{
//           u_time: { value: 0 },
//           u_rotAngle: { value: 0 },
//           u_innerRadius: { value: innerRadius },
//           u_outerRadius: { value: outerRadius },
//           u_opacity: { value: opacity }
//         }}
//       />
//     </mesh>
//   );
// }
