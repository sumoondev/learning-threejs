import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';
import { uniform } from 'three/src/nodes/core/UniformNode.js';

// GUI
const gui = new GUI();
const debugObject = {};
// debugObject.heightColor = new THREE.Color('#08088a');
// debugObject.depthColor = new THREE.Color('#5975db');

// Canvas
const canvas = document.querySelector('canvas.webgl')

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
 * Water
 */
// geometry
const geometry = new THREE.PlaneGeometry(8, 8, 2048, 2048);

// material
const material = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
        uAmplitude: { value: 0.2 },
        uFrequency: { value: new THREE.Vector2(2.7, 3.7) },
        uTime: { value: 0.0 },
        uHeightColor: { value: new THREE.Vector3(0.1, 0.2, 0.68) },
        uDepthColor: { value: new THREE.Vector3(0.35, 0.46, 0.86) }
    }
});

gui.add(material.uniforms.uAmplitude, 'value').min(0).max(1).step(0.001).name('Amplitude');
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(5).step(0.001).name('FrequencyX');
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(5).step(0.001).name('FrequencyY');

// mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = - Math.PI * 0.5;
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
camera.position.y = 2;
camera.position.x = 2;
scene.add(camera);

// Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
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