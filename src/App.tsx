import React from 'react'
import Home from './components/page/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Agitate from './components/component-page/Agitate'
import Binary from './components/component-page/Binary'
import Blast from './components/component-page/Blast'
import BulletTime from './components/component-page/BulletTime'
import Droplet from './components/component-page/Droplet'
import Embers from './components/component-page/Embers'
import Fire from './components/component-page/Fire'
import FireTrail from './components/component-page/FireTrail'
import Firework from './components/component-page/Firework'
import Fission from './components/component-page/Fission'
import Flame from './components/component-page/Flame'
import Float from './components/component-page/Float'
import FlowField from './components/component-page/FlowField'
import Focus from './components/component-page/Focus'
import Fusion from './components/component-page/Fusion'
import Geo from './components/component-page/Geo'
import Ghost from './components/component-page/Ghost'
import Heart from './components/component-page/Heart'
import HoloSphere from './components/component-page/HoloSphere'
import MatrixRain from './components/component-page/MatrixRain'
import Ping from './components/component-page/Ping'
import Quantum from './components/component-page/Quantum'
import Radiate from './components/component-page/Radiate'
import Rain from './components/component-page/Rain'
import Resonance from './components/component-page/Resonance'
import Ripple from './components/component-page/Ripple'
import RippleMatrix from './components/component-page/RippleMatrix'
import Shatter from './components/component-page/Shatter'
import Skull from './components/component-page/Skull'
import Smoke from './components/component-page/Smoke'
import SolidRipple from './components/component-page/SolidRipple'
import Spark from './components/component-page/Spark'
import Spark2 from './components/component-page/Spark2'
import Sparkle from './components/component-page/Sparkle'
import Splash from './components/component-page/Splash'
import Synapse from './components/component-page/Synapse'
import Tesseract from './components/component-page/Tesseract'
import Warp from './components/component-page/Warp'
import Alignment from './components/component-page/Alignment'
import BlackHole from './components/component-page/BlackHole'
import BoundingBox from './components/component-page/BoundingBox'
import Diffusion from './components/component-page/Diffusion'
import DoubleSonar from './components/component-page/DoubleSonar'
import Generative from './components/component-page/Generative'
import Load from './components/component-page/Load'
import Sonar from './components/component-page/Sonar'
import SuperNova from './components/component-page/SuperNova'
import Prompt from './components/component-page/Prompt'
import Footer from './components/Footer'
import Footer2 from './components/Footer2'
import ScrollToTop from './components/ScrollToTop'

const contentInsetClass = 'px-14 sm:px-20 xl:px-28'

const App = () => {
  return (
    <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
  <div
    className="absolute inset-0 z-0 dark:bg-black "
  />
     {/* Your Content/Components */}

    {/* <div className="min-h-screen overflow-hidden bg-neutral-100 text-black dark:bg-zinc-950 dark:text-white"> */}
    <div className="min-h-screen overflow-hidden text-black dark:text-white">
      <Navbar />
      <main className="relative">
        <div className={`relative z-10 ${contentInsetClass}`}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Agitate" element={<Agitate />} />
            <Route path="/Alignment" element={<Alignment />} />
            <Route path="/Binary" element={<Binary />} />
            <Route path="/BlackHole" element={<BlackHole />} />
            <Route path="/Blast" element={<Blast />} />
            <Route path="/BoundingBox" element={<BoundingBox />} />
            <Route path="/BulletTime" element={<BulletTime />} />
            <Route path="/Diffusion" element={<Diffusion />} />
            <Route path="/DoubleSonar" element={<DoubleSonar />} />
            <Route path="/Droplet" element={<Droplet />} />
            <Route path="/Embers" element={<Embers />} />
            <Route path="/Fire" element={<Fire />} />
            <Route path="/FireTrail" element={<FireTrail />} />
            <Route path="/Firework" element={<Firework />} />
            <Route path="/Fission" element={<Fission />} />
            <Route path="/Flame" element={<Flame />} />
            <Route path="/Float" element={<Float />} />
            <Route path="/FlowField" element={<FlowField />} />
            <Route path="/Focus" element={<Focus />} />
            <Route path="/Fusion" element={<Fusion />} />
            <Route path="/Generative" element={<Generative />} />
            <Route path="/Geo" element={<Geo />} />
            <Route path="/Ghost" element={<Ghost />} />
            <Route path="/Heart" element={<Heart />} />
            <Route path="/HoloSphere" element={<HoloSphere />} />
            <Route path="/Load" element={<Load />} />
            <Route path="/MatrixRain" element={<MatrixRain />} />
            <Route path="/Ping" element={<Ping />} />
            <Route path="/Prompt" element={<Prompt />} />
            <Route path="/Quantum" element={<Quantum />} />
            <Route path="/Radiate" element={<Radiate />} />
            <Route path="/Rain" element={<Rain />} />
            <Route path="/Resonance" element={<Resonance />} />
            <Route path="/Ripple" element={<Ripple />} />
            <Route path="/RippleMatrix" element={<RippleMatrix />} />
            <Route path="/Shatter" element={<Shatter />} />
            <Route path="/Skull" element={<Skull />} />
            <Route path="/Smoke" element={<Smoke />} />
            <Route path="/SolidRipple" element={<SolidRipple />} />
            <Route path="/Sonar" element={<Sonar />} />
            <Route path="/Spark" element={<Spark />} />
            <Route path="/Spark2" element={<Spark2 />} />
            <Route path="/Sparkle" element={<Sparkle />} />
            <Route path="/Supernova" element={<SuperNova />} />
            <Route path="/SuperNova" element={<SuperNova />} />
            <Route path="/Splash" element={<Splash />} />
            <Route path="/Synapse" element={<Synapse />} />
            <Route path="/Tesseract" element={<Tesseract />} />
            <Route path="/Warp" element={<Warp />} />
          </Routes>
        </div>
      </main>
      <Footer2 />
    </div>
    </div>
  )
}

export default App
