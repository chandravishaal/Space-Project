// import { motion } from "framer-motion";
// import { useEffect } from "react";

// const HeroSection = () => {
//   useEffect(() => {
//     console.log("%c[HeroSection] Mounted", "color:cyan;");
//   }, []);

//   return (
//    <section className="min-h-screen relative overflow-hidden px-4 text-white flex items-center justify-center">
//   {/* Blurred Circle Overlay */}
//   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//     <motion.div
//       className="w-[400px] h-[400px] rounded-full backdrop-blur-lg bg-white/5 border border-white/20"
//       initial={{ scale: 0.95, opacity: 0.8 }}
//       animate={{ scale: 1.05, opacity: 1 }}
//       transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
//     />
//   </div>

//       <motion.div
//         className="z-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         onAnimationStart={() =>
//           console.log("[HeroSection] Main text animation start")
//         }
//         onAnimationComplete={() =>
//           console.log("[HeroSection] Main text animation complete")
//         }
//       >
//         <motion.h1
//           className="text-4xl md:text-6xl font-extrabold mb-3"
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", duration: 1.5 }}
//         >
//           astrosapientes
//         </motion.h1>
//         <p className="text-sm text-gray-400 mb-6 tracking-widest">
//           FROM STRINGS TO SINGULARITY
//         </p>
//         <p className="text-xl text-gray-300 max-w-xl mx-auto">
//           This cosmic space is under development. Something extraordinary is in
//           the making.
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;









// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Hero.jsx - Gargantua-style black hole
// export default function Hero({
//   width = '100%',
//   height = '100vh',
//   clockwise = true,
//   rotationSpeed = 60.0,
//   innerRadius = 0.8,
//   outerRadius = 2.5,
//   emissivityIndex = 2.8,
//   spectralIndex = 1.0,
//   bloomIntensity = 0.8,
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
//       {/* Event horizon: small dark sphere */}
//       <mesh position={[0, 0, 0]}>
//         <sphereGeometry args={[innerRadius * 0.6, 32, 32]} />
//         <meshBasicMaterial color="#000000" />
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
//       />

//       {/* Secondary disk for depth */}
//       <AccretionDisk
//         clockwise={clockwise}
//         rotationSpeed={rotationSpeed * 1.2}
//         innerRadius={innerRadius * 1.1}
//         outerRadius={outerRadius * 0.8}
//         emissivityIndex={emissivityIndex}
//         spectralIndex={spectralIndex}
//         highQuality={highQuality}
//         opacity={0.4}
//         yOffset={0.05}
//       />

//       {/* Photon ring */}
//       <mesh position={[0, 0, 0]}>
//         <ringGeometry args={[innerRadius * 0.9, innerRadius * 1.0, 64]} />
//         <meshBasicMaterial 
//           color="#ffffff" 
//           transparent={true} 
//           opacity={0.6} 
//           side={THREE.DoubleSide}
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
//   yOffset = 0
// }) {
//   const meshRef = useRef();
//   const matRef = useRef();

//   useFrame(({ clock }) => {
//     if (meshRef.current) {
//       const rotSpeed = (clockwise ? -1 : 1) * (clock.elapsedTime / rotationSpeed) * Math.PI * 2;
//       meshRef.current.rotation.z = rotSpeed; // Changed from rotation.y to rotation.z
//     }
    
//     if (matRef.current) {
//       matRef.current.uniforms.u_time.value = clock.elapsedTime;
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
//     uniform float u_time;
//     uniform float u_innerRadius;
//     uniform float u_outerRadius;
//     uniform float u_opacity;
    
//     varying vec2 vUv;
//     varying vec3 vPosition;
    
//     void main() {
//       vec2 center = vec2(0.5, 0.5);
//       vec2 uv = vUv - center;
//       float dist = length(uv);
      
//       // Create ring mask
//       float innerEdge = 0.1;
//       float outerEdge = 0.45;
//       float ringMask = smoothstep(innerEdge - 0.02, innerEdge, dist) * 
//                        (1.0 - smoothstep(outerEdge, outerEdge + 0.02, dist));
      
