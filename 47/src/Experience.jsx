import { useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import './experience.css'

export default function Experience() {
    const [colorMap, displacementMap] = useTexture([
        "/color.png",
        "/displacement.png",
    ]);

    // Color texture
    colorMap.colorSpace = THREE.SRGBColorSpace;

    // Height map
    displacementMap.colorSpace = THREE.NoColorSpace;

    colorMap.wrapS = THREE.ClampToEdgeWrapping;
    colorMap.wrapT = THREE.ClampToEdgeWrapping;

    displacementMap.wrapS = THREE.ClampToEdgeWrapping;
    displacementMap.wrapT = THREE.ClampToEdgeWrapping;

    colorMap.minFilter = THREE.LinearFilter;
    colorMap.magFilter = THREE.LinearFilter;

    displacementMap.minFilter = THREE.LinearFilter;
    displacementMap.magFilter = THREE.LinearFilter;

    return (
        <>
            <OrbitControls makeDefault />

            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 20, 10]} intensity={4} />

            <mesh rotation-x={-Math.PI / 2}>
                {/* Use lots of segments for displacement */}
                <planeGeometry args={[2000, 1000, 1024, 512]} />

                <meshStandardMaterial
                    map={colorMap}
                    displacementMap={displacementMap}
                    displacementScale={120}
                    displacementBias={0}
                />
            </mesh>
        </>
    );
}
