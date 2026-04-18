import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, FileText, Activity, Info, Zap, Sparkles, TrendingUp, AlertTriangle, Heart, Brain, Droplets, ArrowDownToLine, Save
} from 'lucide-react';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell, Legend
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
  const fattyLiverRisk = data.fattyLiverRisk || 0;
  const biologicalAge = data.biologicalAge || 0;
  const healthScore = data.healthScore || 0;
  const projections = data.projections || { timeSeries: [] };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. HEALTH TRENDS (GRAPHS) */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl flex flex-col w-full">
         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-indigo-500" />
            Health Trends (10-Year Projections)
         </h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Graph 1: Weight Projection */}
           <div className="h-48 border border-white/5 rounded-xl bg-slate-900/30 p-4">
             <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Weight Projection (kg)</div>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={projections.timeSeries}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                 <XAxis dataKey="year" tick={{fontSize: 8}} stroke="#475569" />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                 <Area type="monotone" dataKey="weight" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>

           {/* Graph 2: BMI Trend */}
           <div className="h-48 border border-white/5 rounded-xl bg-slate-900/30 p-4">
             <div className="text-[9px] font-black text-slate-500 uppercase mb-2">BMI Trend</div>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={projections.timeSeries}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                 <XAxis dataKey="year" tick={{fontSize: 8}} stroke="#475569" />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                 <Area type="monotone" dataKey="bmi" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>

           {/* Graph 3: Risk Trend */}
           <div className="h-48 border border-white/5 rounded-xl bg-slate-900/30 p-4">
             <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Risk Trend (%)</div>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={projections.timeSeries}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                 <XAxis dataKey="year" tick={{fontSize: 8}} stroke="#475569" />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                 <Line type="monotone" dataKey="cardioRisk" stroke="#ef4444" strokeWidth={1.5} dot={false} />
                 <Line type="monotone" dataKey="diabetesRisk" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
                 <Line type="monotone" dataKey="obesityRisk" stroke="#6366f1" strokeWidth={1.5} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>

           {/* Graph 4: Health Score Progress */}
           <div className="h-48 border border-white/5 rounded-xl bg-slate-900/30 p-4">
             <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Health Score</div>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={projections.timeSeries}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                 <XAxis dataKey="year" tick={{fontSize: 8}} stroke="#475569" />
                 <YAxis domain={[0, 100]} hide />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                 <Line type="monotone" dataKey="healthScore" stroke="#8b5cf6" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </div>
      </div>

      {/* 2. AI ANALYSIS */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl">
         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
            <Zap size={16} className="text-yellow-400" />
            AI Health Analysis
         </h4>
         <div className="bg-slate-950/40 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
             <p className="text-slate-200 text-[13px] leading-relaxed font-medium whitespace-pre-line">
               {healthSummary}
             </p>
         </div>
      </div>

      {/* 3. PREDICTIONS */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl">
         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
            <Activity size={16} className="text-rose-400" />
            Clinical Predictions
         </h4>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[{label:"Heart Disease Risk", val: cardioRisk, c:"text-rose-500"}, 
              {label:"Diabetes Risk", val: diabetesRisk, c:"text-orange-500"},
              {label:"Obesity Risk", val: obesityRisk, c:"text-indigo-400"},
              {label:"Fatty Liver Risk", val: fattyLiverRisk, c:"text-yellow-600"},
              {label:"Biological Age", val: biologicalAge, c:"text-cyan-400", suffix:" yrs"},
              {label:"Health Score", val: healthScore, c:"text-emerald-400"}].map((p, i) => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center items-center">
                   <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">{p.label}</div>
                   <div className={`text-2xl font-black ${p.c}`}>{p.val}{p.suffix || '%'}</div>
                </div>
            ))}
         </div>
      </div>

      {/* 4. RECOMMENDATIONS & SUGGESTIONS */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl">
         <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-emerald-400" />
            Personalized Recommendations
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {suggestions.length > 0 ? suggestions.map((s, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-950/40 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                   <div className="mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" />
                   </div>
                   <span className="text-sm text-slate-300 font-medium leading-relaxed group-hover:text-white">{s}</span>
                </div>
             )) : (
                <p className="text-slate-600 text-xs italic p-4">Recommendations are currently pending...</p>
             )}
         </div>
      </div>

      {/* 5. SAVE REPORT + DOWNLOAD BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-4 mb-20">
         <button 
           onClick={onSave} 
           className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
         >
            <Save size={16} className="text-indigo-400" />
            Save Report
         </button>
         <button 
           onClick={() => generatePDFReport(data, "TwinHealth_Report")} 
           className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl border border-indigo-400/50 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
         >
            <ArrowDownToLine size={16} />
            Download Report (PDF)
         </button>
      </div>

    </div>
  );
};

export default Results;
