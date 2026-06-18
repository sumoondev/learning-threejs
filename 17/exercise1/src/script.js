import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import testVertexShader from './shaders/test/vertex.glsl';
import testFragmentShader from './shaders/test/fragment.glsl';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

/**
 * Plane
 */
// Geometry
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);

console.log(planeGeometry.attributes)

// Material
const planeMaterail = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide
});

// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterail);

scene.add(plane);

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const timer = new THREE.Timer();

const tick = () => {
    timer.update();
    const elaspedTime = timer.getElapsed();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();