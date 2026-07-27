import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  Code2,
  Zap,
  Activity,
} from 'lucide-react';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiFastapi, SiScikitlearn, SiDjango, SiNumpy } from 'react-icons/si';

// Mini animated bar chart component
const MiniBarChart: React.FC = () => {
  const bars = [40, 65, 50, 78, 60, 85, 70];
  return (
    <div className="flex items-end gap-0.5 h-8 mt-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-gradient-to-t from-[#2563EB] to-[#38BDF8]"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{
            delay: i * 0.1,
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1.5,
            ease: 'easeInOut',
          }}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  );
};

// Mini animated sparkline component
const MiniSparkline: React.FC = () => {
  const points = [20, 45, 28, 60, 42, 70, 55, 80, 65, 88];
  const max = Math.max(...points);
  const w = 80;
  const h = 28;
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} className="mt-1">
      <motion.path
        d={pathD}
        fill="none"
        stroke="#38BDF8"
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />
      {/* Glow dot at end */}
      <circle
        cx={(9 / 9) * w}
        cy={h - (points[points.length - 1] / max) * h}
        r={2.5}
        fill="#38BDF8"
        style={{ filter: 'drop-shadow(0 0 4px #38BDF8)' }}
      />
    </svg>
  );
};

// Circular progress ring
const CircleProgress: React.FC<{ pct: number; label: string }> = ({ pct, label }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#1e3a5f" strokeWidth="4" />
        <motion.circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, repeatType: 'reverse' }}
          style={{ filter: 'drop-shadow(0 0 4px #38BDF8)' }}
        />
      </svg>
      <span className="text-[10px] font-extrabold text-[#38BDF8] -mt-1">{pct}%</span>
      <span className="text-[8px] text-slate-400">{label}</span>
    </div>
  );
};

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 5, 30);
    pointLight1.position.set(4, 4, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2563eb, 4, 30);
    pointLight2.position.set(-4, -4, 4);
    scene.add(pointLight2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const brainGroup = new THREE.Group();

    // Core Icosahedron — holographic AI brain
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x1e40af,
      emissiveIntensity: 1,
      roughness: 0.1,
      metalness: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    brainGroup.add(coreMesh);

    // Inner softer sphere
    const innerGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    brainGroup.add(innerMesh);

    // Orbital rings
    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(2.1 + i * 0.4, 0.018, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0x818cf8,
        transparent: true,
        opacity: 0.75,
      });
      const rm = new THREE.Mesh(ringGeo, ringMat);
      rm.rotation.x = Math.PI / 2 + i * 0.45;
      rm.rotation.y = i * 0.3;
      brainGroup.add(rm);
      ringMeshes.push(rm);
    }

    // Floating particles
    const pCount = 160;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.07, transparent: true, opacity: 0.9 });
    const particles = new THREE.Points(pGeo, pMat);
    brainGroup.add(particles);

    mainGroup.add(brainGroup);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      coreMesh.rotation.y = t * 0.28;
      coreMesh.rotation.x = Math.sin(t * 0.4) * 0.18;
      innerMesh.rotation.y = -t * 0.38;
      innerMesh.rotation.z = t * 0.2;

      ringMeshes.forEach((rm, idx) => {
        rm.rotation.z = t * (0.18 + idx * 0.08);
        rm.rotation.x = Math.PI / 2 + Math.sin(t * 0.45 + idx) * 0.28;
      });

      particles.rotation.y = t * 0.09;
      particles.rotation.x = t * 0.04;

      mainGroup.position.y = Math.sin(t * 1.4) * 0.1;
      mainGroup.rotation.y += (mouseX * 0.35 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-mouseY * 0.25 - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nW = container.clientWidth || 600;
      const nH = container.clientHeight || 500;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      pGeo.dispose(); pMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[460px] sm:h-[520px] md:h-[580px] relative flex items-center justify-center overflow-hidden">

      {/* 3D Brain Canvas */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 z-0" />

      {/* ── Dashboard Glass Cards Overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-10 p-3 sm:p-4 flex flex-col justify-between">

        {/* ── TOP ROW ─────────────────────────────────────── */}
        <div className="flex justify-between items-start w-full gap-2">

          {/* Card 1: ML Model Accuracy */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="p-3 rounded-2xl glass-panel border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl flex flex-col gap-1 min-w-[120px]"
          >
            <div className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#38BDF8]" />
              ML Accuracy
            </div>
            <div className="flex items-center gap-2">
              <CircleProgress pct={98} label="F1" />
              <div className="text-[9px] text-slate-400 leading-tight">
                Scikit-Learn<br />
                <span className="text-emerald-400 font-semibold">↑ 98.7% Acc</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Data Analytics */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="p-3 rounded-2xl glass-panel border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl min-w-[110px]"
          >
            <div className="text-[10px] font-bold text-slate-300 flex items-center gap-1 mb-0.5">
              <BarChart3 className="w-3 h-3 text-[#38BDF8]" />
              Data Analytics
            </div>
            <MiniBarChart />
            <div className="text-[9px] text-slate-400 mt-1">↑ 78% Insights</div>
          </motion.div>

        </div>

        {/* ── MIDDLE ROW ──────────────────────────────────── */}
        <div className="flex justify-between items-center w-full gap-2">

          {/* Card 3: AI Performance */}
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
            className="p-3 rounded-2xl glass-panel border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl min-w-[110px]"
          >
            <div className="text-[10px] font-bold text-slate-300 flex items-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-[#38BDF8]" />
              AI Performance
            </div>
            <MiniSparkline />
            <div className="text-[9px] text-slate-400 mt-0.5">Live Inference</div>
          </motion.div>

          {/* Card 4: Problem Solving */}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            className="p-3 rounded-2xl glass-panel border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl min-w-[110px]"
          >
            <div className="text-[10px] font-bold text-slate-300 flex items-center gap-1 mb-1">
              <Code2 className="w-3 h-3 text-[#38BDF8]" />
              Problem Solving
            </div>
            <div className="flex gap-1 items-end">
              <CircleProgress pct={92} label="Eff" />
              <div className="text-[9px] text-slate-400 leading-tight ml-1">
                Clean Code<br />
                <span className="text-[#38BDF8] font-semibold">Optimized</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── BOTTOM ROW ──────────────────────────────────── */}
        <div className="flex justify-end items-end w-full">

          {/* Card: Tech Stack */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
            className="p-3 rounded-2xl glass-panel border border-[#38BDF8]/40 shadow-[0_0_25px_rgba(56,189,248,0.3)] backdrop-blur-xl"
          >
            <div className="text-[10px] font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#38BDF8]" />
              Core Tech Stack
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { Icon: FaPython, label: 'Python' },
                { Icon: SiFastapi, label: 'FastAPI' },
                { Icon: SiScikitlearn, label: 'Sklearn' },
                { Icon: FaReact, label: 'React' },
                { Icon: SiNumpy, label: 'NumPy' },
                { Icon: SiDjango, label: 'Django' },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  title={label}
                  className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-[#38BDF8] hover:border-[#38BDF8]/60 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
