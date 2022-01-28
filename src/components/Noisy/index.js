import React, { Suspense, useRef } from 'react'

import * as THREE from 'three'
import {
  Canvas,
  useFrame,
  useThree,
  extend,
} from '@react-three/fiber'
import { Loader, OrbitControls } from '@react-three/drei'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { useControls, Leva } from 'leva'

import './gridMaterial'
import './noiseMaterial'

const Grid = () => {
  const gridProps = useControls('Grid', {
    rotation: { value: [0, 0, 0], step: 0.05 },
  })

  return (
    <mesh scale={1} {...gridProps}>
      <planeGeometry args={[1.5, 1.5, 1, 1]} />
      <gridMaterial side={THREE.DoubleSide} />
    </mesh>
  )
}

const Pyramid = (props) => {
  const pyramidRef = useRef()
  const materialProps = useControls('Material', {
    thickness: { value: 1, min: 0, max: 20 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    color: '#ff00ff',
    attenuationTint: '#ffffff',
    attenuationDistance: { value: 0, min: 0, max: 1 },
  })

  const objectProps = useControls('Pyramid', {
    position: { value: [0, 0, 0.3], step: 0.01 },
    rotation: { value: [1.55, 0, 0], step: 0.01 },
  })

  useFrame(({ clock }) => {
    pyramidRef.current.rotation.set(
      4.7,
      clock.getElapsedTime() * -0.3,
      0,
    )
  })
  return (
    <mesh ref={pyramidRef} {...objectProps}>
      <coneGeometry args={[0.4, 0.45, 4]} />
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  )
}

const Icosahedron = (props) => {
  const icoProps = useControls('Icosahedron', {
    position: { value: [0, 0, -0.35], step: 0.05 },
    rotation: { value: [-0.8, 0, 0], step: 0.05 },
  })

  const material = React.useRef()

  useFrame(({ clock }) => {
    material.current.uniforms.time.value = Math.sin(
      (2 * Math.PI * clock.getElapsedTime()) / 10,
    )
  })

  return (
    <mesh {...icoProps}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <noiseMaterial ref={material} scale={1.5} />
    </mesh>
  )
}

const Group = (props) => {
  const group = useRef()

  const groupProps = useControls('Group', {
    rotation: { value: [-1.25, 0, 0], step: 0.01 },
  })

  useFrame(({ clock }) => {
    group.current.rotation.set(
      -1.25,
      clock.getElapsedTime() * 0.025,
      clock.getElapsedTime() * 0.025,
    )
  })

  return (
    <group ref={group} {...props} {...groupProps}>
      <Pyramid position={[0, 0, -0.25]} />
      <Icosahedron />
      <Grid />
    </group>
  )
}

const IndexPage = () => {
  return (
    <>
      <Canvas
        dpr={window.devicePixelRatio}
        gl={{ alpha: false }}
        camera={{
          near: 0.01,
          far: 110,
          fov: 30,
          position: [0, 0, -3],
        }}
      >
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        <color attach="background" args={['#6638f0']} />

        <ambientLight intensity={1} />

        <Suspense fallback={null}>
          <Group />
          <EffectComposer>
            <DepthOfField
              focusDistance={3}
              focalLength={0.5}
              bokehScale={2}
              height={700}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Noise opacity={0.1} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={'bg-black'} // Flex layout styles
        innerStyles={'bg-red-200'} // Inner container styles
        barStyles={'bg-green-200'} // Loading-bar styles
        dataStyles={'bg-pink-200'} // Text styles
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
        initialState={(active) => active} // Initial black out state
      ></Loader>
      <Leva
        collapsed // default = false, when true the GUI is collpased
        hidden // default = false, when true the GUI is hidden
      />
    </>
  )
}

export default IndexPage
