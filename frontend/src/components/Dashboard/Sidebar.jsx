import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Plus, FileText, Settings, ShieldCheck, X } from 'lucide-react';

const Sidebar = ({ reports, onSelectReport, onNew, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Drawer */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 w-72 h-screen glass-panel border-r border-white/5 flex flex-col z-[70] shadow-2xl"
          >
            <div className="p-8 flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group cursor-pointer">
                <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/40">
                  <Activity size={20} className="text-white" />
                </div>
                <span>Twin<span className="text-indigo-500">Health</span></span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 mb-6">
              <button 
                onClick={onNew}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <Plus size={18} /> New Simulation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-1 custom-scrollbar">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-6 px-1">
                Simulation History
              </div>
              
              {reports.length === 0 ? (
                <div className="px-4 py-8 text-center bg-slate-900/40 rounded-2xl border border-white/5">
                  <Clock size={20} className="text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-xs">No history yet.</p>
                </div>
              ) : (
                reports.map((r) => (
                  <button 
                    key={r._id}
                    onClick={() => onSelectReport(r)}
                    className="w-full text-left p-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all flex items-center gap-3 group"
                  >
                    <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                      <FileText size={14} className="text-slate-400 group-hover:text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-200 truncate">{r.name}</div>
                      <div className="text-[10px] text-slate-500">{new Date(r.date).toLocaleDateString()}</div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/5 mt-auto">
              <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
                  <ShieldCheck size={14} /> System Secure
                </div>
                <p className="text-[10px] text-indigo-300/60 leading-tight">AI Analysis engine is currently active and processing.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
