import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resizing
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    renderer.setSize(sizes.width, sizes.height)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();
})

// Fullscreen
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})

// Object
// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1,4,4,4),
//     new THREE.MeshBasicMaterial({ 
//         color: 0xff0000,
//         wireframe: true
//     })
// )
// scene.add(mesh);

// const geometry = new THREE.BufferGeometry();
// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0,
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
// const mesh = new THREE.Mesh(
//     geometry, 
//     new THREE.MeshBasicMaterial({
//         color: 0xff0000,
//         wireframe: true
//     })
// )
// scene.add(mesh)

const geometry = new THREE.BufferGeometry();

const count = 400;
const positionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 3
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute);

const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
)

scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 4;
camera.lookAt(mesh.position);
scene.add(camera);

// Contorl
const controls = new OrbitControls(camera, canvas);
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

const tick = () => {
    controls.update();
    
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();