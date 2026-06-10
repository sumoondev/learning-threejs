import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Model
 */
const gltfLoader = new GLTFLoader();

// gltfLoader.load(
//     '/models/Duck/glTF-Binary/Duck.glb',
//     (gltf) => {
//         scene.add(gltf.scene)
//     }
// )

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mouse
 */
const mouse = new THREE.Vector2(-1,1);

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = - ((event.clientY / sizes.height) * 2 - 1)
})

window.addEventListener('click', () => {
    if(currentIntersect) {
        // console.log('mouse clicked on sphere')
        if(currentIntersect.object == object1) {
            console.log('clicked on sphere 1')
        } else if(currentIntersect.object == object2) {
            console.log('clicked on sphere 2')
        } else {
            console.log('clicked on sphere 3')
        }
    }
})

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(directionalLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    // Cast a ray
    // const rayOrigin = new THREE.Vector3(-3, 0, 0);
    // const rayDirection = new THREE.Vector3(10, 0, 0);
    // rayDirection.normalize();
    
    raycaster.setFromCamera(
        mouse , camera
    )

    const objectToTest = [object1, object2, object3];

    const intersects = raycaster.intersectObjects(objectToTest);

    for(const object of objectToTest) {
        object.material.color.set(new THREE.Color('red'))
    }

    for(const intersect of intersects) {
        intersect.object.material.color.set(new THREE.Color('blue'))
    }

    if(intersects.length) {
        // if(currentIntersect === null) {
        //     console.log('mouse enter')
        // }
        currentIntersect = intersects[0]
    } else {
        // if(currentIntersect) {
        //     console.log('mouse leave')
        // }
        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()