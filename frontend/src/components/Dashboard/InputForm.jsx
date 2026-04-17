import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Zap, Flame, Target } from 'lucide-react';

const InputForm = ({ onSubmit, loading, onGenderChange, onLiveUpdate }) => {
  const [formData, setFormData] = useState({
    name: 'John Doe', age: 35, gender: 'Male', height: 175, weight: 80,
    bp: '120/80', sugar: 90, conditions: 'None',
    calories: 2500, sleep: 7, exercise: 3, steps: 8000, water: 2, stress: 3, smoking: 'No', alcohol: 'Low',
    junkFood: 'Medium', protein: 'Medium', sugarIntake: 'Medium', fruits: 'Low',
    medication: 'No', weightLossGoal: 'Maintain'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const val = isNaN(value) || value === '' ? value : Number(value);
      const newData = { ...prev, [name]: val };
      if (name === 'gender' && onGenderChange) onGenderChange(value);
      if (onLiveUpdate) onLiveUpdate(newData);
      return newData;
    });
  };

  const setGender = (g) => {
    const newData = { ...formData, gender: g };
    setFormData(newData);
    if (onGenderChange) onGenderChange(g);
    if (onLiveUpdate) onLiveUpdate(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col border border-white/5 shadow-2xl overflow-hidden bg-slate-950/40">
      {/* 1. Header: Fixed */}
      <div className="p-4 shrink-0 border-b border-white/5">
        <h2 className="text-lg font-bold text-white mb-0.5">Health Intake</h2>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Biometric Data Entry</p>
      </div>

      {/* 2. Scrollable Section: Flex-1 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        <form id="health-intake-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Biometrics */}
          <section>
            <Header icon={<User size={14} />} title="Biometrics" color="text-indigo-400" />
            <div className="mb-4">
              <label className="block text-[9px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest ml-1">Anatomical Model</label>
              <div className="flex p-1 bg-slate-900/50 rounded-xl border border-white/5 gap-1">
                <button 
                  type="button"
                  onClick={() => setGender('Male')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${formData.gender === 'Male' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  MALE
                </button>
                <button 
                  type="button"
                  onClick={() => setGender('Female')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${formData.gender === 'Female' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  FEMALE
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Name" name="name" val={formData.name} onChange={handleChange} type="text" />
              <Input label="Age (Years)" name="age" val={formData.age} onChange={handleChange} />
              <Input label="Height (cm)" name="height" val={formData.height} onChange={handleChange} />
              <Input label="Weight (kg)" name="weight" val={formData.weight} onChange={handleChange} />
              <Input label="Blood Pressure" name="bp" val={formData.bp} onChange={handleChange} type="text" placeholder="120/80" />
              <Input label="Fasting Blood Sugar" name="sugar" val={formData.sugar} onChange={handleChange} />
            </div>
          </section>

          {/* Lifestyle */}
          <section>
            <Header icon={<Zap size={14} />} title="Lifestyle & Activity" color="text-amber-400" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Daily Calories" name="calories" val={formData.calories} onChange={handleChange} />
              <Input label="Sleep (Hrs)" name="sleep" val={formData.sleep} onChange={handleChange} />
              <Input label="Exercise (Days/Wk)" name="exercise" val={formData.exercise} onChange={handleChange} />
              <Input label="Steps/Day" name="steps" val={formData.steps} onChange={handleChange} />
              <Input label="Hydration (L/Day)" name="water" val={formData.water} onChange={handleChange} />
              <Slider label={`Stress Level: ${formData.stress}`} name="stress" val={formData.stress} min="1" max="10" onChange={handleChange} />
            </div>
          </section>

          {/* Nutrition */}
          <section>
            <Header icon={<Flame size={14} />} title="Habits & Nutrition" color="text-rose-400" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Smoking" name="smoking" val={formData.smoking} options={['No', 'Yes']} onChange={handleChange} />
              <Select label="Alcohol" name="alcohol" val={formData.alcohol} options={['None', 'Low', 'High']} onChange={handleChange} />
              <Select label="Junk Food" name="junkFood" val={formData.junkFood} options={['Low', 'Medium', 'High']} onChange={handleChange} />
              <Select label="Sugar Intake" name="sugarIntake" val={formData.sugarIntake} options={['Low', 'Medium', 'High']} onChange={handleChange} />
              <Select label="Environment" name="environment" val={formData.environment || 'Urban'} options={['Urban', 'Rural', 'Industrial']} onChange={handleChange} />
            </div>
          </section>

          <section>
            <Header icon={<Target size={14} />} title="Simulation Goal" color="text-cyan-400" />
            <Select label="Primary Goal" name="weightLossGoal" val={formData.weightLossGoal} options={['Lose Weight', 'Maintain', 'Gain Muscle']} onChange={handleChange} />
          </section>
        </form>
      </div>

      {/* 3. Footer Button: Fixed */}
      <div className="p-4 shrink-0 border-t border-white/5 bg-slate-900/20">
        <button 
          type="submit" 
          form="health-intake-form"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-xs py-3.5 rounded-xl shadow-xl shadow-indigo-500/20 flex justify-center items-center gap-2 transition-all active:scale-[0.98] uppercase tracking-widest border border-white/10"
        >
          {loading ? 'Processing...' : (
            <>Start Simulator <Send size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
};

const Header = ({ icon, title, color }) => (
  <div className={`flex items-center gap-2 mb-4 ${color} opacity-80`}>
    {icon}
    <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    <div className="flex-1 h-[1px] bg-current opacity-20 ml-2"></div>
  </div>
);

const Input = ({ label, name, val, onChange, type="number", placeholder="" }) => (
  <div className="relative group">
    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-400 uppercase tracking-tighter">
      {label}
    </label>
    <input 
      type={type} 
      name={name} 
      value={val} 
      onChange={onChange}
      placeholder={placeholder}
      className="neo-input w-full" 
      required 
    />
  </div>
);

const Select = ({ label, name, val, options, onChange }) => (
  <div className="relative group">
    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-400 uppercase tracking-tighter">
      {label}
    </label>
    <select 
      name={name} 
      value={val} 
      onChange={onChange} 
      className="neo-input w-full appearance-none cursor-pointer"
    >
      {options.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
    </select>
  </div>
);

const Slider = ({ label, name, val, min, max, onChange }) => (
  <div className="relative group col-span-2">
    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-tighter">
      {label}
    </label>
    <input 
      type="range" 
      name={name} 
      value={val} 
      min={min} 
      max={max} 
      onChange={onChange}
      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
    />
  </div>
);

export default InputForm;
