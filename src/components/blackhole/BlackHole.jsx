
// import React, { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Lightweight Gargantua Black Hole - Optimized & Working
// export default function Hero({
//   width = '100%',
//   height = '100vh',
//   clockwise = true,
//   rotationSpeed = 30.0,
//   innerRadius = 0.15,
//   outerRadius = 0.8,
//   bloomIntensity = 0.6
// }) {
//   return (
//     <div style={{ width, height, position: 'relative', pointerEvents: 'none' }}>
//       <Canvas
//         gl={{ antialias: true, alpha: true }}
//         camera={{ position: [0, 0.2, 2.5], fov: 45 }}
//         style={{ background: 'transparent' }}
//         onCreated={({ gl }) => {
//           gl.setClearColor(0x000000, 0);
//         }}
//       >
//         <BlackHoleSystem
//           clockwise={clockwise}
//           rotationSpeed={rotationSpeed}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius}
//         />

//         <EffectComposer disableNormalPass>
//           <Bloom
//             luminanceThreshold={0.3}
//             intensity={bloomIntensity}
//             kernelSize={2}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }

// function BlackHoleSystem({ clockwise, rotationSpeed, innerRadius, outerRadius }) {
//   return (
//     <group rotation={[-0.3, 0, 0]}> {/* Tilt for side view */}
//       {/* Event Horizon */}
//       <mesh>
//         <sphereGeometry args={[innerRadius, 32, 32]} />
//         <meshBasicMaterial color="#000000" />
//       </mesh>

//       {/* Main Accretion Disk */}
//       <AccretionDisk
//         clockwise={clockwise}
//         rotationSpeed={rotationSpeed}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         layer={0}
//       />

//       {/* Second layer for depth */}
//       <AccretionDisk
//         clockwise={clockwise}
//         rotationSpeed={rotationSpeed * 0.8}
//         innerRadius={innerRadius * 1.1}
//         outerRadius={outerRadius * 0.9}
//         layer={1}
//       />

//       {/* Photon Ring */}
//       <mesh>
//         <ringGeometry args={[innerRadius * 1.8, innerRadius * 1.9, 64]} />
//         <meshBasicMaterial 
//           color="#ffffff" 
//           transparent 
//           opacity={0.4}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
//     </group>
//   );
// }

// function AccretionDisk({ clockwise, rotationSpeed, innerRadius, outerRadius, layer = 0 }) {
//   const diskRef = useRef();
//   const materialRef = useRef();

//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.u_time.value = clock.elapsedTime;
//       materialRef.current.uniforms.u_rotationSpeed.value = clockwise ? -1 / rotationSpeed : 1 / rotationSpeed;
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
//     uniform float u_rotationSpeed;
//     uniform float u_innerRadius;
//     uniform float u_outerRadius;
//     uniform float u_layer;
    
//     varying vec2 vUv;
//     varying vec3 vPosition;
    
//     vec3 heatColor(float t) {
//       t = clamp(t, 0.0, 1.0);
//       if (t < 0.5) {
//         return mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.8, 0.0), t * 2.0);
//       } else {
//         return mix(vec3(1.0, 0.8, 0.0), vec3(0.8, 0.9, 1.0), (t - 0.5) * 2.0);
//       }
//     }
    
//     void main() {
//       vec2 center = vec2(0.5);
//       vec2 uv = vUv - center;
//       float dist = length(uv);
      
//       // Disk boundaries
//       float innerEdge = 0.15;
//       float outerEdge = 0.45;
      
//       // Ring mask
//       float ringMask = smoothstep(innerEdge - 0.01, innerEdge, dist) * 
//                        (1.0 - smoothstep(outerEdge, outerEdge + 0.02, dist));
      
//       if (ringMask < 0.01) discard;
      
//       // Rotation
//       float angle = atan(uv.y, uv.x);
//       float rotatedAngle = angle + u_rotationSpeed * u_time * 6.28;
      
//       // Doppler effect - one side brighter
//       float doppler = 0.3 + 0.7 * (sin(rotatedAngle) * 0.5 + 0.5);
      
