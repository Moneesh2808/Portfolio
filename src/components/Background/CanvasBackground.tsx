import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CanvasBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Spiral Galaxy Core
    const galaxyGroup = new THREE.Group();
    const galaxyParticleCount = 2000;
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyParticleCount * 3);
    const galaxyColors = new Float32Array(galaxyParticleCount * 3);

    const colorInside = new THREE.Color('#38bdf8');
    const colorOutside = new THREE.Color('#1e1b4b');
    const colorAccent = new THREE.Color('#818cf8');

    for (let i = 0; i < galaxyParticleCount; i++) {
      // Spiral arms
      const radius = Math.random() * 28 + 1;
      const spinAngle = radius * 0.8;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;

      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5) * radius;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5) * radius;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5) * radius;

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      galaxyPositions[i * 3] = x;
      galaxyPositions[i * 3 + 1] = y;
      galaxyPositions[i * 3 + 2] = z;

      // Color mix based on distance
      const mixedColor = colorInside.clone();
      if (Math.random() > 0.3) {
        mixedColor.lerp(colorOutside, radius / 30);
      } else {
        mixedColor.lerp(colorAccent, Math.random());
      }

      galaxyColors[i * 3] = mixedColor.r;
      galaxyColors[i * 3 + 1] = mixedColor.g;
      galaxyColors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyGroup.add(galaxy);
    galaxyGroup.rotation.x = 0.5;
    scene.add(galaxyGroup);

    // 3. 3D Deep Space Starfield
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.1,
      transparent: true,
      opacity: 0.7,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 4. Orbiting Glowing Cosmic Orbs
    const orbGroup = new THREE.Group();
    const orbCount = 6;
    const orbs: THREE.Mesh[] = [];

    const orbColors = [0x38bdf8, 0x60a5fa, 0x818cf8, 0x3b82f6, 0x0284c7, 0xa855f7];

    for (let i = 0; i < orbCount; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 0.35 + 0.2, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: orbColors[i],
        wireframe: true,
      });
      const orb = new THREE.Mesh(geo, mat);
      
      const angle = (i / orbCount) * Math.PI * 2;
      const dist = Math.random() * 12 + 8;
      orb.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 4, Math.sin(angle) * dist);
      
      orbGroup.add(orb);
      orbs.push(orb);
    }
    scene.add(orbGroup);

    // 5. Dynamic 3D Comet Streaks
    const cometCount = 3;
    const comets: { mesh: THREE.Line; speed: number; reset: () => void }[] = [];

    for (let i = 0; i < cometCount; i++) {
      const cGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-2.5, -1.2, -1.5),
      ]);
      const cMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
      });
      const cMesh = new THREE.Line(cGeo, cMat);

      const resetComet = () => {
        cMesh.position.set(
          (Math.random() - 0.5) * 40 + 20,
          (Math.random() - 0.5) * 30 + 15,
          (Math.random() - 0.5) * 30
        );
      };
      resetComet();

      scene.add(cMesh);
      comets.push({ mesh: cMesh, speed: Math.random() * 0.4 + 0.3, reset: resetComet });
    }

    // 6. Interactive Mouse Depth Movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Rotate Galaxy Core
      galaxyGroup.rotation.z = elapsedTime * 0.04;
      galaxyGroup.rotation.y = elapsedTime * 0.02;

      // Pulse and rotate stars
      stars.rotation.y = -elapsedTime * 0.008;

      // Orbit Orbs
      orbGroup.rotation.y = elapsedTime * 0.15;
      orbs.forEach((orb, idx) => {
        orb.rotation.x += 0.02;
        orb.position.y += Math.sin(elapsedTime * 2 + idx) * 0.005;
      });

      // Animate Comets
      comets.forEach((c) => {
        c.mesh.position.x -= c.speed;
        c.mesh.position.y -= c.speed * 0.5;
        if (c.mesh.position.x < -30 || c.mesh.position.y < -20) {
          c.reset();
        }
      });

      // Camera Parallax smoothly reacting to cursor
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
