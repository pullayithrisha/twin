import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Plus, FileText, Settings, ShieldCheck, X, Download } from 'lucide-react';

const Sidebar = ({ reports, onSelectReport, onDownloadReport, onNew, isOpen, onClose }) => {
  const groupReports = (reports) => {
    const groups = {
      Today: [],
      Yesterday: [],
      'Previous 7 Days': [],
      Older: []
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    reports.forEach(r => {
      const reportDate = new Date(r.date);
      if (reportDate >= today) groups.Today.push(r);
      else if (reportDate >= yesterday) groups.Yesterday.push(r);
      else if (reportDate >= lastWeek) groups['Previous 7 Days'].push(r);
      else groups.Older.push(r);
    });

    return groups;
  };

  const groupedReports = groupReports(reports);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60]"
          />

          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 w-80 h-screen glass-panel border-r border-white/5 flex flex-col z-[70] shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tighter text-white flex items-center gap-2 group cursor-pointer">
                <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/40">
                  <Activity size={18} className="text-white" />
                </div>
                <span>Neural<span className="text-indigo-500">History</span></span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
                title="Close Sidebar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 mb-4">
              <button 
                onClick={onNew}
                className="w-full flex items-center justify-start gap-3 bg-slate-900/50 hover:bg-slate-800 text-white p-3 rounded-xl border border-white/5 text-sm font-bold transition-all hover:border-indigo-500/30 group"
              >
                <div className="w-8 h-8 bg-indigo-600/10 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                   <Plus size={16} className="text-indigo-400 group-hover:text-white" />
                </div>
                New Simulation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-6 custom-scrollbar pb-10">
              {Object.entries(groupedReports).map(([label, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={label} className="space-y-1">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3 mt-4 px-2">
                       {label}
                    </div>
                    {items.map((r) => (
                      <div key={r._id} className="group relative">
                        <button 
                          onClick={() => onSelectReport(r)}
                          className="w-full text-left p-3 rounded-xl hover:bg-slate-900/80 border border-transparent transition-all flex items-center gap-3 pr-10"
                        >
                          <FileText size={14} className="text-slate-500 group-hover:text-indigo-400" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs text-slate-300 truncate group-hover:text-white">{r.name}</div>
                            <div className="text-[9px] text-slate-600 font-bold uppercase">{r.scores?.healthScore}% Health • {r.scores?.biologicalAge}yrs</div>
                          </div>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDownloadReport(r); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all"
                          title="Download PDF"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}

              {reports.length === 0 && (
                <div className="px-4 py-8 text-center bg-slate-900/20 rounded-2xl border border-dashed border-white/5 mt-10">
                  <Clock size={20} className="text-slate-800 mx-auto mb-2" />
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">No Simulations</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-white/5 mt-auto bg-slate-950/20">
              <div className="flex items-center gap-3 px-4 py-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                <ShieldCheck size={16} className="text-indigo-500" />
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Vault Secure</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate">Diagnostics are end-to-end encrypted.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
