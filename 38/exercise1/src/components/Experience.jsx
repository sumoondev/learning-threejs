import { OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const { position, color, visible } = useControls('Cube', {
        position: {
            value: { x: 2, y: 0 },
            // min: - 4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: "#aa8fcf",
        visible: true
    })

    const { perfVisibility } = useControls('Perf', {
        perfVisibility: true
    })

    return <>

        { perfVisibility ? <Perf position='top-left' /> : null }

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh position={ [ position.x, position.y, 0 ] } scale={ 1.5 } visible={ visible } >
            <boxGeometry />
            <meshStandardMaterial color={ color }/>
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}