//       // Radial intensity falloff
//       float radialIntensity = 1.0 - smoothstep(innerEdge, outerEdge, dist);
//       radialIntensity = pow(radialIntensity, 1.5);
      
//       // Turbulence
//       float turbulence = sin(dist * 40.0 + u_time * 3.0) * 0.1 + 
//                         sin(rotatedAngle * 8.0 + u_time * 2.0) * 0.05;
      
//       // Final intensity
//       float intensity = (radialIntensity * doppler + turbulence) * ringMask;
      
//       // Color based on intensity and position
//       float temp = intensity * (1.0 + doppler * 0.5);
//       vec3 color = heatColor(temp);
      
//       // Layer offset for depth
//       intensity *= (1.0 - u_layer * 0.3);
      
//       gl_FragColor = vec4(color * intensity, intensity * 0.8);
//     }
//   `;

//   return (
//     <mesh ref={diskRef} position={[0, layer * 0.02, 0]}>
//       <ringGeometry args={[innerRadius * 1.2, outerRadius, 128, 32]} />
//       <shaderMaterial
//         ref={materialRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent
//         side={THREE.DoubleSide}
//         depthWrite={false}
//         uniforms={{
//           u_time: { value: 0 },
//           u_rotationSpeed: { value: clockwise ? -1 / rotationSpeed : 1 / rotationSpeed },
//           u_innerRadius: { value: innerRadius },
//           u_outerRadius: { value: outerRadius },
//           u_layer: { value: layer }
//         }}
//       />
//     </mesh>
//   );
// }



// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';
// import StarParticles from '../common/StarParticles';

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
//   bloomIntensity = 1.8,
//   highQuality = true
// }) {
//   return (

//     <div style={{ width, height, position: 'relative', pointerEvents: 'none' }}>
//       <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
//         <StarParticles />
//       </div>
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







//this is amazing the above one, can be used, strong candidate







//------------------

// import React, { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import * as THREE from 'three';

// // Dense particle component for orbiting matter
// function OrbitingParticles({ count = 8000, innerRadius = 1.5, outerRadius = 4.0 }) {
//   const pointsRef = useRef();
  
//   const { positions, velocities, sizes } = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const velocities = new Float32Array(count * 3);
//     const sizes = new Float32Array(count);
    
//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
      
//       // Random radius between inner and outer radius
//       const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
//       const angle = Math.random() * Math.PI * 2;
      
//       // Position in x-z plane (flat disk)
//       positions[i3] = Math.cos(angle) * radius;
//       positions[i3 + 1] = (Math.random() - 0.5) * 0.05; // Even thinner disk
//       positions[i3 + 2] = Math.sin(angle) * radius;
      
//       // Orbital velocity (Keplerian motion - faster closer to center)
//       const orbitalSpeed = Math.sqrt(3.0 / radius) * 0.5;
//       velocities[i3] = -Math.sin(angle) * orbitalSpeed;
//       velocities[i3 + 1] = 0;
//       velocities[i3 + 2] = Math.cos(angle) * orbitalSpeed;
      
//       // Smaller, denser particles - size decreases with radius for realistic density
//       sizes[i] = (0.008 + Math.random() * 0.004) * (innerRadius / radius);
//     }
    
//     return { positions, velocities, sizes };
//   }, [count, innerRadius, outerRadius]);
  
//   useFrame((state, delta) => {
//     if (!pointsRef.current) return;
    
//     const positionArray = pointsRef.current.geometry.attributes.position.array;
    
//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
      
//       // Update positions based on orbital motion
//       positionArray[i3] += velocities[i3] * delta;
//       positionArray[i3 + 1] += velocities[i3 + 1] * delta;
//       positionArray[i3 + 2] += velocities[i3 + 2] * delta;
      
//       // Calculate current radius
//       const x = positionArray[i3];
//       const z = positionArray[i3 + 2];
//       const radius = Math.sqrt(x * x + z * z);
      
