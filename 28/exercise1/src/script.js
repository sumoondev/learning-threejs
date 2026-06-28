import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { cubeTexture } from 'three/src/nodes/accessors/CubeTextureNode.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js'
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import GUI from 'lil-gui'
import { uniform } from 'three/src/nodes/core/UniformNode.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 2.5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])
environmentMap.colorSpace = THREE.SRGBColorSpace

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Models
 */
gltfLoader.load(
    '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(2, 2, 2)
        // gltf.scene.position.y = - 10
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update render
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camers
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Post Processing
 */
const rendererTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: 2
    }
)

// Effect composer
const effectComposer = new EffectComposer(renderer, rendererTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

// Render pass
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Dot screen pass
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)

// Glitch pass
const glitchPass = new GlitchPass()
glitchPass.goWild = false
glitchPass.enabled = false
effectComposer.addPass(glitchPass)

// RGB Shift Pass
const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.enabled = false
effectComposer.addPass(rgbShiftPass)

// Gamma
const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader)
gammaCorrectionShader.enabled = true
effectComposer.addPass(gammaCorrectionShader)

// Antialias pass
if(renderer.getPixelRatio === 1 && !renderer.capabilities.isWebGL2)
{
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)
}

// Unreal Bloom pass
const unrealBloomPass = new UnrealBloomPass()
effectComposer.addPass(unrealBloomPass)

unrealBloomPass.strength = 0.3
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.6

gui.add(unrealBloomPass, 'enabled')
gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001)
gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001)
gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001)

// Tint pass
const TintShader ={
    uniforms:
    {
        tDiffuse: new THREE.Uniform(null),
        uTint: new THREE.Uniform(null)
    },
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture(tDiffuse, vUv);
            color.rgb += uTint;
            gl_FragColor = color;
        }
    `
}

debugObject.uTint = new THREE.Color(0,0,0)

const tintPass = new ShaderPass(TintShader)
tintPass.material.uniforms.uTint.value = debugObject.uTint
effectComposer.addPass(tintPass)

gui.addColor(debugObject, 'uTint').onChange(() => {
    tintPass.material.uniforms.uTint.value.set(debugObject.uTint)
})

// Displacement pass
const DisplacementShader = {
    uniforms:
    {
        tDiffuse: new THREE.Uniform(null),
        uNormalMap: new THREE.Uniform(null),
        uTime: new THREE.Uniform(null)
    },
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D uNormalMap;
        uniform float uTime;

        varying vec2 vUv;

        void main()
        {
            vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
            vec2 newUv = vUv + normalColor.xy * 0.1;
            vec4 color = texture2D(tDiffuse, newUv);

            // vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
            // float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
            // color.rgb += lightness * 2.0;

            gl_FragColor = color;
        }
    `
}

const displacementPass = new ShaderPass(DisplacementShader)
displacementPass.material.uniforms.uTime.value = 0
displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
effectComposer.addPass(displacementPass)

/**
 * Animate
 */
const timer = new THREE.Timer()

const tick = () =>
{
    timer.update()
    const elaspedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    window.requestAnimationFrame(tick)
}

tick()