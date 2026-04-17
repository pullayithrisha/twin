import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Dna, Download } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkBg overflow-hidden">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          TwinHealth AI
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
        >
          Access Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black mb-6 text-white tracking-tight"
        >
          See Tomorrow's <br/>
          <span className="bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
            Health Today.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10"
        >
          TwinHealth AI creates a digital body twin that predicts health risks, visualizes organ impact, and provides personalized AI cures.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="flex gap-4 justify-center"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            Start Simulation <Activity size={20} />
          </button>
        </motion.div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden relative border-y border-white/5 py-4 bg-white/5 backdrop-blur-md">
          <div className="whitespace-nowrap animate-marquee flex gap-10 items-center text-emerald-400/80 font-medium tracking-wider">
            <span>PREDICT DISEASE EARLY</span> <span>•</span>
            <span>SIMULATE HABITS</span> <span>•</span>
            <span>IMPROVE ORGAN HEALTH</span> <span>•</span>
            <span>PREVENT FUTURE RISKS</span> <span>•</span>
            <span>AI-POWERED HEALTHCARE TWIN</span> <span>•</span>
            <span>PREDICT DISEASE EARLY</span> <span>•</span>
            <span>SIMULATE HABITS</span> <span>•</span>
            <span>IMPROVE ORGAN HEALTH</span> <span>•</span>
            <span>PREVENT FUTURE RISKS</span> <span>•</span>
            <span>AI-POWERED HEALTHCARE TWIN</span>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">A Revolutionary Approach</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">People cannot easily visualize how daily habits affect internal organs over time. Our solution makes the invisible visible.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Dna size={32} className="text-blue-400" />}
            title="3D Body Simulation"
            desc="Interactive 3D organ heatmap responding to your lifestyle."
          />
          <FeatureCard 
            icon={<Activity size={32} className="text-emerald-400" />}
             title="AI Risk Prediction"
            desc="Gemini-powered analysis of metabolic and cardiovascular risks."
          />
          <FeatureCard 
            icon={<Shield size={32} className="text-yellow-400" />}
             title="Personalized Cures"
            desc="Actionable AI suggestions to reverse aging and reduce risks."
          />
          <FeatureCard 
            icon={<Download size={32} className="text-purple-400" />}
             title="Report History"
            desc="Track progress with downloadable PDF reports and cloud saves."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-8 border-t border-slate-800 text-slate-500 mt-20">
        &copy; {new Date().getFullYear()} TwinHealth AI. Built for the Future.
      </footer>
      
      {/* Inline style for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 flex flex-col items-center text-center hover:border-blue-500/30 transition-colors"
  >
    <div className="bg-slate-800 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </motion.div>
);

export default LandingPage;
