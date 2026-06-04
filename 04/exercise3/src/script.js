import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Texture
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//     texture.needsUpdate = true;
// };
// image.src = '/textures/door/color.jpg';

const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//     console.log('onStart');
// }
// loadingManager.onProgress = () => {
//     console.log('onProgress');
// }
// loadingManager.onLoad = () => {
//     console.log('onLoad');
// }
loadingManager.onError = () => {
    console.log('onError');
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/minecraft.png')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

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
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Object
const geometry = new THREE.BoxGeometry(1,1,1,4,4,4);
console.log(geometry.attributes);

const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    // wireframe: false,
    map: colorTexture
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();