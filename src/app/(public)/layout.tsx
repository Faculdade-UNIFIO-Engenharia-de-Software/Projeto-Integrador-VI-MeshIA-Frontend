import Grainient from '@/components/react-bits/Grainient';

export default function LayoutPublic({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <div className='w-dvw min-h-screen absolute inset-0 -z-10' >
      <Grainient
        color1="#3ee1b7"
        color2="#0b68f7"
        color3="#422465"
        timeSpeed={1.45}
        colorBalance={-0.01}
        warpStrength={1}
        warpFrequency={12}
        warpSpeed={1.8}
        warpAmplitude={22}
        blendAngle={50}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
      <main className="flex flex-col flex-1 gap-2">
        {children}
      </main>
   </> 
  )
}
