import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { parameter } from 'three/src/nodes/core/ParameterNode.js';
import { mix } from 'three/src/nodes/math/MathNode.js';

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

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 10000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = '#ff6030';
parameters.outsideColor = '#1b3984';

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
    if(points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)
    
    for(let i = 0; i < parameters.count; i++) {
        
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.sin(branchAngle + spinAngle) * radius + randomX;
        positions[i3+1] = randomY;
        positions[i3+2] = Math.cos(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position',new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',new THREE.BufferAttribute(colors, 3));
    
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    points = new THREE.Points(geometry, material);

    scene.add(points);
}

generateGalaxy();

// Galaxy Tweaks
const galaxyTweak = gui.addFolder('Galaxy');

galaxyTweak.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'size').min(0.001).max(1).step(0.001).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'randomness').min(0).max(2).step(0.01).onFinishChange(generateGalaxy)

galaxyTweak.add(parameters, 'randomnessPower').min(1).max(10).step(0.01).onFinishChange(generateGalaxy)

galaxyTweak.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)

galaxyTweak.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

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

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();