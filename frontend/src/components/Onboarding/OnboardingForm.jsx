import React, { useState } from 'react';
import useTwinStore from '../../store/useTwinStore';
import { ChevronRight } from 'lucide-react';

const OnboardingForm = ({ onComplete }) => {
  const { biometrics, lifestyle, setBiometrics, setLifestyle } = useTwinStore();
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBioChange = (e) => {
    const { name, value } = e.target;
    setBiometrics({ [name]: name === 'gender' ? value : Number(value) || value });
  };

  const handleLifeChange = (e) => {
    const { name, value } = e.target;
    setLifestyle({ [name]: name === 'smoking' || name === 'alcohol' ? value : Number(value) });
  };

  return (
    <div className="glass-card max-w-lg w-full p-8 text-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Create Your Digital Twin
        </h2>
        <p className="text-slate-400 text-sm mt-1">Step {step} of 3</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-700 h-1 mt-4 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={handleNext}>
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="font-semibold text-lg border-b border-slate-700 pb-2 mb-4">Basic Biometrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Age</label>
                <input type="number" name="age" value={biometrics.age} onChange={handleBioChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Gender</label>
                <select name="gender" value={biometrics.gender} onChange={handleBioChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Height (cm)</label>
                <input type="number" name="height" value={biometrics.height} onChange={handleBioChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={biometrics.weight} onChange={handleBioChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="font-semibold text-lg border-b border-slate-700 pb-2 mb-4">Current Lifestyle</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Daily Calories</label>
              <input type="number" name="calories" value={lifestyle.calories} onChange={handleLifeChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Exercise (Days/Week)</label>
              <input type="number" name="exercise" max="7" min="0" value={lifestyle.exercise} onChange={handleLifeChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Average Sleep (Hours)</label>
              <input type="number" name="sleep" max="24" min="0" value={lifestyle.sleep} onChange={handleLifeChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500" required />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="font-semibold text-lg border-b border-slate-700 pb-2 mb-4">Habits & Vitals</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Do you smoke?</label>
              <select name="smoking" value={lifestyle.smoking} onChange={handleLifeChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Alcohol Consumption</label>
              <select name="alcohol" value={lifestyle.alcohol} onChange={handleLifeChange} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white outline-none focus:border-blue-500">
                <option>None</option>
                <option>Occasional</option>
                <option>Frequent</option>
              </select>
            </div>
            <div className="mt-6 bg-slate-800/50 p-4 rounded border border-blue-500/30">
              <p className="text-xs text-blue-300">
                By clicking "Generate", AI will simulate your biological age and forecast the long-term impact on your organ health.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-blue-900/50"
          >
            {step === 3 ? 'Generate Twin' : 'Next'} <ChevronRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;
