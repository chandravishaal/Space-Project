
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Lightweight Gargantua Black Hole - Optimized & Working
export default function Hero({
  width = '100%',
  height = '100vh',
  clockwise = true,
  rotationSpeed = 30.0,
  innerRadius = 0.15,
  outerRadius = 0.8,
  bloomIntensity = 0.6
}) {
  return (
    <div style={{ width, height, position: 'relative', pointerEvents: 'none' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.2, 2.5], fov: 45 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <BlackHoleSystem
          clockwise={clockwise}
          rotationSpeed={rotationSpeed}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.3}
            intensity={bloomIntensity}
            kernelSize={2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function BlackHoleSystem({ clockwise, rotationSpeed, innerRadius, outerRadius }) {
  return (
    <group rotation={[-0.3, 0, 0]}> {/* Tilt for side view */}
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[innerRadius, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Main Accretion Disk */}
      <AccretionDisk
        clockwise={clockwise}
        rotationSpeed={rotationSpeed}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        layer={0}
      />

      {/* Second layer for depth */}
      <AccretionDisk
        clockwise={clockwise}
        rotationSpeed={rotationSpeed * 0.8}
        innerRadius={innerRadius * 1.1}
        outerRadius={outerRadius * 0.9}
        layer={1}
      />

      {/* Photon Ring */}
      <mesh>
        <ringGeometry args={[innerRadius * 1.8, innerRadius * 1.9, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function AccretionDisk({ clockwise, rotationSpeed, innerRadius, outerRadius, layer = 0 }) {
  const diskRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.elapsedTime;
      materialRef.current.uniforms.u_rotationSpeed.value = clockwise ? -1 / rotationSpeed : 1 / rotationSpeed;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform float u_rotationSpeed;
    uniform float u_innerRadius;
    uniform float u_outerRadius;
    uniform float u_layer;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    vec3 heatColor(float t) {
      t = clamp(t, 0.0, 1.0);
      if (t < 0.5) {
        return mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.8, 0.0), t * 2.0);
      } else {
        return mix(vec3(1.0, 0.8, 0.0), vec3(0.8, 0.9, 1.0), (t - 0.5) * 2.0);
      }
    }
    
    void main() {
      vec2 center = vec2(0.5);
      vec2 uv = vUv - center;
      float dist = length(uv);
      
      // Disk boundaries
      float innerEdge = 0.15;
      float outerEdge = 0.45;
      
      // Ring mask
      float ringMask = smoothstep(innerEdge - 0.01, innerEdge, dist) * 
                       (1.0 - smoothstep(outerEdge, outerEdge + 0.02, dist));
      
      if (ringMask < 0.01) discard;
      
      // Rotation
      float angle = atan(uv.y, uv.x);
      float rotatedAngle = angle + u_rotationSpeed * u_time * 6.28;
      
      // Doppler effect - one side brighter
      float doppler = 0.3 + 0.7 * (sin(rotatedAngle) * 0.5 + 0.5);
      
      // Radial intensity falloff
      float radialIntensity = 1.0 - smoothstep(innerEdge, outerEdge, dist);
      radialIntensity = pow(radialIntensity, 1.5);
      
      // Turbulence
      float turbulence = sin(dist * 40.0 + u_time * 3.0) * 0.1 + 
                        sin(rotatedAngle * 8.0 + u_time * 2.0) * 0.05;
      
      // Final intensity
      float intensity = (radialIntensity * doppler + turbulence) * ringMask;
      
      // Color based on intensity and position
      float temp = intensity * (1.0 + doppler * 0.5);
      vec3 color = heatColor(temp);
      
      // Layer offset for depth
      intensity *= (1.0 - u_layer * 0.3);
      
      gl_FragColor = vec4(color * intensity, intensity * 0.8);
    }
  `;

  return (
    <mesh ref={diskRef} position={[0, layer * 0.02, 0]}>
      <ringGeometry args={[innerRadius * 1.2, outerRadius, 128, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          u_time: { value: 0 },
          u_rotationSpeed: { value: clockwise ? -1 / rotationSpeed : 1 / rotationSpeed },
          u_innerRadius: { value: innerRadius },
          u_outerRadius: { value: outerRadius },
          u_layer: { value: layer }
        }}
      />
    </mesh>
  );
}