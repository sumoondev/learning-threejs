import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()

    const cubeJump = () =>
    {
        const mass = cube.current.mass()
        
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Physics debug={ true } gravity={ [ 0, - 9.08, 0 ] } >

            <RigidBody colliders="ball" position={ [ - 1.5, 2, 0 ] } gravityScale={ [ 0.2 ] }>
                <mesh castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ cube }
                position={ [ 1.5, 2, 0 ] }
                gravityScale={ 1 }
                colliders={ false }
            >
                <mesh castShadow onClick={ cubeJump }>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
            </RigidBody>

            <RigidBody type="fixed" >
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

        </Physics>

    </>
}