'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { CountryData } from '@/types/covid';

interface GlobeProps {
  countries: CountryData[];
  onCountryClick: (country: CountryData) => void;
  selectedCountry: CountryData | null;
}

function CountryMarkers({ countries, onCountryClick, selectedCountry }: GlobeProps) {
  const markersRef = useRef<THREE.Group>(null);

  const markers = useMemo(() => {
    return countries.map((country) => {
      const phi = (90 - country.lat) * (Math.PI / 180);
      const theta = (country.lng + 180) * (Math.PI / 180);
      const radius = 2.02;

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const severity = (country.totalCases / country.population) * 100;
      const size = Math.max(0.02, Math.min(0.1, severity / 5));
      const color = severity > 10 ? '#ef4444' : severity > 5 ? '#f59e0b' : '#3b82f6';

      return {
        position: [x, y, z] as [number, number, number],
        color,
        size,
        country
      };
    });
  }, [countries]);

  useFrame(() => {
    if (markersRef.current) {
      markersRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={markersRef}>
      {markers.map((marker, index) => (
        <mesh
          key={index}
          position={marker.position}
          onClick={() => onCountryClick(marker.country)}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[marker.size, 16, 16]} />
          <meshStandardMaterial
            color={marker.color}
            emissive={marker.color}
            emissiveIntensity={selectedCountry?.country === marker.country.country ? 1.5 : 0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlobeModel() {
  const globeRef = useRef<THREE.Mesh>(null);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={globeRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#1e293b"
        roughness={0.7}
        metalness={0.2}
        transparent
        opacity={0.95}
      />
    </Sphere>
  );
}

function Scene({ countries, onCountryClick, selectedCountry }: GlobeProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <GlobeModel />
      <CountryMarkers
        countries={countries}
        onCountryClick={onCountryClick}
        selectedCountry={selectedCountry}
      />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
}

export default function Globe({ countries, onCountryClick, selectedCountry }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Scene
          countries={countries}
          onCountryClick={onCountryClick}
          selectedCountry={selectedCountry}
        />
      </Canvas>
    </div>
  );
}
