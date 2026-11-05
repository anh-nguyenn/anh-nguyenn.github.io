"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { markReady, state } from "@/lib/motion";

type Key = { x: number; y: number; z: number; s: number; color: THREE.Color };

/**
 * One keyframe per page section: where the hero object sits (x as a fraction of
 * the half-viewport width), how big it is, and its colour.
 */
const KEYS: Key[] = [
  { x: 0.5, y: 0.0, z: 0, s: 1.25, color: new THREE.Color("#ff7a2e") },
  { x: 0.62, y: 0.1, z: 0, s: 0.95, color: new THREE.Color("#ff5f1f") },
  { x: 0.62, y: -0.2, z: 0, s: 0.8, color: new THREE.Color("#ffa05a") },
  { x: 0.62, y: 0.05, z: 0, s: 0.95, color: new THREE.Color("#ff6b2b") },
  { x: -0.6, y: 0.0, z: 0, s: 0.95, color: new THREE.Color("#e9dfd2") },
  { x: 0.72, y: 0.35, z: -1, s: 0.9, color: new THREE.Color("#ff7a2e") },
];
const SECTION_SPACING = 4; // camera travel between sections
const CAM_Z = 6;
const smooth = (a: number, b: number, v: number) => {
  const x = THREE.MathUtils.clamp((v - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};

const sampled = { x: 0, y: 0, z: 0, s: 1, color: new THREE.Color() };
function sample(t: number) {
  const last = KEYS.length - 1;
  const i = Math.min(Math.floor(t), last);
  const a = KEYS[i];
  const b = KEYS[Math.min(i + 1, last)];
  // Hold the pose while the section is read, then travel to the next one.
  const f = smooth(0.5, 1, t - i);
  sampled.x = THREE.MathUtils.lerp(a.x, b.x, f);
  sampled.y = THREE.MathUtils.lerp(a.y, b.y, f);
  sampled.z = THREE.MathUtils.lerp(a.z, b.z, f);
  sampled.s = THREE.MathUtils.lerp(a.s, b.s, f);
  sampled.color.copy(a.color).lerp(b.color, f);
  return sampled;
}

function HeroObject({ cur }: { cur: { t: number } }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<{ distort: number; color: THREE.Color } | null>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((frame, dt) => {
    const k = sample(cur.t);
    const g = group.current!;
    const halfW = viewport.width / 2;
    g.position.x = THREE.MathUtils.damp(g.position.x, k.x * halfW + state.px * 0.25, 4, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, k.y * 1.5 + state.py * 0.18, 4, dt);
    g.position.z = -cur.t * SECTION_SPACING + k.z;
    const s = THREE.MathUtils.damp(g.scale.x, k.s * Math.min(1, viewport.width / 9 + 0.35), 4, dt);
    g.scale.setScalar(s);

    const m = mesh.current!;
    const time = frame.clock.elapsedTime;
    m.rotation.y = time * 0.12 + cur.t * 0.9 + state.px * 0.4;
    m.rotation.x = time * 0.08 - state.py * 0.3;

    const material = mat.current;
    if (material) {
      material.color.lerp(k.color, 0.06);
      const target = 0.32 + Math.min(0.35, Math.abs(state.velocity) * 0.012);
      material.distort = THREE.MathUtils.damp(material.distort, target, 3, dt);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 40]} />
        <MeshDistortMaterial
          ref={mat as never}
          color="#ff7a2e"
          roughness={0.28}
          metalness={0.35}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
          distort={0.32}
          speed={1.4}
        />
      </mesh>
    </group>
  );
}

/** Thin rings the camera flies through between sections, plus drifting dust. */
function Tunnel() {
  const points = useMemo(() => {
    const count = 520;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 11;
      arr[i * 3 + 2] = 6 - Math.random() * 32;
    }
    return arr;
  }, []);

  return (
    <>
      {KEYS.map((_, i) => (
        <mesh key={i} position={[0, 0, -(i + 0.5) * SECTION_SPACING]} rotation={[0, 0, i * 0.6]}>
          <torusGeometry args={[3.6 + (i % 2) * 0.8, 0.012, 8, 120]} />
          <meshBasicMaterial color="#ff8a4a" transparent opacity={0.28} />
        </mesh>
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#f4ece2" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}

const PREVIEW_DEPTH = 5;
const previewMaterial = {
  vertex: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragment: /* glsl */ `
    uniform sampler2D uMap; uniform float uVel; uniform float uOpacity; uniform float uTime;
    varying vec2 vUv;
    void main(){
      vec2 uv = vUv;
      uv.x += sin(uv.y * 7.0 + uTime * 2.0) * 0.004 * abs(uVel) * 10.0;
      float shift = uVel * 0.025;
      float r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uMap, uv).g;
      float b = texture2D(uMap, uv - vec2(shift, 0.0)).b;
      gl_FragColor = vec4(vec3(r, g, b) * 0.94, uOpacity);
      #include <colorspace_fragment>
    }`,
};

/** A textured plane that follows the cursor while a project row is hovered. */
function HoverPreview() {
  const { camera, scene, size } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const textures = useRef(new Map<string, THREE.Texture>());
  const pose = useRef({ x: 0, y: 0, s: 0, aspect: 1.6 });
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uMap: { value: null as THREE.Texture | null }, uVel: { value: 0 }, uOpacity: { value: 0 }, uTime: { value: 0 } },
        vertexShader: previewMaterial.vertex,
        fragmentShader: previewMaterial.fragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );
  const uniforms = material.uniforms;

  useEffect(() => {
    scene.add(camera);
    const map = textures.current;
    return () => {
      scene.remove(camera);
      map.forEach((t) => t.dispose());
      material.dispose();
    };
  }, [camera, scene, material]);

  useFrame((frame, dt) => {
    const m = mesh.current;
    if (!m) return;
    const src = state.hoverSrc;
    const p = pose.current;

    if (src && !textures.current.has(src)) {
      // Reserve the slot immediately so we only load each image once.
      const placeholder = new THREE.Texture();
      textures.current.set(src, placeholder);
      new THREE.TextureLoader().load(src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        textures.current.set(src, tex);
        placeholder.dispose();
      });
    }
    const tex = src ? textures.current.get(src) : undefined;
    const loaded = !!tex && !!tex.image;
    if (loaded && uniforms.uMap.value !== tex) {
      uniforms.uMap.value = tex!;
      p.aspect = (tex!.image as HTMLImageElement).width / (tex!.image as HTMLImageElement).height;
    }

    p.s = THREE.MathUtils.damp(p.s, loaded ? 1 : 0, 9, dt);
    const tx = (state.cx / size.width) * 2 - 1;
    const ty = -((state.cy / size.height) * 2 - 1);
    const px = p.x;
    p.x = THREE.MathUtils.damp(p.x, tx, 7, dt);
    p.y = THREE.MathUtils.damp(p.y, ty, 7, dt);
    const vel = THREE.MathUtils.clamp((p.x - px) / Math.max(dt, 0.001) * 0.05, -1, 1);
    uniforms.uVel.value = THREE.MathUtils.damp(uniforms.uVel.value, vel, 10, dt);
    uniforms.uOpacity.value = p.s;
    uniforms.uTime.value = frame.clock.elapsedTime;

    const cam = camera as THREE.PerspectiveCamera;
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * PREVIEW_DEPTH;
    const halfW = halfH * (size.width / size.height);
    const h = halfH * 0.62;
    const w = h * p.aspect;
    m.visible = p.s > 0.01;
    m.position.set(p.x * halfW + w * 0.55, p.y * halfH, -PREVIEW_DEPTH);
    m.scale.set(w * (0.7 + 0.3 * p.s), h * (0.7 + 0.3 * p.s), 1);
  });

  return createPortal(
    <mesh ref={mesh} renderOrder={10} visible={false}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>,
    camera as unknown as THREE.Object3D,
  ) as unknown as React.ReactElement;
}

function Rig({ cur }: { cur: { t: number } }) {
  const camera = useThree((s) => s.camera);
  useFrame((_, dt) => {
    cur.t = THREE.MathUtils.damp(cur.t, state.t, 3.2, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.px * 0.35, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, state.py * 0.25, 3, dt);
    camera.position.z = CAM_Z - cur.t * SECTION_SPACING;
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -state.px * 0.02, 3, dt);
  });
  return null;
}

function World() {
  const cur = useRef({ t: 0 }).current;
  return (
    <>
      <Rig cur={cur} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} color="#ffe6cf" />
      <pointLight position={[-5, -2, 3]} intensity={40} color="#6f8cff" />
      <HeroObject cur={cur} />
      <Tunnel />
      <HoverPreview />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, CAM_Z], fov: 40, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        // Wait one frame so the first paint already contains the scene.
        requestAnimationFrame(() => requestAnimationFrame(markReady));
      }}
    >
      <World />
    </Canvas>
  );
}
