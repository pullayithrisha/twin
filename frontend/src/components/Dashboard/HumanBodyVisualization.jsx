import React from 'react';
import useTwinStore from '../../store/useTwinStore';

const getStressColor = (score) => {
  if (score < 30) return '#22c55e'; // healthy green
  if (score < 70) return '#eab308'; // warning yellow
  return '#ef4444'; // danger red
};

const getGlowClass = (score) => {
  if (score < 30) return 'glow-green';
  if (score < 70) return 'glow-yellow';
  return 'glow-red';
};

const HumanBodyVisualization = () => {
  const { predictions } = useTwinStore();
  const organStress = predictions?.organStress || {
    brain: 0,
    heart: 0,
    lungs: 0,
    liver: 0,
    pancreas: 0
  };

  return (
    <div className="relative w-full max-w-sm mx-auto p-4 flex justify-center items-center">
      {/* Interactive SVG Human Body Outline */}
      <svg viewBox="0 0 400 800" className="w-full h-auto drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Body Outline */}
        <path 
          d="M200 40 C170 40, 150 70, 150 100 C150 120, 160 140, 170 150 C140 160, 100 180, 80 220 L60 400 C80 400, 90 380, 100 350 L110 250 L140 450 L150 750 C160 760, 180 760, 190 750 L200 450 L210 750 C220 760, 240 760, 250 750 L260 450 L290 250 L300 350 C310 380, 320 400, 340 400 L320 220 C300 180, 260 160, 230 150 C240 140, 250 120, 250 100 C250 70, 230 40, 200 40 Z" 
          stroke="#475569" strokeWidth="4" fill="rgba(30, 41, 59, 0.4)" 
        />

        {/* Brain */}
        <g className={`transition-all duration-700 ease-in-out ${getGlowClass(organStress.brain)}`}>
          <path d="M170 70 C170 50, 230 50, 230 70 C240 90, 220 100, 200 110 C180 100, 160 90, 170 70 Z" 
                fill={getStressColor(organStress.brain)} opacity="0.8" />
        </g>

        {/* Lungs */}
        <g className={`transition-all duration-700 ease-in-out ${getGlowClass(organStress.lungs)}`}>
          <path d="M150 180 C140 220, 150 260, 180 270 C185 240, 190 200, 180 180 Z" 
                fill={getStressColor(organStress.lungs)} opacity="0.8" />
          <path d="M250 180 C260 220, 250 260, 220 270 C215 240, 210 200, 220 180 Z" 
                fill={getStressColor(organStress.lungs)} opacity="0.8" />
        </g>

        {/* Heart */}
        <g className={`transition-all duration-700 ease-in-out ${getGlowClass(organStress.heart)}`}>
          <path d="M200 220 C220 210, 230 230, 210 250 L200 260 L190 250 C170 230, 180 210, 200 220 Z" 
                fill={getStressColor(organStress.heart)} opacity="0.9" />
        </g>

        {/* Liver */}
        <g className={`transition-all duration-700 ease-in-out ${getGlowClass(organStress.liver)}`}>
          <path d="M150 280 C180 280, 220 290, 230 310 C210 330, 180 320, 150 310 Z" 
                fill={getStressColor(organStress.liver)} opacity="0.85" />
        </g>

        {/* Pancreas */}
        <g className={`transition-all duration-700 ease-in-out ${getGlowClass(organStress.pancreas)}`}>
          <path d="M200 305 C210 300, 230 300, 240 310 C230 315, 210 315, 200 305 Z" 
                fill={getStressColor(organStress.pancreas)} opacity="0.9" />
        </g>
      </svg>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-slate-800/80 p-3 rounded-lg text-xs backdrop-blur-sm border border-slate-700">
        <h4 className="font-semibold mb-2">Organ Health</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 glow-green"></div> <span>Low Risk</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 glow-yellow"></div> <span>Medium Risk</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 glow-red"></div> <span>High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default HumanBodyVisualization;
