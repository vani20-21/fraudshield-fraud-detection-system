import React from 'react';
import { RiskLevel } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  const config = {
    [RiskLevel.LOW]: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <ShieldCheck className="w-4 h-4 mr-1.5" />
    },
    [RiskLevel.MEDIUM]: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <AlertTriangle className="w-4 h-4 mr-1.5" />
    },
    [RiskLevel.HIGH]: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <ShieldAlert className="w-4 h-4 mr-1.5" />
    }
  };

  const style = config[level];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${style.color} ${className}`}>
      {style.icon}
      {level.toUpperCase()} RISK
    </span>
  );
};