//       // Reset particles that fall into the black hole or drift too far
//       if (radius < innerRadius * 0.9 || radius > outerRadius * 1.1) {
//         const newRadius = innerRadius + Math.random() * (outerRadius - innerRadius);
//         const newAngle = Math.random() * Math.PI * 2;
        
//         positionArray[i3] = Math.cos(newAngle) * newRadius;
//         positionArray[i3 + 1] = (Math.random() - 0.5) * 0.05;
//         positionArray[i3 + 2] = Math.sin(newAngle) * newRadius;
        
//         // Update velocity for new position
//         const orbitalSpeed = Math.sqrt(3.0 / newRadius) * 0.5;
//         velocities[i3] = -Math.sin(newAngle) * orbitalSpeed;
//         velocities[i3 + 1] = 0;
//         velocities[i3 + 2] = Math.cos(newAngle) * orbitalSpeed;
//       } else {
//         // Update velocity for orbital motion (recalculate for current position)
//         const angle = Math.atan2(z, x);
//         const orbitalSpeed = Math.sqrt(3.0 / radius) * 0.5;
//         velocities[i3] = -Math.sin(angle) * orbitalSpeed;
//         velocities[i3 + 1] = 0;
//         velocities[i3 + 2] = Math.cos(angle) * orbitalSpeed;
//       }
//     }
    
//     pointsRef.current.geometry.attributes.position.needsUpdate = true;
//   });
  
//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-size"
//           count={count}
//           array={sizes}
//           itemSize={1}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color="#ffffff"
//         size={0.006}
//         transparent
//         opacity={0.9}
//         blending={THREE.AdditiveBlending}
//         sizeAttenuation={true}
//       />
//     </points>
//   );
// }

// // Accretion disk with proper shader
// function AccretionDisk({ innerRadius = 1.5, outerRadius = 4.0 }) {
//   const meshRef = useRef();
//   const materialRef = useRef();
  
//   useFrame((state) => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
//     }
//   });
  
//   const vertexShader = `
//     varying vec2 vUv;
//     varying vec3 vWorldPosition;
    
//     void main() {
//       vUv = uv;
//       vec4 worldPos = modelMatrix * vec4(position, 1.0);
//       vWorldPosition = worldPos.xyz;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `;
  
//   const fragmentShader = `
//     uniform float u_time;
//     uniform float u_innerRadius;
//     uniform float u_outerRadius;
    
//     varying vec2 vUv;
//     varying vec3 vWorldPosition;
    
//     // Noise function for turbulence
//     float noise(vec2 p) {
//       return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
//     }
    
//     void main() {
//       vec2 center = vec2(0.5, 0.5);
//       vec2 uv = vUv - center;
//       float dist = length(uv) * 2.0;
      
//       // Map to actual radius
//       float radius = mix(u_innerRadius, u_outerRadius, dist);
      
//       // Create ring mask
//       float ringMask = smoothstep(0.0, 0.1, dist) * smoothstep(1.0, 0.9, dist);
      
//       if (ringMask < 0.01) discard;
      
//       // Orbital motion effect
//       float angle = atan(uv.y, uv.x);
//       float orbitalSpeed = sqrt(1.0 / radius);
//       float rotatingAngle = angle + u_time * orbitalSpeed * 0.5;
      
//       // Temperature/brightness based on radius (hotter closer to center)
//       float temperature = 1.0 / (radius * radius);
      
//       // Add turbulence
//       vec2 turbCoord = vec2(rotatingAngle, radius) * 10.0 + u_time * 0.2;
//       float turbulence = noise(turbCoord) * 0.3 + noise(turbCoord * 2.0) * 0.15;
      
//       // Doppler effect (one side brighter due to orbital motion)
//       float dopplerShift = 0.7 + 0.3 * sin(rotatingAngle);
      
//       // Final intensity
//       float intensity = temperature * (0.5 + turbulence) * dopplerShift * ringMask;
//       intensity = pow(intensity, 0.8); // Gamma correction
      
