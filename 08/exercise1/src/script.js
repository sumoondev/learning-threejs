import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// GUI
const gui = new GUI({
    closeFolders: true
});
gui.close();

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Particle
const particleTexture = textureLoader.load('/textures/particles/2.png');

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random();
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

// Materials
const particlesMaterial = new THREE.PointsMaterial({
    // color: '#ff88cc',
    size: 0.1,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particleTexture,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(2,2,4);
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

const timer = new THREE.Timer();

const tick = () => {
    timer.update();
    const elaspedTime = timer.getElapsed();

    // Update particles
    // particles.position.y = - elaspedTime * 0.2

    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3+1] = Math.sin(elaspedTime + x)
    }

    particlesGeometry.attributes.position.needsUpdate = true

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();