import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const Object = () => {
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#fa58b6" />
    </mesh>
  )
}

const Test = () => {
  return (
    <Canvas>
      <color attach="background" args={["#1a1a40"]} />
      <OrbitControls />
      <Object />
    </Canvas>
  )
}

export default Test