//       // Pure white color with varying intensity
//       vec3 color = vec3(1.0) * intensity;
      
//       // Add inner glow for photon sphere effect
//       float innerGlow = exp(-pow((dist - 0.1) / 0.05, 2.0)) * 0.5;
//       color += vec3(1.0) * innerGlow;
      
//       gl_FragColor = vec4(color, intensity * 0.8);
//     }
//   `;
  
//   return (
//     <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
//       <ringGeometry args={[innerRadius, outerRadius, 64, 32]} />
//       <shaderMaterial
//         ref={materialRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent
//         side={THREE.DoubleSide}
//         uniforms={{
//           u_time: { value: 0 },
//           u_innerRadius: { value: innerRadius },
//           u_outerRadius: { value: outerRadius }
//         }}
//         blending={THREE.AdditiveBlending}
//       />
//     </mesh>
//   );
// }

// // Photon sphere - the bright ring around event horizon
// function PhotonSphere({ radius = 1.5 }) {
//   const meshRef = useRef();
  
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.z += 0.01;
//     }
//   });
  
//   return (
//     <mesh ref={meshRef}>
//       <torusGeometry args={[radius, 0.025, 16, 64]} />
//       <meshBasicMaterial
//         color="#ffffff"
//         transparent
//         opacity={0.9}
//         blending={THREE.AdditiveBlending}
//       />
//     </mesh>
//   );
// }

// // Event horizon - pure black sphere
// function EventHorizon({ radius = 0.8 }) {
//   return (
//     <mesh>
//       <sphereGeometry args={[radius, 32, 32]} />
//       <meshBasicMaterial color="#000000" />
//     </mesh>
//   );
// }

// // Relativistic jets (optional - can be enabled/disabled)
// function RelativisticJets({ show = true, length = 8 }) {
//   if (!show) return null;
  
//   const jetRef = useRef();
  
//   useFrame((state) => {
//     if (jetRef.current) {
//       const intensity = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2);
//       jetRef.current.material.opacity = intensity * 0.6;
//     }
//   });
  
//   return (
//     <group>
//       {/* Top jet */}
//       <mesh position={[0, length/2, 0]} ref={jetRef}>
//         <cylinderGeometry args={[0.05, 0.2, length, 16]} />
//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.4}
//           blending={THREE.AdditiveBlending}
//         />
//       </mesh>
      
//       {/* Bottom jet */}
//       <mesh position={[0, -length/2, 0]}>
//         <cylinderGeometry args={[0.05, 0.2, length, 16]} />
//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.4}
//           blending={THREE.AdditiveBlending}
//         />
//       </mesh>
//     </group>
//   );
// }

// // Background stars
// function StarField({ count = 1000 }) {
//   const positions = useMemo(() => {
//     const pos = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       pos[i * 3] = (Math.random() - 0.5) * 100;
//       pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
//       pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
//     }
//     return pos;
//   }, [count]);
  
//   return (
//     <points>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color="#ffffff"
//         size={0.5}
//         transparent
//         opacity={0.6}
//       />
//     </points>
//   );
// }

// // Main black hole component
// export default function RealisticBlackHole({
//   width = '100%',
//   height = '100vh',
//   showJets = false,
//   innerRadius = 1.5,
//   outerRadius = 4.0,
//   eventHorizonRadius = 0.8,
//   photonSphereRadius = 1.5
// }) {
//   return (
//     <div style={{ 
//       width, 
//       height, 
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       <Canvas
//         camera={{ 
//           position: [0, 3, 8], 
//           fov: 45,
//           near: 0.1,
//           far: 1000
//         }}
//         gl={{ 
//           antialias: true,
//           powerPreference: "high-performance",
//           alpha: true
//         }}
//         style={{ background: 'transparent' }}
//       >
//         {/* Lighting */}
//         <ambientLight intensity={0.02} />
        
//         {/* Black hole components */}
//         <group>
//           {/* Event horizon (renders first, pure black) */}
//           <EventHorizon radius={eventHorizonRadius} />
          
