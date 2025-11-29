export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum TransactionChannel {
  UPI = 'UPI',
  NET_BANKING = 'Net Banking',
  DEBIT_CARD = 'Debit Card',
  CREDIT_CARD = 'Credit Card',
  ATM = 'ATM',
  NEFT_RTGS = 'NEFT/RTGS'
}

export interface TransactionData {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  merchantCategory: string;
  channel: TransactionChannel;
  location: string; // e.g., "Mumbai, MH"
  time: string; // HH:MM
  date: string; // YYYY-MM-DD
  device: string; // e.g., "New Device (iPhone 14)"
}

export interface FraudAnalysisResult {
  fraudScore: number; // 0-100
  riskLevel: RiskLevel;
  reasons: string[];
  recommendation: string;
  geolocationRisk: boolean;
}

export interface HistoryItem extends TransactionData {
  analysis?: FraudAnalysisResult;
}

export interface UserProfile {
  name: string;
  role: 'Analyst' | 'Admin';
  lastLogin: string;
}