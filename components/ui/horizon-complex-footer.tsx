'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { StoreSettings } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export const HorizonComplexFooter = ({ settings }: { settings?: StoreSettings }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX: number;
    targetCameraY: number;
    targetCameraZ: number;
    locations: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
    locations: []
  });

  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / (window.innerHeight * 0.8), // Adjusted for footer height
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight * 0.8),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      animate();
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0xe11d48) }, // Performance Red
          color2: { value: new THREE.Color(0x000000) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      const layers = [
        { distance: -50, height: 60, color: 0x0a0a0a, opacity: 1 },
        { distance: -100, height: 80, color: 0x111111, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x1a1a1a, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x222222, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.9, 0.1, 0.3) * intensity; // Performance Red tint
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene!.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach(starField => {
        if (starField.material instanceof THREE.ShaderMaterial) {
          starField.material.uniforms.time.value = time;
        }
      });

      if (refs.nebula && refs.nebula.material instanceof THREE.ShaderMaterial) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      if (refs.camera) {
        const smoothingFactor = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
        
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
        refs.composer.setSize(window.innerWidth, window.innerHeight * 0.8);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.mountains.forEach((mountain, i) => {
      locations[i] = mountain.position.z;
    });
    refs.locations = locations;
  };

  useEffect(() => {
    if (!isReady) return;
    
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
      visibility: 'visible',
      opacity: 0,
    });

    const tl = gsap.timeline();

    if (menuRef.current) tl.to(menuRef.current, { x: 0, opacity: 1, duration: 1, ease: "power3.out" });

    if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, duration: 1.5, ease: "power4.out" }, "-=0.5");
    }

    if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    }

    if (scrollProgressRef.current) tl.to(scrollProgressRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

    return () => { tl.kill(); };
  }, [isReady]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we have scrolled through THIS container
      // progress is 0 when the top of the container is at the bottom of the viewport
      // progress is 1 when the bottom of the container is at the bottom of the viewport
      const totalDist = container.offsetHeight - windowHeight;
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      
      setScrollProgress(progress);
      
      // Calculate current stage (0: ARTON, 1: ULTIMATE, 2: INFINITY)
      // We have 3 stages, so divide progress accordingly
      const newSection = Math.min(Math.floor(progress * 3), 2);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      
      // Smooth movement across 3 camera steps
      const totalStages = 3;
      const stageProgress = (progress * (totalStages - 1)) % 1;
      
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },   // ARTON
        { x: 0, y: 40, z: -100 },  // ULTIMATE
        { x: 0, y: 55, z: -800 }   // INFINITY
      ];
      
      const currentIdx = Math.min(Math.floor(progress * (totalStages - 1)), totalStages - 2);
      const nextIdx = currentIdx + 1;
      
      const currentPos = cameraPositions[currentIdx];
      const nextPos = cameraPositions[nextIdx];
      
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * stageProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * stageProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * stageProgress;

      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const scrollOffset = currentScroll > 0 ? currentScroll : 0;
        const targetZ = mountain.userData.baseZ + scrollOffset * speed * 0.1;
        
        if (refs.nebula) refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        
        // Hide mountains when moving deep into focus (infinity stage)
        if (progress > 0.9) {
          mountain.position.z = 600000;
        } else {
          mountain.position.z = refs.locations[i];
        }
      });
      if (refs.nebula && refs.mountains[3]) refs.nebula.position.z = refs.mountains[3].position.z;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  return (
    <footer ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden border-t border-white/5">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Side menu mockup */}
        <div ref={menuRef} className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none">
          <div className="flex flex-col gap-1.5 opacity-50">
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </div>
          <div className="[writing-mode:vertical-lr] text-[10px] tracking-[0.5em] font-bold text-white/30 uppercase">
            PERFORMANCE HUB
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="mb-4">
            <img src={settings?.logo} alt={settings?.name} className="h-12 w-auto mx-auto opacity-80" />
          </div>
          
          <h2 ref={titleRef} className="text-6xl md:text-9xl font-outfit font-extrabold tracking-tighter text-white mb-6 uppercase">
            {currentSection === 0 ? 'ART ON' : currentSection === 1 ? 'WHEELS' : 'MOTOS'}
          </h2>
          
          <div ref={subtitleRef} className="max-w-2xl space-y-4">
            <p className="text-xl md:text-2xl text-red-500 font-bold uppercase tracking-widest">
              {currentSection === 0 
                ? 'Alta Performance Automóvel' 
                : currentSection === 1 
                ? 'Detalhe Técnico & Proteção'
                : 'A Sua Jornada Começa Aqui'}
            </p>
            
            {currentSection < 2 ? (
              <p className="text-gray-400 font-light text-lg">
                {currentSection === 0 
                    ? 'Especialistas em jantes exclusivas, suspensões e upgrades de performance para máquinas de elite.' 
                    : 'Transformamos veículos em obras de arte através de detalhamento técnico e proteção de luxo.'}
              </p>
            ) : (
              <div className="mt-8 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] w-full max-w-md mx-auto shadow-2xl">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="text" 
                      placeholder="NOME" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-red-600 transition-colors uppercase"
                    />
                    <input 
                      type="email" 
                      placeholder="EMAIL" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-red-600 transition-colors uppercase"
                    />
                    <input 
                      type="tel" 
                      placeholder="TELEFONE" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-red-600 transition-colors uppercase"
                    />
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-xs tracking-[0.3em] transition-all uppercase shadow-lg shadow-red-600/20">
                    Solicitar Consultoria
                  </button>
                </form>
              </div>
            )}
          </div>

          {currentSection < 2 && (
            <div className="mt-12 flex items-center gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-outfit font-bold">EXC</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Performance</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-outfit font-bold">LUXO</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Estética</span>
                </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-12 left-0 right-0 px-12 flex justify-between items-end z-20">
          <div className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} ART ON WHEELS
          </div>
          
          {/* Scroll indicator */}
          <div ref={scrollProgressRef} className="flex flex-col items-center gap-4 opacity-50">
            <div className="text-[10px] tracking-[0.4em] font-bold uppercase">EXPERIÊNCIA IMERSIVA</div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-300" 
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="text-[10px] font-mono">
              {String(currentSection + 1).padStart(2, '0')} / 03
            </div>
          </div>

          <div className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase">
            PORTUGAL | ELITE SERVICE
          </div>
        </div>
      </div>
    </footer>
  );
};