//           {/* Photon sphere */}
//           <PhotonSphere radius={photonSphereRadius} />
          
//           {/* Accretion disk */}
//           <AccretionDisk 
//             innerRadius={innerRadius} 
//             outerRadius={outerRadius} 
//           />
          
//           {/* Orbiting particles */}
//           <OrbitingParticles 
//             count={8000}
//             innerRadius={innerRadius}
//             outerRadius={outerRadius}
//           />
          
//           {/* Relativistic jets (optional) */}
//           <RelativisticJets show={showJets} />
//         </group>
        
//         {/* Post-processing effects */}
//         <EffectComposer>
//           <Bloom
//             luminanceThreshold={0.2}
//             luminanceSmoothing={0.4}
//             intensity={1.5}
//             radius={0.4}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }














import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Configuration constants
const CONFIG = {
  PARTICLES: {
    COUNT_BASE: 62000,
    SIZE_BASE: 0.002,
    ORBIT_SPEED: 0.4,
    DENSITY_FALLOFF: 0.6,
    RESET_THRESHOLD: 0.05
  },
  RADII: {
    EVENT_HORIZON: 0.8,
    PHOTON_SPHERE: 0.81,
    DISK_INNER: 0.82,
    DISK_OUTER: 3.0
  },
  QUALITY: {
    LOW: { particles: 0.6, segments: 32 },
    MEDIUM: { particles: 1.0, segments: 64 },
    HIGH: { particles: 1.4, segments: 96 }
  }
};

