import { OrbitControls } from '@react-three/drei'
import { ToneMapping, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { useRef } from 'react'
import Drunk from './Drunk'

export default function Experience()
{
    const drunkRef = useRef()

    const drunkProps = useControls('Drunk Effect', {
        frequency: { value: 2, min: 0, max: 10 },
        amplitude: { value: 0.1, min: 0, max: 1 },
    })

    return <>

        <EffectComposer disableNormalPass >
            <Drunk 
                ref={ drunkRef }
                { ...drunkProps }
                blendFunction={ BlendFunction.DARKEN }
            />
            <ToneMapping />
        </EffectComposer>

        {/* <Perf position='top-left'/> */}

        <OrbitControls makeDefault />

        <directionalLight castShadow intensity={ 4.5 } position={ [ 1, 2, 3] } />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 } >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 } >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}