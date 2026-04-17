import React from 'react';
import useTwinStore from '../../store/useTwinStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { HeartPulse, Activity } from 'lucide-react';

const AnalyticsPanel = () => {
  const { predictions } = useTwinStore();

  if (!predictions) return null;

  const { healthScore, biologicalAge, projections, risks } = predictions;
  const timeSeries = projections?.timeSeries || [];

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Top Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
          <span className="text-slate-400 text-xs mb-1">Health Score</span>
          <span className={`text-4xl font-bold ${healthScore > 75 ? 'text-green-400' : healthScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {healthScore}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">out of 100</span>
        </div>
        
        <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
          <span className="text-slate-400 text-xs mb-1">Biological Age</span>
          <span className="text-4xl font-bold text-blue-400">
            {biologicalAge}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Years old</span>
        </div>
      </div>

      {/* Weight Progression Chart */}
      <div className="glass-card p-4 flex-1">
        <h3 className="text-sm font-semibold mb-4 text-slate-300">10-Year Weight Trajectory</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeries}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Scores */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-4 text-slate-300">Key Risks (%)</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Cardiovascular</span>
              <span className={risks.heartDisease > 70 ? 'text-red-400' : 'text-slate-300'}>{risks.heartDisease}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${risks.heartDisease > 70 ? 'bg-red-500' : risks.heartDisease > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${risks.heartDisease}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Type 2 Diabetes</span>
              <span className={risks.diabetes > 70 ? 'text-red-400' : 'text-slate-300'}>{risks.diabetes}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${risks.diabetes > 70 ? 'bg-red-500' : risks.diabetes > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${risks.diabetes}%` }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsPanel;
