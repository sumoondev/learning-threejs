import { useFrame } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 * Math.sin(time)

        cube.current.rotation.y += delta * 0.09
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#4b2709',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 }
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, 2, 3 ] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value:3.5, min: 0, max: 12},
        envMapHeight: { value: 7, min: 0, max: 100},
        envMapRadius: { value: 27, min: 10, max: 1000},
        envMapScale: { value: 100, min: 10, max: 1000},
    })

    return <>

        {/* <Environment 
            // background
            ground= { {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapRadius
            } }
            // files={ [ './environmentMaps/the_sky_is_on_fire_2k.hdr' ] }
            preset='sunset'
            resolution={ 32 }
        > */}
            {/* <Lightformer 
                position-z={ -5 }
                scale={ 10 }
                color='red'
                intensity={ 10 }
                form="ring"
            /> */}
        {/* </Environment> */}

        {/* <BakeShadows /> */}

        <color args={ [ 'ivory' ] } attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows 
            position={ [ 0, - 0.99, 0 ] }
            scale={ 10 }
            color='#316d39'
            opacity={ 0.8 }
            frames={ Infinity }
            temporal
            blend={ 100 }
        >
            <RandomizedLight 
                position={ [ 1, 2, 3 ] } 
                amount={ 8 }
                radius={ 1 }
                intensity={ 1 }
                ambient={ 0.5 }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}

        {/* <ContactShadows 
            position={ [ 0, 0, 0 ] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
        /> */}

        {/* <directionalLight 
            ref={ directionalLight } 
            position={ sunPosition } 
            intensity={ 4.5 } 
            castShadow 
            shadow-mapSize= { [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 5 }
            shadow-camera-left={ - 5 }
        /> */}
        {/* <ambientLight intensity={ 1.5 } /> */}

        {/* <Sky sunPosition={ sunPosition } /> */}

        {/* <mesh castShadow position-x={ - 2 } position-y={ 1 } >
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
        </mesh>

        <mesh ref={ cube } castShadow position-x={ 2 } position-y={ 1 } scale={ 1.5 } >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity } />
        </mesh> */}

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
        </mesh> */}

        <Stage
            contactShadow={ { opacity: 0.2, blur: 3 } }
            environment="sunset"
            preset="portrait"
            intensity={ 2 }
        >
            <mesh castShadow position-x={ - 2 } position-y={ 1 } >
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
            </mesh>

            <mesh ref={ cube } castShadow position-x={ 2 } position-y={ 1 } scale={ 1.5 } >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity } />
            </mesh>
        </Stage>

    </>
}