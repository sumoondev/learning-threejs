import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(- 5, 0, 0)
// scene.add(cube)

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
// scene.add(torusKnot)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
sphere.position.set(5, 0, 0)
sphere.castShadow = true
sphere.receiveShadow = true
// scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
floor.position.set(0, - 2, 0)
floor.rotation.x = - Math.PI * 0.5
floor.castShadow = true
floor.receiveShadow = true
// scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, 2.25)
// scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    // Stats start
    stats.begin()
    
    const elapsedTime = clock.getElapsedTime()
    
    // Update test mesh
    torusKnot.rotation.y = elapsedTime * 0.1
    
    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    
    // Stats end
    stats.end()
}

tick()

/**
 * Tips
 */

// Tip 3
// It is use Spector.js chrome extension and check how each frame is being fully rendered

// Tip 4
console.log(renderer.info)

// // Tip 6
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// Tip 7
// Do not use multiple lights, instead use baked lights if possible or use simple lights like ambient, directional, and/or hemisphere lights

// Tip 8
// Avoid adding and removing lights

// Tip 9
// If possible avoid using shadows, by using baked shadows

// Tip 10
// Using lights which fits only the required part
directionalLight.shadow.camera.top = 3
directionalLight.shadow.camera.right = 6
directionalLight.shadow.camera.left = - 6
directionalLight.shadow.camera.bottom = - 3
directionalLight.shadow.camera.far = 10
// Try using smaller maps
directionalLight.shadow.mapSize.set(1024, 1024)

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)

// Tip 11
// Wisely apply cast and receive shadow
cube.castShadow = true
cube.receiveShadow = false

torusKnot.castShadow = true
torusKnot.receiveShadow = false

sphere.castShadow = true
sphere.receiveShadow = false

floor.castShadow = false
floor.receiveShadow = true

// // Tip 12 - Deactivate shadow auto update
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true

// Tip 13 - Resize textures
// Try to use texture as small as possible

// Tip 14
// Try to keep mipmaps resolution a power of 2

// Tip 15
// use right format, it can reduce the loading time
// Utilize tinypng.com for reducing size of files
// Or use basis format which is just like jpg and png but is harder to make but very performant

/** Geometries */
// Tip 16
// Use buffer geometry for performance

// Tip 17
// Try to avoid updating vertices

// // Tip 18 - Mutual geometries
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// for(let i = 0; i < 50; i++)
// {
//     const material = new THREE.MeshNormalMaterial()
    
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 19 - Merge geometries
// const geometries = []

// for(let i = 0; i < 50; i++)
// {
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//     geometry.translate(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10
//     )
//     geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
//     geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)

//     geometries.push(geometry)
// }

// const mergedGeometry = mergeGeometries(geometries)

// const material = new THREE.MeshNormalMaterial()

// const mesh = new THREE.Mesh(mergedGeometry, material)

// scene.add(mesh)

// // Tip 20 - Mutualize materials
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()
    
// for(let i = 0; i < 50; i++)
// {
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// Tip 21 - Try to use cheap materials
// like basic, lambert or phong materials

// // Tip 22 - use instanced mesh
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// const material = new THREE.MeshNormalMaterial()

// const mesh = new THREE.InstancedMesh(geometry, material, 50)
// mesh.instanceMatrix.setUsage(THREE.DynaicDrawUsage)
// scene.add(mesh)

// for(let i = 0; i < 50; i++)
// {
//     const position = new THREE.Vector3(
//         ((Math.random() - 0.5) * 10),
//         ((Math.random() - 0.5) * 10),
//         ((Math.random() - 0.5) * 10)
//     )

//     const quaternion = new THREE.Quaternion()
//     quaternion.setFromEuler(new THREE.Euler(
//         (Math.random() - 0.5) * Math.PI * 2,
//         (Math.random() - 0.5) * Math.PI * 2,
//         0
//     ))

//     const matrix = new THREE.Matrix4()
//     matrix.makeRotationFromQuaternion(quaternion)
//     matrix.setPosition(position)
//     mesh.setMatrixAt(i, matrix)
// }

// Tip 23 - Low poly models
// Try using low poly models

// Tip 24 - Draco Compression
// If need to use high poly, try using draco models

// Tip 25 - Gzip (Content encoding)
// When running is server, use Gzip compression for handling .glb, .gltf, .glb, etc.

/** Cameras */
// Tip 26 - Field of View
// reducing Fov to gain more fps and reduce rendering

// Tip 27, 28 - Near and Far
// try tweaking near and far of camera to gain fps

/** Renderer */
// Tip 29 - Set pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Tip 30 - Power preferences
// const renderer = new THREE.WebGLRenderer({
//     powerPreference: 'high-performance'
// })

// Tip 31, 32, 34 and 35 
// Antialias is less performant than no antialias
// Try uisng less pass in post processing
// precision low as possible
// Keep the code simple 
// less use of if and make good use of sqizzles
// use texture instead of noise function
// use defines instead of uniforms for static values for keeping things simple and performant
// try doing all the calculation in vertexShader rather than fragmentShaders
// try testing on multiple devices and check the draw calls to ensure everything is right

const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

const shaderMaterial = new THREE.ShaderMaterial({
    precision: 'lowp',
    uniforms:
    {
        uDisplacementTexture: { value: displacementTexture },
        uDisplacementStrength: { value: 1.5 }
    },
    vertexShader: `
        uniform sampler2D uDisplacementTexture;
        uniform float uDisplacementStrength;

        varying vec2 vUv;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            float elevation = texture2D(uDisplacementTexture, uv).r;
            // if(elevation < 0.5)
            // {
            //     elevation = 0.5;
            // }

            modelPosition.y += clamp(elevation, 0.5, 1.0) * uDisplacementStrength;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D uDisplacementTexture;

        varying vec2 vUv;

        void main()
        {
            float elevation = texture2D(uDisplacementTexture, vUv).r;
            elevation = clamp(elevation, 0.25, 1.0);
            // if(elevation < 0.25)
            // {
            //     elevation = 0.25;
            // }

            vec3 depthColor = vec3(1.0, 0.1, 0.1);
            vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
            vec3 finalColor = vec3(0.0);
            finalColor = mix(depthColor, surfaceColor, elevation);
            // finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
            // finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
            // finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
})

const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
shaderMesh.rotation.x = - Math.PI * 0.5
scene.add(shaderMesh)