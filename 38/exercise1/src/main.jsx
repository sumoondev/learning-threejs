import './index.css'
import ReactDom from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { StrictMode } from 'react'
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Leva collapsed />
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
        >
            <Experience />
        </Canvas>
    </StrictMode>
)