//       // Radial gradient for realistic falloff
//       float radialGrad = 1.0 - smoothstep(innerEdge, outerEdge, dist);
//       radialGrad = pow(radialGrad, 1.5);
      
//       // Angular variation for Doppler effect
//       float angle = atan(uv.y, uv.x);
//       float doppler = 0.7 + 0.8 * sin(angle + u_time * 0.5);
      
//       // Color temperature variation
//       float temp = radialGrad * doppler;
//       vec3 coldColor = vec3(1.0, 0.8, 0.6); // orange-red
//       vec3 hotColor = vec3(0.8, 0.9, 1.0);  // blue-white
//       vec3 diskColor = mix(coldColor, hotColor, temp);
      
//       // Add some turbulence
//       float noise = sin(dist * 50.0 + u_time * 2.0) * 0.1;
//       float intensity = (radialGrad * doppler + noise) * ringMask;
      
//       // Final color with intensity
//       vec3 finalColor = diskColor * intensity;
//       float alpha = intensity * u_opacity;
      
//       gl_FragColor = vec4(finalColor, alpha);
//     }
//   `;

//   return (
//     <mesh 
//       ref={meshRef}
//       position={[0, yOffset, 0]} 
//       rotation={[Math.PI * 0.1, 0, 0]}
//     >
//       <ringGeometry args={[innerRadius, outerRadius, 128, 32]} />
//       <shaderMaterial
//         ref={matRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent={true}
//         side={THREE.DoubleSide}
//         depthWrite={false}
//         uniforms={{
//           u_time: { value: 0 },
//           u_innerRadius: { value: innerRadius },
//           u_outerRadius: { value: outerRadius },
//           u_opacity: { value: opacity }
//         }}
//       />
//     </mesh>
//   );
// }


//ITS WORKING CAN BE USED 1, above




//222 below



// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Hero.jsx - Gargantua-style black hole
// export default function Hero({
//   width = '100%',
//   height = '100vh',
//   clockwise = true,
//   rotationSpeed = 60.0,
//   innerRadius = 0.8,
//   outerRadius = 2.5,
//   emissivityIndex = 2.8,
//   spectralIndex = 1.0,
//   bloomIntensity = 0.8,
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


//can be used in also,, 2




//this is 3rd one, working, can be used in hero section
// import React, { useRef } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Hero.jsx - Gargantua-style black hole
// export default function Hero({
//   width = '100%',
//   height = '100vh',
//   clockwise = true,
//   rotationSpeed = 60.0,
//   innerRadius = 0.8,
//   outerRadius = 2.5,
//   emissivityIndex = 2.8,
//   spectralIndex = 1.0,
//   bloomIntensity = 0.8,
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
//           depthWrite={false} // allow glow to bloom; keep depthTest so it sits visually correct
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
//   const { camera } = useThree();

//   // update shader uniforms each frame
//   useFrame(({ clock }) => {
//     if (matRef.current) {
//       matRef.current.uniforms.u_time.value = clock.elapsedTime;
//       // camera position in world space
//       matRef.current.uniforms.u_cameraPos.value.copy(camera.position);
//       // clockwise sign
//       matRef.current.uniforms.u_sign.value = clockwise ? -1.0 : 1.0;
//       // base angular speed (rad/s) mapped from rotationSpeed (seconds per revolution at inner rim)
//       matRef.current.uniforms.u_baseOmega.value = (2.0 * Math.PI) / Math.max(0.01, rotationSpeed);
//       matRef.current.uniforms.u_innerR.value = innerRadius;
//       matRef.current.uniforms.u_outerR.value = outerRadius;
//     }
//   });

//   // Vertex shader - moves vertices in 3D by applying a radius-dependent angular offset
//   const vertexShader = `
//     precision highp float;
//     varying vec2 vUv;
//     varying vec3 vWorldPos;
//     varying float vAz;
//     varying float vRnorm;

