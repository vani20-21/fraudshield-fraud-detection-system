import React, { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { AnalysisResult } from './components/AnalysisResult';
import { AlertModal } from './components/AlertModal';
import { HistoryItem, TransactionData, RiskLevel, UserProfile } from './types';
import { analyzeTransaction } from './services/geminiService';
import { Shield, LayoutDashboard, History, Bell, LogOut, CheckCircle, Database } from 'lucide-react';
import { RiskBadge } from './components/RiskBadge';
import { NeuralNetwork3D } from './components/NeuralNetwork3D';

const App: React.FC = () => {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>({ name: 'Admin User', role: 'Admin', lastLogin: new Date().toLocaleString() });
  
  // App State
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<HistoryItem | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleAnalysis = async (data: TransactionData) => {
    setLoading(true);
    setCurrentAnalysis(null);

    const analysis = await analyzeTransaction(data);

    const newItem: HistoryItem = {
      ...data,
      analysis: analysis
    };

    setHistory(prev => [newItem, ...prev]);
    setCurrentAnalysis(newItem);
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <NeuralNetwork3D />
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl">
            <div className="flex justify-center mb-6">
               <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg border border-blue-400/30">
                  <Shield className="h-8 w-8 text-white" />
               </div>
            </div>
            <h1 className="text-3xl font-tech font-bold text-center text-white mb-2 tracking-wider">FRAUD<span className="text-blue-500">SHIELD</span> 3D</h1>
            <p className="text-center text-slate-400 text-sm mb-8">Secure Access Portal | Indian Banking Network</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Employee ID</label>
                <input type="text" defaultValue="ADMIN_001" className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Secure Key</label>
                <input type="password" defaultValue="password" className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-600/30 mt-4">
                AUTHENTICATE
              </button>
            </form>
            <div className="mt-6 flex justify-center gap-4 text-xs text-slate-500">
               <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> 256-bit Encryption</span>
               <span className="flex items-center"><Database className="w-3 h-3 mr-1" /> Secure Gateway</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 relative">
      <NeuralNetwork3D />
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg shadow-blue-900/20 shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-tech font-bold text-xl tracking-wide text-white">FRAUD<span className="text-blue-500">SHIELD</span></span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-right">
                <div className="text-xs text-slate-400">Logged in as</div>
                <div className="text-sm font-semibold text-white">{user.name}</div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-6">
             <div className="glass-panel rounded-xl p-6 shadow-xl border-t border-blue-500/20">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4">
                    <LayoutDashboard className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-bold font-tech text-white">TRANSACTION SCANNER</h2>
                </div>
                <TransactionForm onSubmit={handleAnalysis} isLoading={loading} />
             </div>

             {/* Live Feed */}
             <div className="glass-panel rounded-xl overflow-hidden hidden lg:block border border-slate-700/50">
                <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
                    <h3 className="font-semibold font-tech text-slate-300 flex items-center gap-2">
                        <History className="w-4 h-4 text-yellow-500" /> LIVE MONITOR
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                       <span className="text-xs text-slate-500">Connected</span>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[350px]">
                    <table className="min-w-full divide-y divide-slate-700/50">
                        <thead className="bg-slate-800/50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Details</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {history.length === 0 ? (
                                <tr>
                                   <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm">
                                      Waiting for transaction stream...
                                   </td>
                                </tr>
                            ) : (
                                history.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-3 whitespace-nowrap text-xs font-mono text-slate-300">
                                            {item.time}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="text-xs text-white font-medium">₹{item.amount.toLocaleString()}</div>
                                            <div className="text-[10px] text-slate-400">{item.channel}</div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-right">
                                            {item.analysis && <RiskBadge level={item.analysis.riskLevel} />}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
          </div>

          {/* Right Column: Results & Viz */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {currentAnalysis && currentAnalysis.analysis ? (
                <div className="h-full animate-in fade-in slide-in-from-right-8 duration-500">
                    <AnalysisResult result={currentAnalysis.analysis} />
                </div>
            ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center glass-panel rounded-xl border border-dashed border-slate-700 p-8 text-center">
                    <div className="bg-slate-800/80 p-6 rounded-full shadow-inner mb-6 animate-pulse-slow">
                        <Shield className="w-16 h-16 text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-tech font-medium text-white mb-2">System Ready</h3>
                    <p className="text-slate-400 max-w-sm">
                        Waiting for transaction data input. <br/>
                        The neural engine is online and monitoring.
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>

      {/* High Risk Popup Modal */}
      {currentAnalysis && (
        <AlertModal 
            result={currentAnalysis.analysis || null} 
            onClose={() => setCurrentAnalysis({ ...currentAnalysis, analysis: { ...currentAnalysis.analysis!, riskLevel: RiskLevel.MEDIUM } } as HistoryItem)} 
        />
      )}
    </div>
  );
};

export default App;