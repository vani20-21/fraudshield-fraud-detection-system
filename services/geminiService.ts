import { GoogleGenAI, Type } from "@google/genai";
import { TransactionData, FraudAnalysisResult, RiskLevel } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTransaction = async (
  transaction: TransactionData
): Promise<FraudAnalysisResult> => {
  
  const prompt = `
    Act as a senior Fraud Analyst for a top Indian Bank (like HDFC or SBI).
    Analyze this transaction for fraud risk.

    Transaction Data:
    - Customer ID: ${transaction.userId}
    - Amount: ₹${transaction.amount}
    - Method: ${transaction.channel}
    - Merchant/Receiver: ${transaction.merchantCategory}
    - Location: ${transaction.location}
    - Device: ${transaction.device}
    - Time: ${transaction.time} (${transaction.date})

    Specific Indian Banking Fraud Rules:
    1. **UPI Scams**: High frequency small transactions or sudden large transfers to unknown VPAs.
    2. **KYC Fraud**: Transactions related to "Account Update" or "KYC Renewal" via unofficial channels.
    3. **Midnight Activity**: High value transfers between 11 PM - 5 AM are suspicious unless historic pattern exists.
    4. **Location Mismatch**: Transaction from a city far from user's base (assume base is Mumbai if not specified) without travel flags.
    5. **New Device**: High value + New Device is CRITICAL risk.
    6. **Merchant Categories**: High risk -> Crypto P2P, Online Gaming, Offshore Forex, Jewelry.

    Return JSON matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fraudScore: {
              type: Type.INTEGER,
              description: "0-100 probability. >75 is High Risk.",
            },
            riskLevel: {
              type: Type.STRING,
              enum: [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH],
            },
            reasons: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 bullet points explaining the score.",
            },
            recommendation: {
              type: Type.STRING,
              description: "Immediate action: Block, Call Customer, or Approve.",
            },
            geolocationRisk: {
              type: Type.BOOLEAN,
              description: "True if location looks suspicious.",
            }
          },
          required: ["fraudScore", "riskLevel", "reasons", "recommendation", "geolocationRisk"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as FraudAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      fraudScore: 0,
      riskLevel: RiskLevel.LOW,
      reasons: ["AI Connectivity Error - Manual Review Advised"],
      recommendation: "Check network and retry.",
      geolocationRisk: false
    };
  }
};