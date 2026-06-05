import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// GUI
const gui = new GUI();
gui.close();

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Texture
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Fonts
const fontLoader = new FontLoader();

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                depth: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        );
        textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
        // );
        textGeometry.center();

        const material = new THREE.MeshMatcapMaterial({
            wireframe: false,
            matcap: matcapTexture
        });
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        console.time('donuts');

        const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);
        // const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture});

        for(let i = 0; i < 10000; i ++) {
            const donut = new THREE.Mesh(donutGeometry, material);

            donut.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );

            donut.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
        }
        
        console.timeEnd('donuts')
    }
);

// Objects
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({
//         color: 0xffffff
//     })
// );
// scene.add(cube);

// Point Light
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1,1,7);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Timer
const timer = new THREE.Timer();

const tick = () => {
    timer.update();

    const elaspedTime = timer.getElapsed();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();