"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, Float, Stars, DragControls } from "@react-three/drei";
import { useEffect, Suspense, useState, useRef, useMemo } from "react";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

function DancingModel({ modelPath, position, scale = 1.5, rotation = [0, 0, 0] }: ModelProps) {
  // Load the GLB file from the public folder
  const { scene, animations } = useGLTF(modelPath);
  
  // Extract animations
  const { actions } = useAnimations(animations, scene);
  
  // Normalize the base size of all models so they are uniform
  const baseScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    // Target a uniform base max dimension of roughly 2 units
    return maxDim > 0 ? 2 / maxDim : 1;
  }, [scene]);

  const isDragging = useRef(false);
  const velocity = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 3
  ));
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Play the first animation found in the file
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0 && actions[actionNames[0]]) {
      actions[actionNames[0]]?.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (isDragging.current || !groupRef.current) return;
    
    // Add a slight random drift to simulate natural floating and swimming
    velocity.current.x += (Math.random() - 0.5) * 0.2;
    velocity.current.y += (Math.random() - 0.5) * 0.2;
    velocity.current.z += (Math.random() - 0.5) * 0.2;
    velocity.current.clampLength(1, 3); // keep speed between 1 and 3 units/sec

    // Move the group based on velocity
    groupRef.current.position.addScaledVector(velocity.current, delta);

    // Screen bounds for bouncing (approximate based on camera fov=50 and z=10)
    const bounds = { x: 12, y: 7, z: 6 };
    if (groupRef.current.position.x > bounds.x) { groupRef.current.position.x = bounds.x; velocity.current.x *= -1; }
    if (groupRef.current.position.x < -bounds.x) { groupRef.current.position.x = -bounds.x; velocity.current.x *= -1; }
    
    if (groupRef.current.position.y > bounds.y) { groupRef.current.position.y = bounds.y; velocity.current.y *= -1; }
    if (groupRef.current.position.y < -bounds.y) { groupRef.current.position.y = -bounds.y; velocity.current.y *= -1; }
    
    if (groupRef.current.position.z > bounds.z) { groupRef.current.position.z = bounds.z; velocity.current.z *= -1; }
    if (groupRef.current.position.z < -bounds.z) { groupRef.current.position.z = -bounds.z; velocity.current.z *= -1; }
  });

  return (
    <DragControls 
      onDragStart={() => isDragging.current = true}
      onDragEnd={() => isDragging.current = false}
    >
      {/* Position the drag container */}
      <group position={position} ref={groupRef}>
        <Float 
          speed={2} // Animation speed
          rotationIntensity={1} // XYZ rotation intensity
          floatIntensity={2} // Up/down float intensity
          floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within
        >
          {/* Inner group for default rotation */}
          <group rotation={rotation}>
            <primitive object={scene} scale={scale * baseScale} />
          </group>
        </Float>
      </group>
    </DragControls>
  );
}

const MODELS_DATA: ModelProps[] = [
  { modelPath: "/models/mambo.glb", position: [0, -2, 0] },
  { modelPath: "/models/doto.glb", position: [-3, -1.5, -2] },
  { modelPath: "/models/golshin.glb", position: [3, -1.5, -2] },
  { modelPath: "/models/oguri.glb", position: [-2, -2, 2] },
  { modelPath: "/models/tachyon.glb", position: [2, -2, 2] },
  { modelPath: "/models/tamano.glb", position: [0, -1, -4] },
];

export default function Background3D() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [chibiScale, setChibiScale] = useState(1.5);

  return (
    <>
      {/* UI Controls - placed outside the background so it can be clicked above other content */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-4">
        <button
          onClick={() => setShowEasterEgg(!showEasterEgg)}
          className={`w-14 h-7 rounded-full flex items-center transition-colors p-1 shadow-lg border border-slate-700 ${
            showEasterEgg ? "bg-blue-500" : "bg-slate-800"
          }`}
          title="Toggle Easter Egg"
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
              showEasterEgg ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>

        {/* Size Slider */}
        {showEasterEgg && (
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center gap-2 transition-all">
            <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Size</label>
            <input 
              type="range" 
              min="0.5" 
              max="4" 
              step="0.1" 
              value={chibiScale}
              onChange={(e) => setChibiScale(parseFloat(e.target.value))}
              className="w-24 accent-blue-500 cursor-pointer"
            />
          </div>
        )}
      </div>

      {showEasterEgg && (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-auto transition-all duration-500 animate-in fade-in">
          <Canvas camera={{ position: [0, 1, 10], fov: 50 }}>
            {/* Outer Space Background Stars */}
            <Stars 
              radius={100} 
              depth={50} 
              count={5000} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1} 
            />

            {/* Basic Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            {/* Environment lighting for better reflections/materials */}
            <Environment preset="city" />
            
            {/* Suspense is needed while the model loads asynchronously */}
            <Suspense fallback={null}>
              {MODELS_DATA.map((data, index) => (
                <DancingModel 
                  key={index} 
                  modelPath={data.modelPath} 
                  position={data.position} 
                  scale={chibiScale}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
}

// Preload all models so they load faster
MODELS_DATA.forEach((data) => {
  useGLTF.preload(data.modelPath);
});