//     uniform float u_time;
//     uniform float u_baseOmega; // rad/s base (inner rim)
//     uniform float u_sign; // +1 or -1
//     uniform float u_innerR;
//     uniform float u_outerR;

//     // simple clamp function
//     float safePow(float v, float p) {
//       return pow(max(0.0001, v), p);
//     }

//     void main() {
//       vUv = uv;

//       // original position (ringGeometry lies in XY plane centered at 0)
//       vec3 pos = position; // position.x/y already represent ring coords

//       // compute polar coords from the ring geometry pos
//       float r = length(pos.xy); // radius in geometry units (same units as inner/outer radii passed)
//       float az = atan(pos.y, pos.x); // -PI..PI
//       vAz = az;

//       // map geometry radius to normalized 0..1 across the visual inner/outer edges
//       // We don't assume geometry absolute sizes match u_innerR,u_outerR exactly,
//       // so build a normalized radius based on geometry's r relative to u_innerR..u_outerR
//       float rin = u_innerR;
//       float rout = u_outerR;
//       // Defensive mapping: if r outside, clamp
//       float rnorm = clamp((r - rin) / max(0.0001, (rout - rin)), 0.0, 1.0);
//       vRnorm = rnorm;

//       // compute a radius-dependent factor for angular speed:
//       // inner -> faster; outer -> slower. We use (1 - rnorm) ^ 1.5 to mimic Keplerian-like falloff
//       float radialFactor = safePow(1.0 - rnorm, 1.5); // 1 at inner, 0 at outer

//       // angular offset (radians) for this vertex at time u_time
//       // baseOmega corresponds to inner rim angular speed (rad/s).
//       float angOffset = radialFactor * u_baseOmega * u_time * u_sign;

//       float newAz = az + angOffset;

//       // compute new rotated XY
//       float newX = r * cos(newAz);
//       float newY = r * sin(newAz);

//       // small vertical thickness for a realistic 3D feel:
//       // thickness scales with rnorm (thinner outward). Use a small amplitude (0.02 * (outer-inner))
//       float thickness = 0.04 * (1.0 - rnorm); // tune this scalar for thicker/thinner disk
//       float z = thickness * sin(newAz * 2.0 + u_time * 0.3); // subtle azimuthal corrugation

//       // assemble new position in local space (apply yOffset externally via mesh position)
//       vec3 newPos = vec3(newX, newY, z);

//       // compute world-space pos for use in fragment shader
//       vec4 worldPos = modelMatrix * vec4(newPos, 1.0);
//       vWorldPos = worldPos.xyz;

//       // standard projection
//       gl_Position = projectionMatrix * viewMatrix * worldPos;
//     }
//   `;

//   // Fragment shader - uses the per-vertex world pos + az + radius to compute doppler-like beaming
//   const fragmentShader = `
//     precision highp float;
//     varying vec2 vUv;
//     varying vec3 vWorldPos;
//     varying float vAz;
//     varying float vRnorm;

//     uniform float u_time;
//     uniform vec3 u_cameraPos;
//     uniform float u_opacity;

//     void main() {
//       // compute mask and radial falloff using vRnorm
//       float radialGrad = 1.0 - vRnorm;
//       radialGrad = pow(radialGrad, 1.8);

//       // approximate local tangent (velocity) direction in model plane using azimuth
//       // tangent vector in local plane = (-sin(az), cos(az), 0)
//       vec3 vTang = normalize(vec3(-sin(vAz), cos(vAz), 0.0));

//       // view direction from fragment to camera
//       vec3 viewDir = normalize(u_cameraPos - vWorldPos);

//       // project viewDir into disk plane (remove Z component) to compute angle between velocity and projection
//       vec3 viewDirPlane = normalize(vec3(viewDir.x, viewDir.y, 0.0) + 1e-6);

//       // cos theta between local velocity and camera direction projection
//       float cosTheta = dot(vTang, viewDirPlane);

