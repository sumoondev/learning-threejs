import { Text, ContactShadows, PresentationControls, Html, Float, Environment, useGLTF, OrbitControls } from '@react-three/drei'

export default function Experience()
{
    const computer = useGLTF('./model.glb')

    return <>

        {/* <OrbitControls makeDefault /> */}

        <color args={ [ '#222333' ] } attach="background" />

        <Environment preset="city" />

        <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ - 0.4, 0.3 ] }
            azimuth={ [ - 1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            <Float
                rotationIntensity={ 0.4 }
            >
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#f5bc93' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 2.3, - 2.8 ] }
                />
                <primitive 
                    object={ computer.scene } 
                    // position-x={ 0.2 }
                    position-y={ - 0.7 }
                    scale={ 1 }
                    rotation={ [ 1, 1.2, - 0.8 ] }
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={ 2 }
                        position={ [ 0, 2.3, - 2.8 ] }
                        rotation-x={ - 0.2 }
                    >
                        <iframe src="https://sumoonbyanjankar.com.np" />
                    </Html>
                </primitive>

                <Text
                    fontSize={ 1 }
                    position={ [ 2, 1.95, - 2 ] }
                    rotation={ [ 0.1, - 0.4, - 0.2 ] }
                    maxWidth={ 2 }
                    textAlign='center'
                >
                    Sumoon Byanjankar
                </Text>
            </Float>
        </PresentationControls>

    </>
}