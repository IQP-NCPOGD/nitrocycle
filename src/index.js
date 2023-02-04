import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import React, { useState, useRef } from "react"
import { createRoot } from "react-dom/client"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Bloom(props) {
  const gltf = useLoader(GLTFLoader, 'data/models/bloom.gltf')
  return (
    <primitive
      onClick={(event) => window.alert('click')}
      scale={0.25}
      object={gltf.scene} />
  );
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1 : 0.5}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

createRoot(document.getElementById("root")).render(
  <ARCanvas
    gl={{ alpha: true, antialias: false, powerPreference: "default", physicallyCorrectLights: true, precision: "highp", logarithmicDepthBuffer: true }}
    onCameraStreamReady={() => console.log("Camera stream ready")}
    onCameraStreamError={() => console.error("Camera stream error")}
    onCreated={({ gl }) => {
      gl.setSize(window.innerWidth, window.innerHeight)
    }}>
    <ambientLight />
    <pointLight position={[10, 10, 0]} intensity={10.0} />
    <ARMarker
      params={{ smooth: true }}
      type={"pattern"}
      patternUrl={"data/patt.hiro"}
      onMarkerFound={() => {
        console.log("Marker Found")
      }}>
      <Bloom />
    </ARMarker>
  </ARCanvas>,
)