//       // approximate beta based on radius: inner -> larger beta
//       float beta = clamp(0.1 + 0.7 * (1.0 - vRnorm), 0.01, 0.95); // tuneable
//       float gamma = 1.0 / sqrt(1.0 - beta * beta);

//       // relativistic-like Doppler factor (approx)
//       float delta = 1.0 / (gamma * (1.0 - beta * cosTheta));
//       // intensity boost
//       float Iobs = pow(delta, 3.0); // spectral index approx folded in

//       // doppler color mix: approaching (cosTheta>0) -> bluish; receding -> reddish
//       float approach = smoothstep(0.0, 0.9, cosTheta);
//       vec3 bluish = vec3(0.82, 0.9, 1.0);
//       vec3 reddish = vec3(1.0, 0.92, 0.85);
//       vec3 dopplerColor = mix(reddish, bluish, approach);

//       // base color (slightly cool white)
//       vec3 baseWhite = vec3(0.98, 0.98, 1.0);

//       // subtle turbulence from vUv and time (kept mild)
//       float noise = (sin((vUv.x + vUv.y) * 200.0 + u_time * 2.5) * 0.5 + 0.5) * 0.03 * (1.0 - vRnorm);

//       // compose final color
//       vec3 color = (baseWhite * 0.5 + dopplerColor * 0.5) * radialGrad * Iobs + noise;

//       // photon-like inner ring glow (thin)
//       float ringGlow = exp(-pow((vRnorm - 0.06) / 0.01, 2.0)) * 0.6;

//       // final alpha
//       float alpha = clamp((radialGrad * 0.9 * Iobs + ringGlow * 0.6) * u_opacity, 0.0, 1.0);

//       // tone mapping
//       color = 1.0 - exp(-color * 1.4);

//       gl_FragColor = vec4(color + vec3(ringGlow), alpha);
//     }
//   `;

//   return (
//     <mesh
//       ref={meshRef}
//       position={[0, yOffset, 0]}
//       rotation={[Math.PI * 0.12, 0, 0]} // small static tilt only
//       renderOrder={renderOrder}
//     >
//       {/* Keep ring geometry but now the vertex shader repositions vertices in 3D */}
//       <ringGeometry args={[innerRadius, outerRadius, 256, 8]} />
//       <shaderMaterial
//         ref={matRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent={true}
//         side={THREE.DoubleSide}
//         depthWrite={true} // write depth so disk fragments occlude stars when in front
//         depthTest={true}
//         uniforms={{
//           u_time: { value: 0 },
//           u_rotAngle: { value: 0 }, // kept for compatibility (unused now)
//           u_cameraPos: { value: new THREE.Vector3() },
//           u_opacity: { value: opacity },
//           u_baseOmega: { value: (2.0 * Math.PI) / Math.max(0.01, rotationSpeed) },
//           u_sign: { value: clockwise ? -1.0 : 1.0 },
//           u_innerR: { value: innerRadius },
//           u_outerR: { value: outerRadius }
//         }}
//       />
//     </mesh>
//   );
// }












//this is also working, but partcals isnt moving and should be titled in zx plane

