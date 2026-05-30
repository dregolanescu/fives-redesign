import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// orthographic camera (Spline export default)
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2, window.innerWidth / 2,
  window.innerHeight / 2, window.innerHeight / -2,
  -50000, 10000
);
camera.position.set(0, 0, 1000); // non-zero distance so OrbitControls can actually rotate (ortho scale is unaffected)
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

const scene = new THREE.Scene();
scene.background = null; // transparent — let the page box show through

let loadedObject = null;

const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/1myZzGcn3MzUAiXr/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
    loadedObject = splineScene;
    fitView();
  }
);

// renderer — alpha:true for a transparent background
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearAlpha(0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// orbit controls — rotate only (no zoom/pan, so it never hijacks page scroll)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3.0;

// auto-fit the coin to the container regardless of its size or the viewport
function fitView() {
  if (!loadedObject) return;
  const box = new THREE.Box3().setFromObject(loadedObject);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y) || 1;
  const viewMin = Math.min(window.innerWidth, window.innerHeight);
  camera.zoom = (viewMin * 0.72) / maxDim;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  fitView();
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
