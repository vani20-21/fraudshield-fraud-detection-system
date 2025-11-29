import React, { useEffect, useState } from 'react';
import { AlertOctagon, X, Lock, ShieldAlert } from 'lucide-react';
import { FraudAnalysisResult, RiskLevel } from '../types';

interface AlertModalProps {
  result: FraudAnalysisResult | null;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ result, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (result && result.riskLevel === RiskLevel.HIGH) {
      setIsOpen(true);
    }
  }, [result]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={handleClose}></div>
      <div className="relative bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full border border-red-500/50 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-red-500/10 p-6 border-b border-red-500/20 flex items-start justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-full animate-pulse-slow">
                  <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <div>
                  <h2 className="text-2xl font-tech font-bold text-white tracking-wide">CRITICAL ALERT</h2>
                  <p className="text-red-400 text-sm font-medium">Transaction flagged as High Severity Fraud</p>
              </div>
           </div>
           <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
           </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
             <div className="text-slate-400 text-sm">Threat Score</div>
             <div className="text-3xl font-bold font-tech text-red-500">{result.fraudScore}/100</div>
          </div>

          <div className="space-y-3">
             <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Detected Anomalies</h3>
             <ul className="space-y-2">
                {result.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                        <span className="text-red-500 mr-2">●</span> {reason}
                    </li>
                ))}
             </ul>
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20 flex gap-3">
             <Lock className="w-5 h-5 text-blue-400 shrink-0" />
             <p className="text-xs text-blue-200">
                System has auto-frozen this transaction ID. Analyst override required to proceed.
             </p>
          </div>
        </div>

        <div className="bg-slate-900/80 px-6 py-4 flex justify-end gap-3 border-t border-slate-700">
            <button 
                onClick={handleClose}
                className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
            >
                Investigate Later
            </button>
            <button 
                onClick={handleClose}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 transition-all"
            >
                BLOCK PERMANENTLY
            </button>
        </div>
      </div>
    </div>
  );
};