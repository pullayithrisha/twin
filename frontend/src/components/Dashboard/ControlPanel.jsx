import React, { useEffect } from 'react';
import useTwinStore from '../../store/useTwinStore';
import { Activity, Moon, Cigarette, Flame } from 'lucide-react';

const ControlPanel = () => {
  const { lifestyle, setLifestyle, fetchPredictions, loading } = useTwinStore();

  // Debounce the API call using a simple timeout when lifestyle changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPredictions();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [lifestyle, fetchPredictions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === 'checkbox' ? (checked ? 'Yes' : 'No') : Number(value);
    setLifestyle({ [name]: parsedValue });
  };

  return (
    <div className="glass-card p-6 h-full">
      <h2 className="text-xl font-semibold mb-6 border-b border-slate-700 pb-2">What-If Simulator</h2>
      
      <div className="space-y-6">
        {/* Calories Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <Flame size={16} className="text-orange-500" />
              Daily Calories
            </label>
            <span className="font-mono text-orange-400">{lifestyle.calories} kcal</span>
          </div>
          <input 
            type="range" 
            name="calories" 
            min="1200" max="4500" step="100" 
            value={lifestyle.calories} 
            onChange={handleChange} 
          />
        </div>

        {/* Exercise Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <Activity size={16} className="text-emerald-500" />
              Exercise (Days/wk)
            </label>
            <span className="font-mono text-emerald-400">{lifestyle.exercise} days</span>
          </div>
          <input 
            type="range" 
            name="exercise" 
            min="0" max="7" step="1" 
            value={lifestyle.exercise} 
            onChange={handleChange} 
          />
        </div>

        {/* Sleep Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <Moon size={16} className="text-blue-500" />
              Sleep
            </label>
            <span className="font-mono text-blue-400">{lifestyle.sleep} hours</span>
          </div>
          <input 
            type="range" 
            name="sleep" 
            min="3" max="12" step="0.5" 
            value={lifestyle.sleep} 
            onChange={handleChange} 
          />
        </div>

        {/* Smoking Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <label className="flex items-center gap-2 text-sm">
            <Cigarette size={16} className="text-slate-400" />
            Smoker
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="smoking" 
              className="sr-only peer" 
              checked={lifestyle.smoking === 'Yes' ? true : false} 
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>
        
        {loading && (
          <div className="text-xs text-center text-slate-400 mt-4 animate-pulse">
            Simulating outcomes...
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
