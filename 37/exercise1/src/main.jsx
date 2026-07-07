import './index.css'
import ReactDom from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ -4, 3, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)