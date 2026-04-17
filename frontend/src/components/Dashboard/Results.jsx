import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, FileText, Activity, Info, Zap, Sparkles, TrendingUp, AlertTriangle, Heart, Brain, Droplets
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell
} from 'recharts';
import { generatePDFReport } from '../../utils/pdfGenerator';

const Results = ({ data, onSave }) => {
  if (!data) {
    return (
      <div className="w-full glass-panel rounded-2xl border border-white/5 flex flex-col items-center justify-center p-20 text-center group">
        <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:border-indigo-500/30 transition-colors duration-500">
           <Activity size={32} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2 tracking-tight">AI Diagnostic Payload Pending</h3>
        <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
          The neural engine requires active biometric streaming to project your metabolic trajectory.
        </p>
      </div>
    );
  }

  const suggestions = data.suggestions || [];
  const healthSummary = data.healthSummary || "No metabolic summary available for this simulation.";
  const cardioRisk = data.cardioRisk || 0;
  const diabetesRisk = data.diabetesRisk || 0;
  const obesityRisk = data.obesityRisk || 0;
  const strokeRisk = data.strokeRisk || 0;
  const projections = data.projections || { timeSeries: [] };

  const riskData = [
    { name: 'Cardio', value: cardioRisk, color: '#f43f5e' },
    { name: 'Diabetes', value: diabetesRisk, color: '#f59e0b' },
    { name: 'Obesity', value: obesityRisk, color: '#10b981' },
    { name: 'Stroke', value: strokeRisk, color: '#6366f1' },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* 1. Health Summary (Paragraphs/Bullets with Numbers) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">
               <Zap size={12} className="fill-indigo-400/20" />
               Full Twin Assessment
            </div>
            <div className="flex gap-2">
              <button onClick={onSave} className="p-2 bg-slate-900/50 text-indigo-400 rounded-lg hover:bg-indigo-600 transition-all border border-white/5">
                <Download size={12} />
              </button>
              <button onClick={() => generatePDFReport(data, "TwinHealth_Report")} className="p-2 bg-slate-900/50 text-emerald-400 rounded-lg hover:bg-emerald-600 transition-all border border-white/5">
                <FileText size={12} />
              </button>
            </div>
          </div>

          <div className="bg-slate-950/40 p-6 rounded-xl border border-white/5 relative bg-gradient-to-br from-indigo-500/5 to-transparent flex-1">
            <p className="text-slate-200 text-sm leading-relaxed font-medium whitespace-pre-line">
              {healthSummary}
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-1.5 opacity-30">
            <Info size={10} className="text-slate-500" />
            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Medical Digital Twin Simulation v5.2</p>
          </div>
        </div>
      </div>

      {/* 2. Intelligence Action Plan (Suggestions) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl border border-white/5 shadow-xl h-full flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-950/20">
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles size={12} className="text-yellow-500/70" />
                Intelligence Action Plan
             </h4>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
              {suggestions.length > 0 ? suggestions.map((s, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-4 p-4 bg-slate-950/40 rounded-xl border border-white/5 text-[11px] text-slate-400 font-medium leading-relaxed hover:border-indigo-500/30 transition-all hover:bg-slate-900/60 group"
                >
                   <div className="mt-1 flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-emerald-400 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   </div>
                   <span className="group-hover:text-slate-200 transition-colors">{s}</span>
                </motion.div>
              )) : (
                <p className="text-slate-600 text-xs text-center italic mt-10">Initializing action plan...</p>
              )}
          </div>
        </div>
      </div>

      {/* 3. Graphs and Statistics */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col h-full overflow-hidden">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
              <TrendingUp size={12} className="text-blue-500" />
              Metabolic Statistics
           </h4>
           
           {/* Risk Bar Chart */}
           <div className="h-48 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={riskData} layout="vertical" margin={{ left: -20, right: 20 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" width={60} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                       {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>

           {/* Health Trajectory Chart */}
           <div className="flex-1 min-h-[140px]">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Projection Trajectory</span>
                 <AlertTriangle size={12} className="text-yellow-500 animate-pulse" />
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projections.timeSeries || []}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                  <XAxis dataKey="year" stroke="#475569" fontSize={8} axisLine={false} tickLine={false} />
                  <Area type="monotone" dataKey="bloodGlucose" stroke="#6366f1" strokeWidth={2} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
