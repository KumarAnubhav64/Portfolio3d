import React from 'react'
import HeroText from '../Componenets/HeroText'
import ParallaxBackground from '../Componenets/ParallaxBackground'
import Loader from '../Componenets/Loader'
import { Canvas, useFrame } from '@react-three/fiber'
import { Astronaut } from '../Componenets/Astrounaut'
import { OrbitControls, Float } from '@react-three/drei'
import { Suspense } from 'react'
import { useMediaQuery } from 'react-responsive'
import { easing } from 'maath' // or '@react-spring/three' if you use that package

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 })
  return (
    <section className='flex item-start justify-center md:items-start md:justify-start min-h-screen  overflow-hidden c-space'>
      <HeroText />
      <ParallaxBackground />
      <figure
        className='absolute inset-0'
        style={{ width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float><Astronaut scale={isMobile && 0.23} position={isMobile && [0, -1.5, 0]} /></Float>
          </Suspense>
          <Rig />
        </Canvas>
      </figure>
    </section>
  )
}

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.mouse.x / 10, 1 + state.mouse.y / 10, 3], 0.5, delta)
  })
}
export default Hero
