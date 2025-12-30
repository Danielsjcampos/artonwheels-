"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { StoreSettings } from "@/types";

export const HorizonFooter = ({ settings }: { settings?: StoreSettings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    /** SCENE */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);
    sceneRef.current = scene;

    /** CAMERA */
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / 400, 1, 2000);
    camera.position.z = 200;
    camera.position.y = 20;
    cameraRef.current = camera;

    /** RENDERER */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    /** STAR FIELD */
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = Math.random() * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    starsRef.current.push(stars);

    /** ANIMATION LOOP */
    const animate = () => {
      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0002;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    /** GSAP subtle camera motion */
    gsap.to(camera.position, {
      y: 25,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    /** RESIZE */
    const onResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current!);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <footer className="relative w-full h-[400px] bg-black overflow-hidden border-t border-white/5">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {settings?.logo && (
          <img src={settings.logo} alt={settings.name} className="h-12 w-auto mb-6 opacity-80" />
        )}
        <h2 className="text-3xl md:text-4xl font-outfit font-bold tracking-widest uppercase">
          {settings?.name || "ARTON WHEELS GARAGE"}
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/70 max-w-xl font-light">
          A essência da performance e estética automotiva de luxo. 
          Conectando entusiastas à excelência técnica.
        </p>

        <span className="mt-8 text-[10px] tracking-[0.4em] text-white/30 font-bold uppercase">
          © {new Date().getFullYear()} — {settings?.name || "ARTON WHEELS GARAGE"}
        </span>
      </div>
    </footer>
  );
};