// Ultra-dense particle system for continuous flow appearance
const DenseParticleFlow = React.memo(({ 
  innerRadius = CONFIG.RADII.DISK_INNER,
  outerRadius = CONFIG.RADII.DISK_OUTER,
  quality = 'medium'
}) => {
  const pointsRef = useRef();
  const qualityConfig = CONFIG.QUALITY[quality.toUpperCase()] || CONFIG.QUALITY.MEDIUM;
  const particleCount = Math.floor(CONFIG.PARTICLES.COUNT_BASE * qualityConfig.particles);

  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Exponential distribution for higher density near inner edge
      const t = Math.pow(Math.random(), 2);
      const radius = innerRadius + t * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.015 * Math.exp(-radius * 0.4);

      // Position
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Keplerian orbital velocity
      const orbitalSpeed = Math.sqrt(CONFIG.PARTICLES.ORBIT_SPEED / radius);
      velocities[i3] = -Math.sin(angle) * orbitalSpeed;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = Math.cos(angle) * orbitalSpeed;

      // Size based on density (smaller particles create flow effect)
      const densityFactor = Math.exp(-(radius - innerRadius) * CONFIG.PARTICLES.DENSITY_FALLOFF);
      sizes[i] = CONFIG.PARTICLES.SIZE_BASE * (0.5 + Math.random()) * densityFactor;
    }

    return { positions, velocities, sizes };
  }, [particleCount, innerRadius, outerRadius]);

  const updateParticles = useCallback((delta) => {
    if (!pointsRef.current) return;

    const positionArray = pointsRef.current.geometry.attributes.position.array;
    const { velocities } = particleData;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Update positions
      positionArray[i3] += velocities[i3] * delta;
      positionArray[i3 + 1] += velocities[i3 + 1] * delta;
      positionArray[i3 + 2] += velocities[i3 + 2] * delta;

      const x = positionArray[i3];
      const z = positionArray[i3 + 2];
      const radius = Math.sqrt(x * x + z * z);

      // Reset particles that fall into black hole or drift too far
      if (radius < innerRadius - CONFIG.PARTICLES.RESET_THRESHOLD || 
          radius > outerRadius + CONFIG.PARTICLES.RESET_THRESHOLD) {
        
        const t = Math.pow(Math.random(), 2);
        const newRadius = innerRadius + t * (outerRadius - innerRadius);
        const newAngle = Math.random() * Math.PI * 2;

        positionArray[i3] = Math.cos(newAngle) * newRadius;
        positionArray[i3 + 1] = (Math.random() - 0.5) * 0.015 * Math.exp(-newRadius * 0.4);
        positionArray[i3 + 2] = Math.sin(newAngle) * newRadius;

        // Update velocity
        const orbitalSpeed = Math.sqrt(CONFIG.PARTICLES.ORBIT_SPEED / newRadius);
        velocities[i3] = -Math.sin(newAngle) * orbitalSpeed;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = Math.cos(newAngle) * orbitalSpeed;
      } else {
        // Update orbital velocity for current position
        const angle = Math.atan2(z, x);
        const orbitalSpeed = Math.sqrt(CONFIG.PARTICLES.ORBIT_SPEED / radius);
        velocities[i3] = -Math.sin(angle) * orbitalSpeed;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = Math.cos(angle) * orbitalSpeed;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  }, [particleCount, innerRadius, outerRadius, particleData]);

  useFrame((_, delta) => {
    updateParticles(delta);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particleData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={CONFIG.PARTICLES.SIZE_BASE}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
});

// Optimized accretion disk shader
const AccretionDisk = React.memo(({ 
  innerRadius = CONFIG.RADII.DISK_INNER,
  outerRadius = CONFIG.RADII.DISK_OUTER,
  quality = 'medium'
}) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const qualityConfig = CONFIG.QUALITY[quality.toUpperCase()] || CONFIG.QUALITY.MEDIUM;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.elapsedTime;
      materialRef.current.uniforms.u_rotation.value = clock.elapsedTime * 0.1;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform float u_rotation;
        uniform float u_innerRadius;
        uniform float u_outerRadius;
        
        varying vec2 vUv;
        
        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          
          return mix(
            mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
            mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          vec2 uv = vUv - center;
          float dist = length(uv) * 2.0;
          
          // Smooth ring mask
          float ringMask = smoothstep(0.0, 0.04, dist) * smoothstep(1.0, 0.96, dist);
          if (ringMask < 0.005) discard;
          
          float radius = mix(u_innerRadius, u_outerRadius, dist);
          float angle = atan(uv.y, uv.x) + u_rotation;
          
          // Radial brightness falloff
          float brightness = pow(1.0 / radius, 0.6) * (0.8 + 0.2 * exp(-radius * 0.2));
          
          // Subtle turbulence
          vec2 noiseCoord = vec2(angle * 1.5, radius * 1.2) + u_time * 0.05;
          float turbulence = noise(noiseCoord) * 0.25;
          
          // Spiral structure
          float spiral = sin(angle * 1.2 + radius * 4.0 - u_time * 1.2) * 0.15;
          
          float intensity = brightness * (0.85 + turbulence + spiral) * ringMask;
          intensity = pow(clamp(intensity, 0.0, 1.0), 0.8);
          
          gl_FragColor = vec4(vec3(1.0) * intensity, intensity * 0.5);
        }
      `,
      uniforms: {
        u_time: { value: 0 },
        u_rotation: { value: 0 },
        u_innerRadius: { value: innerRadius },
        u_outerRadius: { value: outerRadius }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [innerRadius, outerRadius]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, qualityConfig.segments, 12]} />
      <primitive ref={materialRef} object={shaderMaterial} />
    </mesh>
  );
});







// // Photon sphere perfectly aligned with event horizon(not used)
// const PhotonSphere = React.memo(({ 
//   radius = CONFIG.RADII.PHOTON_SPHERE,
//   quality = 'medium'
// }) => {
//   const meshRef = useRef();
//   const materialRef = useRef();
//   const qualityConfig = CONFIG.QUALITY[quality.toUpperCase()] || CONFIG.QUALITY.MEDIUM;

//   useFrame(({ clock }) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.z += 0.06;
//     }
//     if (materialRef.current) {
//       materialRef.current.uniforms.u_time.value = clock.elapsedTime;
//     }
//   });

//   const shaderMaterial = useMemo(() => {
//     return new THREE.ShaderMaterial({
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float u_time;
//         varying vec2 vUv;
        
//         void main() {
//           vec2 center = vec2(0.5, 0.5);
//           float dist = length(vUv - center) * 2.0;
          
//           // Ultra-sharp ring at exact edge
//           float ring = smoothstep(0.99, 1.0, dist) - smoothstep(1.0, 1.01, dist);
//           ring *= pow(1.0 / (abs(dist - 1.0) + 0.0003), 0.9);
          
//           // Subtle pulsing
//           float pulse = 0.9 + 0.1 * sin(u_time * 3.0);
          
//           float intensity = ring * pulse;
          
//           gl_FragColor = vec4(vec3(1.0) * intensity, intensity);
//         }
//       `,
//       uniforms: {
//         u_time: { value: 0 }
//       },
//       transparent: true,
//       blending: THREE.AdditiveBlending,
//       depthWrite: false
//     });
//   }, []);

//   return (
//     <mesh ref={meshRef}>
//       <torusGeometry args={[radius, 0.012, 6, qualityConfig.segments]} />
//       <primitive ref={materialRef} object={shaderMaterial} />
//     </mesh>
//   );
// });

 // Photon sphere perfectly aligned with event horizon( CHEKLED AND OPTIMIZED)
const PhotonSphere = React.memo(({    
  radius = CONFIG.RADII.PHOTON_SPHERE,   
  quality = 'medium' 
}) => {   
  const meshRef = useRef();   
  const materialRef = useRef();   
  const qualityConfig = CONFIG.QUALITY[quality.toUpperCase()] || CONFIG.QUALITY.MEDIUM;    

  useFrame(({ clock }) => {     
    if (meshRef.current) {       
      // ====== ROTATION SPEED ======
      // Controls how fast the photon sphere rotates around Z-axis
      // 0.001 = extremely slow, 0.005 = very slow, 0.02 = medium, 0.06 = fast
      meshRef.current.rotation.z += 0.003;     
    }     
    if (materialRef.current) {       
      // ====== TIME UNIFORM ======
      // Passes time to shader for animations (pulsing, effects)
      materialRef.current.uniforms.u_time.value = clock.elapsedTime;     
    }   
  });    

  const shaderMaterial = useMemo(() => {     
    return new THREE.ShaderMaterial({       
      vertexShader: `         
        varying vec2 vUv;         
        void main() {           
          vUv = uv;           
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);         
        }       
      `,       
      fragmentShader: `         
        uniform float u_time;         
        varying vec2 vUv;                  
        void main() {           
          vec2 center = vec2(0.5, 0.5);           
          float dist = length(vUv - center) * 2.0;                      
          
          // ====== RING THICKNESS & POSITION ======
          // Controls the width and sharpness of the photon ring
          // First smoothstep: inner edge (0.90 = very thick, 0.96 = medium, 0.99 = thin)
          // Second smoothstep: outer edge (1.10 = very thick, 1.04 = medium, 1.01 = thin)
          // Smaller difference between values = sharper edges
          float ring = smoothstep(6.90, 0.92, dist) - smoothstep(1.08, 9.10, dist);           
          
          
          // ====== RING INTENSITY & FALLOFF ======
          // Controls how bright and sharp the ring appears
          // Larger offset (0.002) = softer glow, smaller (0.0001) = sharper
          // Lower power (0.4) = softer falloff, higher (1.0) = sharper falloff
          ring *= pow(9.0 / (abs(dist - 1.0) + 0.002), 0.3);                      
          
          // ====== PULSING ANIMATION ======
          // Controls the rhythmic brightness variation
          // Base brightness: 0.9 (90% minimum brightness)
          // Pulse amplitude: 0.1 (10% variation)
          // Pulse speed: 0.8 (0.5 = very slow, 1.0 = slow, 2.0 = medium, 4.0 = fast)
          float pulse = 0.9 + 0.1 * sin(u_time * 1.8);                      
          
          // ====== FINAL COLOR OUTPUT ======
          // Combines ring shape with pulsing animation
          float intensity = ring * pulse;                      
          gl_FragColor = vec4(vec3(1.0) * intensity, intensity);         
        }       
      `,       
      uniforms: {         
        u_time: { value: 0 }       
      },       
      // ====== MATERIAL BLENDING ======
      // transparent: allows see-through areas
      // AdditiveBlending: makes overlapping areas brighter (glow effect)
      // depthWrite: false prevents z-fighting issues
      transparent: true,       
      blending: THREE.AdditiveBlending,       
      depthWrite: false     
    });   
  }, []);    

  return (     
    <mesh ref={meshRef}>       
      {/* ====== TORUS GEOMETRY PARAMETERS ====== */}
      {/* [majorRadius, tubeRadius, radialSegments, tubularSegments] */}
      {/* majorRadius: inherited from 'radius' prop */}
      {/* tubeRadius: 0.05 = very thick, 0.025 = medium, 0.012 = thin */}
      {/* radialSegments: 8 = smooth circle, 6 = slightly angular, 4 = angular */}
      {/* tubularSegments: from qualityConfig (affects smoothness around the ring) */}
      <torusGeometry args={[radius, 0.06, 6, qualityConfig.segments]} />       
      <primitive ref={materialRef} object={shaderMaterial} />     
    </mesh>   
  ); 
});









// Event horizon - pure black sphere
const EventHorizon = React.memo(({ radius = CONFIG.RADII.EVENT_HORIZON }) => {
  return (
    <mesh renderOrder={100}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial 
        color="#000000"
        depthWrite={true}
        depthTest={true}
      />
    </mesh>
  );
});





// Main black hole component
const CinematicBlackHole = ({
  width = '100%',
  height = '100vh',
  quality = 'medium',
  bloomIntensity = 2.5,
  className = '',
  style = {}
}) => {
  const canvasProps = useMemo(() => ({
    camera: { 
      position: [0, 0.3, 5], 
      fov: 45,
      near: 0.1,
      far: 10
    },
    gl: { 
      antialias: quality !== 'low',
      powerPreference: "high-performance",
      alpha: true,
      precision: quality === 'high' ? 'highp' : 'mediump'
    }
  }), [quality]);

  const containerStyle = useMemo(() => ({
    width,
    height,
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    ...style
  }), [width, height, style]);

  return (
    <div className={className} style={containerStyle}>
      <Canvas
        {...canvasProps}
        style={{ background: 'transparent' }}
        dpr={quality === 'high' ? 2 : 1}
      >
        {/* Minimal ambient light */}
        <ambientLight intensity={0.005} />
        
        {/* Black hole system */}
        <group>
          {/* Event horizon (renders last to ensure it's on top) */}
          <EventHorizon radius={CONFIG.RADII.EVENT_HORIZON} />
          
          {/* Photon sphere - perfectly aligned with event horizon edge */}
          <PhotonSphere 
            radius={CONFIG.RADII.PHOTON_SPHERE}
            quality={quality}
          />
          
          {/* Accretion disk */}
          <AccretionDisk 
            innerRadius={CONFIG.RADII.DISK_INNER}
            outerRadius={CONFIG.RADII.DISK_OUTER}
            quality={quality}
          />
          
          {/* Ultra-dense particle flow */}
          <DenseParticleFlow 
            innerRadius={CONFIG.RADII.DISK_INNER}
            outerRadius={CONFIG.RADII.DISK_OUTER}
            quality={quality}
          />
        </group>
        
        {/* Post-processing */}
        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.05}
            luminanceSmoothing={0.2}
            intensity={bloomIntensity}
            radius={0.3}
            kernelSize={quality === 'high' ? 5 : 3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};





// Display name for debugging
CinematicBlackHole.displayName = 'CinematicBlackHole';
DenseParticleFlow.displayName = 'DenseParticleFlow';
AccretionDisk.displayName = 'AccretionDisk';
PhotonSphere.displayName = 'PhotonSphere';
EventHorizon.displayName = 'EventHorizon';

export default CinematicBlackHole;