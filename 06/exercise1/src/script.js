import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

// GUI
const gui = new GUI({
    closeFolders: true
});
gui.close();

const debugObject = {};

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
})

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(1);
axesHelper.visible = false;
scene.add(axesHelper);

debugObject.axesHelperScale = 1;

const axes = gui.addFolder('Axes Helper')

axes.add(axesHelper, 'visible').name('visible');
axes.add(debugObject, 'axesHelperScale').min(0).max(10).step(1).name('Scale').onChange((value) => {
    axesHelper.scale.set(value,value,value);
});

// Objects
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
});

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
);
scene.add(cube);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,20,20),
    material
);
sphere.position.x = -2;
scene.add(sphere);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.2, 12),
    material
);
torus.position.x = 2;
scene.add(torus);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(6,6),
    material
)
plane.rotation.x = - Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(cube.position);
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 1, 7, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0,2,3);
scene.add(spotLight);

spotLight.target.position.set(-2,0,0);
scene.add(spotLight.target);

// Light Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,0.2);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 2, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const tick = () => {
    const elaspedTime = clock.getElapsedTime();

    // Rotate objects
    cube.rotation.x = elaspedTime * 0.1;
    cube.rotation.y = elaspedTime * 0.1;

    sphere.rotation.x = elaspedTime * 0.1;
    sphere.rotation.y = elaspedTime * 0.1;
    
    torus.rotation.x = elaspedTime * 0.1;
    torus.rotation.y = elaspedTime * 0.1;

    renderer.render(scene, camera);

    controls.update();

    window.requestAnimationFrame(tick);
}

tick();