/**
 * Minimal Three.js GLB viewer — no framework, static site.
 * Fills viewport, OrbitControls, basic lighting.
 * GLB path: /bag.glb (place bag.glb in project root for Vercel).
 */

import * as THREE from "https://esm.sh/three@0.169.0";
import { OrbitControls } from "https://esm.sh/three@0.169.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";

const GLB_PATH = "/bag.glb";

const canvas = document.getElementById("canvas");
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.minDistance = 0.5;
controls.maxDistance = 50;

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);
const fill = new THREE.DirectionalLight(0x8899ff, 0.3);
fill.position.set(-5, 0, -5);
scene.add(fill);

let model = null;
const loader = new GLTFLoader();
loader.load(
  GLB_PATH,
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 1.5;
    camera.position.set(dist, dist * 0.8, dist);
    camera.lookAt(0, 0, 0);
    controls.update();
  },
  undefined,
  (err) => console.error("GLB load error:", err)
);

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", resize);
animate();
