import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Experience from './Experience.jsx'
import { Canvas } from '@react-three/fiber'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Canvas
            flat
            camera={ {
                fov: 45,
                near: 0.1,
                far: 20000,
                position: [ 1,100,0 ]
            } }
        >
            <color attach="background" args={ [ '#1a1a1a' ] } />
            <Experience />
        </Canvas>
    </StrictMode>,
)
