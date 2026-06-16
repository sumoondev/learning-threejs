import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import testVertexShader from './shaders/test/vertex.glsl';
import testFragmentShader from './shaders/test/fragment.glsl';
import { texture3D } from 'three/src/nodes/accessors/Texture3DNode.js';

// Debug
const gui = new GUI();
gui.close();

// Texture
const textureLoader = new THREE.TextureLoader();
const flag = textureLoader.load('/Flag of Nepal.png')

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
})

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

/**
 * Plane
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uFrequency: {value: new THREE.Vector2(10.0, 5.0)},
        uTime: {value: 0.0},
        uTexture: {value: flag}
    },
    side: THREE.DoubleSide,
    transparent: true
});

// Plane
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0.2

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 1.5;
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

    material.uniforms.uTime.value = elaspedTime;

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();