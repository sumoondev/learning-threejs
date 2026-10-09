# learning-threejs

`learning-threejs` is my personal Three.js practice repository. It follows **Bruno Simon's Three.js Journey** and collects chapter-by-chapter experiments, exercises, and small demos while I learn modern 3D web development.

The goal of this repo is simple: explore Three.js by building real scenes, trying new rendering techniques, and keeping each lesson in its own folder so progress is easy to revisit.

## What you’ll find here

- Multiple lesson folders grouped by chapter number
- Exercises built with Vite, HTML, CSS, JavaScript, and React
- Asset-heavy examples using models, Draco compression, and scene resources
- Progression from basic rendering to more advanced interactive scenes and game-like experiences

## Topics covered

- [Getting started with Three.js](https://threejs.org/docs/)
- [Scene, camera, and renderer](https://threejs.org/docs/#api/en/scenes/Scene)
- [Geometries](https://threejs.org/docs/#api/en/geometries/BufferGeometry)
- [Materials](https://threejs.org/docs/#api/en/materials/Material)
- [Textures](https://threejs.org/docs/#api/en/textures/Texture)
- [Lights](https://threejs.org/docs/#api/en/lights/Light)
- [Meshes and objects](https://threejs.org/docs/#api/en/objects/Mesh)
- [Animations and timelines](https://threejs.org/docs/#manual/en/introduction/Animation-system)
- [Loaders and assets](https://threejs.org/docs/#api/en/loaders/Loader)
- [GLTF model workflow](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [Draco compression](https://www.gstatic.com/draco/v1/decoders/README.txt)
- [Raycasting and interaction](https://threejs.org/docs/#api/en/core/Raycaster)
- [Post-processing](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer)
- [Shadows](https://threejs.org/docs/#api/en/lights/shadows/LightShadow)
- [Physics and game-style interaction](https://github.com/schteppe/cannon.js)

## Repository structure

Each numbered folder is a chapter or lesson from the course. Most contain one or more exercises with their own source files, assets, and local configuration.

```text
01/..53/       Course exercises and lesson implementations
README.md      Project overview
```

## How to use this repo

1. Open the folder for the lesson you want to study.
2. Install dependencies inside that lesson if needed.
3. Run the local Vite dev server for that exercise.
4. Compare the code with the chapter’s concept and experiment freely.

## Recommended learning path

If you are working through the repo in order, a good progression is:

1. Core scene setup and basic rendering
2. Geometry, materials, and textures
3. Lighting, shadows, and environment control
4. Model loading and asset pipelines
5. Animation, interaction, and raycasting
6. React-based scene architecture
7. Advanced topics such as effects, movement, and game logic

## Useful references

- [Three.js documentation](https://threejs.org/docs/)
- [Three.js examples](https://threejs.org/examples/)
- [Three.js Journey](https://threejs-journey.com/)
- [Bruno Simon on GitHub](https://github.com/brunosimon)

## Notes

- Some lessons use plain JavaScript while later ones use React.
- Several exercises include bundled assets such as DRACO decoders or GLTF models.
- Folder contents may differ slightly between chapters as the course evolves.
