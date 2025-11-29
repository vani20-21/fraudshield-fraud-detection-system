import React from 'react';
import { FraudAnalysisResult, RiskLevel } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle, Fingerprint, MapPin, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalysisResultProps {
  result: FraudAnalysisResult;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const data = [
    { name: 'Risk', value: result.fraudScore },
    { name: 'Safe', value: 100 - result.fraudScore },
  ];

  const getColor = (score: number) => {
    if (score < 30) return '#10b981'; // Green
    if (score < 75) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  const chartColor = getColor(result.fraudScore);
  
  // Determine gradient for background based on risk
  const bgGradient = result.riskLevel === RiskLevel.HIGH 
    ? 'bg-gradient-to-br from-red-900/20 to-slate-900' 
    : 'bg-gradient-to-br from-slate-800 to-slate-900';

  return (
    <div className={`rounded-xl border border-slate-700 overflow-hidden h-full flex flex-col ${bgGradient} backdrop-blur-sm`}>
      <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
        <h3 className="font-tech text-xl text-slate-100 flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-blue-400" />
          AI FORENSIC REPORT
        </h3>
        <span className="text-xs font-mono text-slate-400">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-8">
        
        {/* Score Visualization */}
        <div className="flex items-center justify-center relative h-56">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                startAngle={180}
                endAngle={0}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                <Cell key="risk" fill={chartColor} />
                <Cell key="safe" fill="#334155" />
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
            <span className={`text-5xl font-bold font-tech ${result.fraudScore > 75 ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-slate-100'}`}>
              {result.fraudScore}%
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-[0.2em] mt-1">Fraud Prob.</span>
          </div>
        </div>

        {/* Analysis Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Risk Indicators</h4>
            {result.geolocationRisk && (
              <span className="flex items-center text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded border border-orange-400/20">
                <MapPin className="w-3 h-3 mr-1" /> Geo-Mismatch
              </span>
            )}
          </div>
          
          <div className="grid gap-3">
            {result.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start bg-slate-800/50 p-3 rounded border border-slate-700/50 hover:border-slate-600 transition-colors">
                <Activity className="w-4 h-4 text-blue-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-auto pt-6 border-t border-slate-700/50">
          <div className={`p-4 rounded-lg border ${result.riskLevel === RiskLevel.HIGH ? 'bg-red-500/10 border-red-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
            <p className="text-sm font-medium text-slate-200">
              <span className="block text-xs uppercase tracking-wider opacity-70 mb-1">Recommended Action</span>
              {result.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};