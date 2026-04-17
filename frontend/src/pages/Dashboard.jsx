import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Dashboard/Sidebar';
import InputForm from '../components/Dashboard/InputForm';
import ThreeBody from '../components/Dashboard/ThreeBody';
import Results from '../components/Dashboard/Results';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Activity, Menu, Zap } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentInputs, setCurrentInputs] = useState({
    name: 'John Doe', age: 35, gender: 'Male', height: 175, weight: 80,
    bp: '120/80', sugar: 90, calories: 2500, sleep: 7, exercise: 3, 
    steps: 8000, water: 2, stress: 3, smoking: 'No', alcohol: 'Low',
    junkFood: 'Medium', sugarIntake: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [previewGender, setPreviewGender] = useState('Male');
  const [liveStress, setLiveStress] = useState(null);
  const [systemAlert, setSystemAlert] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchReports();
    handleLiveUpdate({
      smoking: 'No', alcohol: 'Low', junkFood: 'Medium', sugarIntake: 'Medium',
      bp: '120/80', sugar: 90, stress: 3, sleep: 7, exercise: 3
    });
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reports`);
      setReports(res.data);
    } catch (e) {
      console.error('Failed to fetch history', e);
    }
  };

  const generateLiveSummary = (inputs) => {
    if (!inputs) return "Initializing neural link...";
    let risks = [];
    if (inputs.smoking === 'Yes') risks.push("significant pulmonary strain");
    if (inputs.alcohol === 'High') risks.push("elevated liver toxicity");
    if (inputs.junkFood === 'High') risks.push("systemic inflammatory markers");
    if (inputs.sugarIntake === 'High') risks.push("metabolic dysregulation");
    const bp = parseInt(inputs.bp.split('/')[0]) || 120;
    if (bp > 140) risks.push("hypertensive cardiovascular stress");
    
    if (risks.length === 0) return "Twin metabolic baseline appears stable. System is projecting optimal longevity trajectory.";
    return `Heuristic projection identifies ${risks.slice(0, 2).join(" and ")}. Perform AI simulation for precise organ-specific diagnostic verify.`;
  };

  const handleLiveUpdate = (inputs) => {
    setCurrentInputs(inputs); 
    const stress = { heart: 10, lungs: 10, brain: 10, liver: 10, kidneys: 10 };
    let activeAlerts = [];

    // 1. Fasting Blood Sugar Impact (High Sensitivity)
    if (inputs.sugar > 130) {
      stress.kidneys += 50; // Total 60 -> Amber
      stress.brain += 30;   // Total 40 -> Amber
      if (inputs.sugar > 200) {
        stress.kidneys += 30; // Total 90 -> Red
        stress.brain += 30;   // Total 70 -> Red
        activeAlerts.push({ organ: "Endocrine", type: "CRITICAL", msg: "HYPERGLYCEMIC CRISIS: Extreme glucose levels inducing acute cellular toxicity and kidney unit failure." });
      } else {
        activeAlerts.push({ organ: "Metabolism", type: "GLYCEMIC", msg: "GLUCOSE SPIKE: Elevated blood sugar inducing heavy insulin demand and renal filtration strain." });
      }
    }

    // 2. Smoking Impact
    if (inputs.smoking === 'Yes') {
      stress.lungs += 70;
      activeAlerts.push({ organ: "Lungs", type: "CRITICAL", msg: "PULMONARY WARNING: Chronic tar exposure degrading alveolar integrity and reducing oxygen perfusion." });
    }

    // 3. Alcohol Impact
    if (inputs.alcohol === 'High') {
      stress.liver += 60;
      activeAlerts.push({ organ: "Liver", type: "WARNING", msg: "HEPATIC CRISIS: Ethanol toxicosis overwhelming filtration and inducing oxidative stress." });
    }

    // 4. Junk Food Impact
    if (inputs.junkFood === 'High') {
      stress.heart += 40; stress.liver += 30;
      activeAlerts.push({ organ: "Digestion", type: "SYSTEMIC", msg: "METABOLIC ALERT: High trans-fat influx disrupting gut biome and triggering systemic inflammation." });
    }

    // 5. Sugar Intake (Dietary)
    if (inputs.sugarIntake === 'High') {
      stress.kidneys += 30; stress.brain += 20;
      activeAlerts.push({ organ: "Metabolism", type: "DIETARY", msg: "SUGAR OVERLOAD: High dietary sucrose forcing constant insulin spikes and neurological inflammation." });
    }

    // 6. Stress Level
    if (inputs.stress > 7) {
      stress.brain += 60; stress.heart += 20;
      activeAlerts.push({ organ: "Brain", type: "NEURAL", msg: "NEUROLOGICAL OVERDRIVE: Cortisol surge disrupting neural plasticity and inducing chronic sympathetic activation." });
    }

    // 7. Vitals (BP)
    const bpSystolic = parseInt(inputs.bp.split('/')[0]) || 120;
    if (bpSystolic > 140) {
      stress.heart += 50;
      activeAlerts.push({ organ: "Heart", type: "HYPERTENSIVE", msg: "CARDIOVASCULAR STRAIN: Elevated arterial pressure forcing cardiac hypertrophy and vascular stiffening." });
    }

    // 8. Secondary Penalties (Sleep/Exercise)
    if (inputs.sleep < 6) stress.brain += 30;
    if (inputs.exercise < 2) { stress.heart += 15; stress.lungs += 10; }

    // Priority Logic: Pick the most severe alert (CRITICAL > WARNING > Others)
    const priorityAlert = activeAlerts.sort((a, b) => {
      const rank = { "CRITICAL": 3, "WARNING": 2, "HYPERTENSIVE": 1, "GLYCEMIC": 1, "SYSTEMIC": 1, "NEURAL": 1, "DIETARY": 0 };
      return (rank[b.type] || 0) - (rank[a.type] || 0);
    })[0];

    setLiveStress(stress);
    setSystemAlert(priorityAlert || null);
  };

  const handleSimulate = async (inputs) => {
    setLoading(true);
    setCurrentInputs(inputs);
    setPreviewGender(inputs.gender);
    try {
      const twinState = {
        biometrics: {
          age: inputs.age, weight: inputs.weight, height: inputs.height, gender: inputs.gender, bp: inputs.bp, sugar: inputs.sugar
        },
        lifestyle: {
          calories: inputs.calories, sleep: inputs.sleep, exercise: inputs.exercise, 
          smoking: inputs.smoking, alcohol: inputs.alcohol, junkFood: inputs.junkFood, 
          sugarIntake: inputs.sugarIntake, stress: inputs.stress, steps: inputs.steps
        }
      };
      const res = await axios.post(`${API_BASE_URL}/api/analyze`, twinState);
      setCurrentData({ ...res.data, ...res.data.risks });
      if (res.data.organStress) setLiveStress(res.data.organStress);
      // Smooth scroll to results after simulation
      setTimeout(() => {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    try {
      if (!currentData || !currentInputs) return;
      await axios.post(`${API_BASE_URL}/api/reports`, {
        name: currentInputs.name || 'Anonymous',
        inputs: currentInputs,
        scores: { healthScore: currentData.healthScore, biologicalAge: currentData.biologicalAge },
        risks: currentData.risks,
        healthSummary: currentData.healthSummary,
        suggestions: currentData.suggestions || [],
        chartData: currentData.projections?.timeSeries || []
      });
      fetchReports();
      alert("Report saved to history.");
    } catch (e) {
       console.error("Failed to save", e);
    }
  };

  const loadReportFromHistory = (report) => {
    setCurrentInputs(report.inputs);
    setPreviewGender(report.inputs.gender);
    setLiveStress(report.risks?.organStress || null);
    setCurrentData({
      ...report.risks,
      healthScore: report.scores.healthScore,
      biologicalAge: report.scores.biologicalAge,
      healthSummary: report.healthSummary,
      suggestions: report.suggestions,
      projections: { timeSeries: report.chartData || [] },
      currentMetrics: { bmi: report.inputs.weight / Math.pow(report.inputs.height/100, 2) || 0 }
    });
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 font-sans">
      <Sidebar 
        reports={reports} 
        onSelectReport={(r) => { loadReportFromHistory(r); setIsSidebarOpen(false); }} 
        onNew={() => { setCurrentData(null); setCurrentInputs(null); setPreviewGender('Male'); setLiveStress(null); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="p-8 max-w-[1600px] mx-auto transition-all duration-300 relative">
        <header className="mb-10 flex items-end justify-between">
          <div className="flex items-start gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-slate-900/50 hover:bg-indigo-600/20 text-indigo-400 rounded-xl border border-white/5 transition-all active:scale-95 shadow-lg group"
            >
              <Menu size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Neural Diagnostic Suite</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                Digital <span className="text-indigo-500">Twin</span> Workspace
              </h1>
              <p className="text-slate-500 mt-2 text-sm max-w-lg">
                Advanced generative simulation of human physiology based on systemic metabolic inputs.
              </p>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Global Status</p>
                <p className="text-emerald-500 text-xs font-bold leading-none">{currentData ? 'Analysis Ready' : 'Awaiting Input'}</p>
             </div>
             <div className="w-10 h-10 rounded-full border border-white/5 bg-slate-900/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             </div>
          </div>
        </header>

        {/* Top Section: Intake and Simulator (Equal Height 760px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Left Card: Health Intake */}
          <div className="lg:col-span-4 h-[760px]">
            <InputForm 
              onSubmit={handleSimulate} 
              loading={loading} 
              onGenderChange={setPreviewGender} 
              onLiveUpdate={handleLiveUpdate}
            />
          </div>
          
          {/* Right Card: 3D Simulator */}
          <div className="lg:col-span-8 h-[760px] glass-panel rounded-2xl border border-white/5 overflow-hidden relative flex flex-col bg-slate-950/20">
            <div className="absolute top-6 left-6 z-20">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-xl">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Live Projection: {previewGender}</span>
              </div>
            </div>

            {/* Systemic Disruption Alert Overlay */}
            <AnimatePresence>
              {systemAlert && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-6 right-6 z-20 max-w-sm"
                >
                  <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/30 p-4 rounded-xl shadow-[0_0_30px_rgba(244,63,94,0.15)] overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 animate-pulse" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em]">Systemic Disruption Detected</span>
                         <span className="text-[8px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded uppercase">{systemAlert.type}</span>
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-tight leading-none">
                        Organ Impact: {systemAlert.organ}
                      </h3>
                      <p className="text-[10px] text-rose-200/70 font-medium leading-relaxed italic">
                        "{systemAlert.msg}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-h-0 relative">
              <ThreeBody organStress={currentData?.organStress || liveStress} gender={previewGender} />
            </div>

            {/* AI Health Summary Block */}
            <div className="p-6 pt-0 shrink-0">
               <div className="flex items-center gap-2 mb-4">
                  <Zap size={12} className="text-indigo-400 fill-indigo-400/20" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Health Assessment</span>
                  <div className="flex-1 h-[1px] bg-white/5"></div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-emerald-500 uppercase">Live Analysis</span>
                  </div>
               </div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-slate-900/40 p-5 rounded-xl border border-white/5 relative bg-gradient-to-br from-indigo-500/5 to-transparent min-h-[100px] flex items-center shadow-xl group hover:border-indigo-500/30 transition-all"
               >
                 <p className="text-[13px] text-slate-200 leading-relaxed font-medium italic group-hover:text-white transition-colors">
                   {currentData ? (
                     `"${currentData.healthSummary || "Simulation processed. View full report below for detailed analysis."}"`
                   ) : (
                     `"${generateLiveSummary(currentInputs)}"`
                   )}
                 </p>
               </motion.div>
            </div>
          </div>
        </div>

        {/* Lower Section: Reports, Analysis, Graphs (Scrollable) */}
        <div className="w-full space-y-12">
          <Results data={currentData} onSave={handleSaveReport} />
        </div>

        {/* Global Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-950/80 flex flex-col items-center justify-center backdrop-blur-3xl"
            >
              <div className="relative">
                <Loader2 size={64} className="text-indigo-500 animate-spin opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Activity size={32} className="text-indigo-400 animate-pulse" />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-black text-white tracking-widest uppercase">Initializing Twin</h2>
              <p className="text-slate-500 mt-2 text-xs font-bold tracking-widest uppercase animate-pulse">Running Neural Simulation...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
