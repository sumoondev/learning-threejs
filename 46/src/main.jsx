import ReactDom from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './index.css'
import Experience from './Experience'

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 100,
            position: [ 12, -1, 12]
        } }
    >
        <Experience />
    </Canvas>
)