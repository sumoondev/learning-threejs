import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { debug } from 'three/src/nodes/utils/DebugNode.js';
import gsap from 'gsap';
import { defaultBuildStages } from 'three/src/nodes/Nodes.js';

// Debug
const gui = new GUI({
    width: 300,
    title: 'Debug UI',
    closeFolders: true
});

// gui.close();

// gui.hide();

window.addEventListener('keydown', (event) => {
    if(event.key == 'h') {
        gui.show(gui._hidden)
    }
})

const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

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
});

// Full-screen
// window.addEventListener('dblclick', () => {
//     if(!document.fullscreenElement) {
//         canvas.requestFullscreen();
//     } else {
//         document.exitFullscreen();
//     }
// });

// Object
debugObject.color = '#3a6ea6'
const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
const material = new THREE.MeshBasicMaterial({
    color: debugObject.color,
    wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder('Cube')

cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');

cubeTweaks
    .add(mesh, 'visible')
    .name('visibility');

cubeTweaks
    .add(material, 'wireframe');

cubeTweaks
    .addColor(debugObject, 'color')
    .onChange((value) => {
        material.color.set(debugObject.color)
    })

debugObject.spin = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2});
};

cubeTweaks
    .add(debugObject, 'spin')

debugObject.subdivision = 2;
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();

const controlsTweaks = gui.addFolder('Controls');
controlsTweaks.close();
controlsTweaks
    .add(controls, 'enableDamping')
    .name('smooth')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();