import React, { useState } from 'react';
import { TransactionChannel, TransactionData } from '../types';
import { Smartphone, MapPin, Clock, Briefcase, CreditCard, User, IndianRupee } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<TransactionData>>({
    userId: 'CUST-884210',
    amount: 5000,
    merchantCategory: 'Retail',
    channel: TransactionChannel.UPI,
    location: 'Mumbai, MH',
    device: 'Registered Device (OnePlus 9)',
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.userId) {
      onSubmit({
        ...formData,
        currency: 'INR',
        id: Math.random().toString(36).substr(2, 9),
      } as TransactionData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User ID */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer ID</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="userId"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-500"
              value={formData.userId}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount (INR)</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
            <input
              type="number"
              name="amount"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 placeholder-slate-500 font-mono"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Channel */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment Mode</label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <select
              name="channel"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={formData.channel}
              onChange={handleChange}
            >
              {Object.values(TransactionChannel).map(ch => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Merchant */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Beneficiary / Merchant</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="merchantCategory"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={formData.merchantCategory}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Location */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="location"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Time */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="time"
              name="time"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full relative overflow-hidden group py-3 px-4 rounded-lg shadow-lg text-sm font-bold text-slate-900 tracking-wide transition-all ${
          isLoading 
            ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-yellow-500/20'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 border-2 border-slate-900/50 border-t-transparent rounded-full animate-spin"></span>
            ANALYZING...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            INITIATE SCAN
          </span>
        )}
      </button>
    </form>
  );
};