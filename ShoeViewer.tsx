import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeProps {
  url: string;
  color?: string;
  [key: string]: any;
}

function Shoe({ url, color, ...props }: ShoeProps) {
  const { nodes, materials } = useGLTF(url) as any;
  
  // Apply rotation or other effects if needed
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t / 4) / 8;
      group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.shoe} material-color={color} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.swoosh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole_1} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.white} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.threads} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.laces} />
    </group>
  );
}

export const ShoeViewer: React.FC<{ url: string; color?: string }> = ({ url, color }) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-neutral-50 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 1, tension: 170, friction: 26 }}
            snap={{ mass: 4, tension: 190, friction: 56 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <Shoe url={url} color={color} />
            </Stage>
          </PresentationControls>
          <ContactShadows position={[0, -0.8, 0]} opacity={0.4} scale={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

// Pre-load the common model
useGLTF.preload('https://raw.githubusercontent.com/pmndrs/drei-assets/master/shoe.glb');
