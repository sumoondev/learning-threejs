import { useTexture, useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const donuts = useRef([])
    console.log(donuts)
       

    // const matcapTexture = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    const matcapTexture = useTexture('./matcaps/1.png')

    useEffect(() => 
    {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D 
                font="./fonts/helvetiker_regular.typeface.json"
                material={ material }
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                Hello R3F
            </Text3D>
        </Center>

        { [...Array(100)].map((value, index) =>
            <mesh
                ref={ (element) => donuts.current[index] = element }
                key={ index }
                geometry={ torusGeometry }
                material={ material }
                position={ [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ] }
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={ [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ] }
            />
        ) }

    </>
}