import './index.css'
import ReactDom from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './component/Experience.jsx'
import * as THREE from 'three'

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <Canvas 
        // dpr={ [ 1, 2 ] }
        // orthographic
        flat
        gl={ {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace
        } }

        camera={ {
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 200,
            position: [ 3, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)