// Hero.jsx — robust, GPU-driven, 3D rotating accretion disk (ZX-axis), safe & minimal
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export default function Hero({
  width = "100%",
  height = "100vh",
  clockwise = true,
  rotationSpeed = 60.0,
  innerRadius = 0.8,
  outerRadius = 2.5,
  bloomIntensity = 0.9,
  highQuality = true
}) {
  return (
    <div style={{ width, height, position: "relative", pointerEvents: "none" }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.6, 4], fov: 50 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.06} />
        <BlackHoleGroup
          clockwise={clockwise}
          rotationSpeed={rotationSpeed}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          highQuality={highQuality}
        />

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.4}
            intensity={bloomIntensity}
            kernelSize={3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function BlackHoleGroup({ clockwise, rotationSpeed, innerRadius, outerRadius, highQuality }) {
  return (
    <group>
      {/* opaque event horizon */}
      <mesh position={[0, 0, 0]} renderOrder={0}>
        <sphereGeometry args={[innerRadius * 0.95, 64, 64]} />
        <meshBasicMaterial color={"#000000"} depthWrite={true} depthTest={true} />
      </mesh>

      <AccretionDisk
        clockwise={clockwise}
        rotationSpeed={rotationSpeed}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        highQuality={highQuality}
      />

      {/* stationary photon ring */}
      <mesh position={[0, 0, 0]} renderOrder={3}>
        <ringGeometry args={[innerRadius * 0.88, innerRadius * 1.02, 256]} />
        <meshBasicMaterial
          color={"#ffffff"}
          transparent={true}
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </group>
  );
}

/* AccretionDisk: GPU-driven points + ring mesh with vertex rotation around ZX-axis.
   Important: no CPU per-particle updates. Points attributes store radius/phase/height and shader animates them. */
function AccretionDisk({ clockwise, rotationSpeed, innerRadius, outerRadius, highQuality, opacity = 1.0, yOffset = 0 }) {
  const meshRef = useRef();
  const ringMatRef = useRef();
  const pointsMatRef = useRef();
  const pointsRef = useRef();
  const { camera } = useThree();

  // Tunables
  const particleCount = 3000; // reliable default; raise progressively (watch FPS)
  const tiltAngle = Math.PI * 0.12; // tilt of rotation axis toward +X (ZX plane)
  const thicknessScale = 0.1; // visible disk thickness

  // axis vector in XZ plane
  const axisVec = useMemo(() => new THREE.Vector3(Math.sin(tiltAngle), 0, Math.cos(tiltAngle)).normalize(), [tiltAngle]);

  // Create particle attributes once (GPU-driven)
  const particleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const a_radius = new Float32Array(particleCount);
    const a_phase = new Float32Array(particleCount);
    const a_height = new Float32Array(particleCount);
    const dummyPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const rNorm = Math.pow(t, 0.7); // bias inward
      const r = innerRadius + rNorm * (outerRadius - innerRadius);
      a_radius[i] = r;
      a_phase[i] = Math.random() * Math.PI * 2;
      a_height[i] = (Math.random() - 0.5) * thicknessScale * (1.0 - rNorm) * 0.8;
      dummyPos[3 * i] = 0;
      dummyPos[3 * i + 1] = 0;
      dummyPos[3 * i + 2] = 0;
    }

    geom.setAttribute("position", new THREE.BufferAttribute(dummyPos, 3)); // required but points shader recomputes pos
    geom.setAttribute("a_radius", new THREE.BufferAttribute(a_radius, 1));
    geom.setAttribute("a_phase", new THREE.BufferAttribute(a_phase, 1));
    geom.setAttribute("a_height", new THREE.BufferAttribute(a_height, 1));
    return geom;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, innerRadius, outerRadius, thicknessScale]);

  // Points shaderMaterial (defined inline in JSX below via <shaderMaterial ... />)
  // Ring shaderMaterial similar — provided inline in JSX.

  // Update uniforms each frame safely
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // points uniforms
    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.u_time.value = t;
      pointsMatRef.current.uniforms.u_baseOmega.value = (2.0 * Math.PI) / Math.max(0.01, rotationSpeed);
      pointsMatRef.current.uniforms.u_sign.value = clockwise ? -1.0 : 1.0;
      pointsMatRef.current.uniforms.u_axis.value.copy(axisVec);
      pointsMatRef.current.uniforms.u_cameraPos.value.copy(camera.position);
    }
    // ring uniforms
    if (ringMatRef.current) {
      ringMatRef.current.uniforms.u_time.value = t;
      ringMatRef.current.uniforms.u_baseOmega.value = (2.0 * Math.PI) / Math.max(0.01, rotationSpeed);
      ringMatRef.current.uniforms.u_sign.value = clockwise ? -1.0 : 1.0;
      ringMatRef.current.uniforms.u_axis.value.copy(axisVec);
      ringMatRef.current.uniforms.u_cameraPos.value.copy(camera.position);
    }
  });

  // Safe shaders (kept compact to avoid compile mistakes). If you see white, open console (shader compile errors will log).
  const pointsVertex = `
    precision highp float;
    attribute float a_radius;
    attribute float a_phase;
    attribute float a_height;
    uniform float u_time;
    uniform float u_baseOmega;
    uniform float u_sign;
    uniform vec3 u_axis;
    uniform float u_innerR;
    uniform float u_outerR;
    uniform vec3 u_cameraPos;
    uniform float u_pointSize;
    varying float vAtten;

    // Rodrigues rotation
    vec3 rotateRod(vec3 v, vec3 a, float theta){
      float ca = cos(theta);
      float sa = sin(theta);
      vec3 c = cross(a, v);
      float d = dot(a, v);
      return v*ca + c*sa + a*d*(1.0 - ca);
    }

    void main(){
      float rnorm = clamp((a_radius - u_innerR) / max(0.0001, (u_outerR - u_innerR)), 0.0, 1.0);
      float radialFactor = pow(1.0 - rnorm, 1.5);
      float ang = a_phase + radialFactor * u_baseOmega * u_time * u_sign;
      vec3 local = vec3(a_radius * cos(ang), a_radius * sin(ang), a_height);
      // no double-rotation here; angle already advanced
      vec3 world = (modelMatrix * vec4(local, 1.0)).xyz;
      vAtten = 1.0 - rnorm;
      gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
      // size attenuation: approximate
      float dist = length(u_cameraPos - world);
      float size = u_pointSize * (1.0 / max(0.4, dist)) * (1.0 + 0.6 * (1.0 - rnorm));
      gl_PointSize = size;
    }
  `;

  const pointsFragment = `
    precision highp float;
    varying float vAtten;
    void main(){
      vec2 c = gl_PointCoord.xy - 0.5;
      float r = length(c);
      if(r > 0.5) discard;
      float soft = smoothstep(0.5, 0.25, r);
      vec3 col = vec3(0.92, 0.96, 1.0);
      float alpha = soft * (0.25 + 0.75 * vAtten) * 0.9;
      gl_FragColor = vec4(col * (0.6 + 0.6 * vAtten), alpha);
    }
  `;

  const ringVertex = `
    precision highp float;
    varying vec2 vUv;
    varying vec3 vWorldPos;
    varying float vRnorm;
    varying float vAz;
    uniform float u_time;
    uniform float u_baseOmega;
    uniform float u_sign;
    uniform vec3 u_axis;
    uniform float u_innerR;
    uniform float u_outerR;
    uniform float u_thicknessScale;

    // Rodrigues
    vec3 rotateRod(vec3 v, vec3 a, float theta){
      float ca = cos(theta);
      float sa = sin(theta);
      vec3 c = cross(a, v);
      float d = dot(a, v);
      return v*ca + c*sa + a*d*(1.0 - ca);
    }

    void main(){
      vUv = uv;
      vec3 pos = position;
      float r = length(pos.xy);
      float az = atan(pos.y, pos.x);
      vAz = az;
      float rnorm = clamp((r - u_innerR) / max(0.0001, (u_outerR - u_innerR)), 0.0, 1.0);
      vRnorm = rnorm;
      float radialFactor = pow(1.0 - rnorm, 1.5);
      float angOffset = radialFactor * u_baseOmega * u_time * u_sign;
      vec3 local = vec3(pos.x, pos.y, (u_thicknessScale * 0.5) * (1.0 - rnorm) * sin(radialFactor * 6.0 + u_time * 0.25));
      vec3 rotated = rotateRod(local, normalize(u_axis), angOffset);
      vec4 wpos = modelMatrix * vec4(rotated, 1.0);
      vWorldPos = wpos.xyz;
      gl_Position = projectionMatrix * viewMatrix * wpos;
    }
  `;

  const ringFragment = `
    precision highp float;
    varying vec2 vUv;
    varying vec3 vWorldPos;
    varying float vRnorm;
    varying float vAz;
    uniform float u_time;
    uniform vec3 u_cameraPos;

    void main(){
      float radial = 1.0 - vRnorm;
      radial = pow(radial, 1.8);
      vec3 vTang = normalize(vec3(-sin(vAz), cos(vAz), 0.0));
      vec3 viewDir = normalize(u_cameraPos - vWorldPos);
      vec3 viewDirPlane = normalize(vec3(viewDir.x, viewDir.y, 0.0) + vec3(1e-6));
      float cosTheta = dot(vTang, viewDirPlane);
      float beta = clamp(0.12 + 0.7 * (1.0 - vRnorm), 0.01, 0.95);
      float gamma = 1.0 / sqrt(1.0 - beta * beta);
      float delta = 1.0 / (gamma * (1.0 - beta * cosTheta));
      float Iobs = pow(delta, 3.0);
      float approach = smoothstep(0.0, 0.9, cosTheta);
      vec3 bluish = vec3(0.82, 0.9, 1.0);
      vec3 reddish = vec3(1.0, 0.92, 0.85);
      vec3 dopplerColor = mix(reddish, bluish, approach);
      vec3 baseWhite = vec3(0.98, 0.98, 1.0);
      float noise = (sin((vUv.x + vUv.y) * 200.0 + u_time * 2.5) * 0.5 + 0.5) * 0.03 * (1.0 - vRnorm);
      vec3 color = (baseWhite * 0.5 + dopplerColor * 0.5) * radial * Iobs + noise;
      float rim = exp(-pow((vRnorm - 0.06) / 0.01, 2.0)) * 0.55;
      color = 1.0 - exp(-color * 1.4);
      float alpha = clamp((radial * 0.9 * Iobs + rim * 0.6) * 1.0, 0.0, 1.0);
      gl_FragColor = vec4(color + vec3(rim), alpha);
    }
  `;

  // Attach uniforms for points and ring via JSX <shaderMaterial ... />
  return (
    <group position={[0, yOffset, 0]}>
      {/* Ring mesh */}
      <mesh>
        <ringGeometry args={[innerRadius, outerRadius, 256, 8]} />
        <shaderMaterial
          ref={ringMatRef}
          vertexShader={ringVertex}
          fragmentShader={ringFragment}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={true}
          depthTest={true}
          uniforms={{
            u_time: { value: 0 },
            u_baseOmega: { value: (2.0 * Math.PI) / Math.max(0.01, rotationSpeed) },
            u_sign: { value: clockwise ? -1.0 : 1.0 },
            u_axis: { value: axisVec.clone() },
            u_innerR: { value: innerRadius },
            u_outerR: { value: outerRadius },
            u_thicknessScale: { value: thicknessScale },
            u_cameraPos: { value: new THREE.Vector3() }
          }}
          onError={(e) => {
            console.error("Ring shader error:", e);
          }}
        />
      </mesh>

      {/* Points */}
      <points ref={pointsRef} geometry={particleGeometry}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={pointsVertex}
          fragmentShader={pointsFragment}
          transparent={true}
          depthTest={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            u_time: { value: 0 },
            u_baseOmega: { value: (2.0 * Math.PI) / Math.max(0.01, rotationSpeed) },
            u_sign: { value: clockwise ? -1.0 : 1.0 },
            u_axis: { value: axisVec.clone() },
            u_innerR: { value: innerRadius },
            u_outerR: { value: outerRadius },
            u_cameraPos: { value: new THREE.Vector3() },
            u_pointSize: { value: Math.max(1.2, Math.min(3.4, innerRadius * 6.0)) }
          }}
          onError={(e) => {
            console.error("Points shader error:", e);
          }}
        />
      </points>
    </group>
  );
}


