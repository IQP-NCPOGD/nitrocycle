import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import React, { useState, useRef, useEffect } from "react"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import './styles.css'

import { ModelContext, plantTypeEnum } from "../Game"
        

function renderGLTFModel(gltfURL, scale) {
  const gltf = useLoader(GLTFLoader, gltfURL);
  return (
    <primitive
      scale={scale}
      object={gltf.scene} />
  );
}

function Plant(props) {

  function getPlantModel(curPlantState) {
    switch (curPlantState) {
      case plantTypeEnum.wilt:
        return renderGLTFModel('data/models/wilt.gltf', 0.25);
      case plantTypeEnum.notpurchased:
        return renderGLTFModel('data/models/question.gltf', 0.25);
      case plantTypeEnum.sprout:
        return renderGLTFModel('data/models/sprout.gltf', 0.25);
      case plantTypeEnum.plant:
        return renderGLTFModel('data/models/plant.gltf', 0.25);
      case plantTypeEnum.bloom:
        return renderGLTFModel('data/models/bloom.gltf', 0.25);
      default:
        return renderGLTFModel('data/models/question.gltf', 0.25);

    }
  }

  return (
    getPlantModel(props.plantState)
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

class ARComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ARCanvas
        gl={{ alpha: true, antialias: false, powerPreference: "default", physicallyCorrectLights: true, precision: "highp", logarithmicDepthBuffer: true }}
        onCameraStreamReady={() => console.log("Camera stream ready")}
        onCameraStreamError={() => console.error("Camera stream error")}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight)
        }}
        resize={{ debounce: 500 }}>

        <ModelContext.Consumer>
          {({ plantState }) => {
            return (
              <>
                <ambientLight />
                <pointLight position={[10, 10, 0]} intensity={10.0} />

                <ARMarker
                  params={{ smooth: true }}
                  type={"pattern"}
                  patternUrl={"data/patterns/patt.hiro"}
                  onMarkerFound={this.props.plantFound}
                  onMarkerLost={this.props.plantLost}>

                  <Plant plantState={plantState} />

                </ARMarker>

                <ARMarker
                  params={{ smooth: true }}
                  type={"pattern"}
                  patternUrl={"data/patterns/arjs.patt"}>

                  <Box />

                </ARMarker></>
            );
          }}
        </ModelContext.Consumer>

      </ARCanvas>
    );
  }
}

export default ARComponent;