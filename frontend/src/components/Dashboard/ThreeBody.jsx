import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, useProgress, Html } from '@react-three/drei';
import { Model as MaleModel } from './MaleAnatomyModel';
import { Model as FemaleModel } from './FemaleAnatomyModel';
import { User, Info, Maximize2 } from 'lucide-react';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-slate-950/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
          Neural Syncing: {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};

const AutoSpin = ({ children }) => {
  const group = useRef();
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003;
    }
  });
  return <group ref={group}>{children}</group>;
};

const ThreeBody = ({ organStress, gender = 'Male' }) => {
  return (
    <div className="w-full h-[550px] glass-panel rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl group/viewport">
      {/* Viewport Accents */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/20 z-10 rounded-[inherit]"></div>
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-indigo-500/20 rounded-tl-3xl z-10"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-indigo-500/20 rounded-br-3xl z-10"></div>

      {/* Header Overlay */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Projection: <span className={gender === 'Male' ? 'text-blue-400' : 'text-pink-400'}>{gender.toUpperCase()}</span></span>
        </div>
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tight ml-1">
          Holographic Diagnostic Mode v2.4
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="cursor-grab active:cursor-grabbing">
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        
        <Suspense fallback={<Loader />}>
          <AutoSpin>
            <Center>
              {gender === 'Male' ? (
                <MaleModel organStress={organStress} scale={1} />
              ) : (
                <FemaleModel organStress={organStress} scale={1} />
              )}
            </Center>
          </AutoSpin>
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
      </Canvas>

      {/* Footer Legend */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
         <div className="flex gap-4">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Navigation</span>
               <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 bg-slate-950/40 px-3 py-1 rounded-lg border border-white/5">
                  Drag to rotate • Scroll to zoom
               </div>
            </div>
         </div>
         <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-1.5 opacity-50">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Metadata Sync</span>
               <Info size={10} className="text-slate-500" />
             </div>
             <div className="h-1 w-24 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500/50 w-2/3 animate-[pulse_2s_infinite]"></div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default ThreeBody;
