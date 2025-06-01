// Portföy Tipleri
import { StockPrediction, CurrencyPrediction, CommodityPrediction } from '../types';

export interface PortfolioAsset {
  id: string;
  assetType: 'stock' | 'currency' | 'commodity' | 'crypto';
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  allocationPercentage: number;
  predictedValue: number;
  expectedROI: number;
  riskScore: number;  // 1-10 arasında değer (1: en düşük risk, 10: en yüksek risk)
  recommendedAction: 'buy' | 'sell' | 'hold';
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvestment: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  dailyChange: number;
  dailyChangePercentage: number;
  weeklyChange: number;
  weeklyChangePercentage: number;
  monthlyChange: number;
  monthlyChangePercentage: number;
  expectedROI: number;
  riskScore: number;
  lastUpdated: string;
}

export interface AssetAllocation {
  assetType: string;
  value: number;
  percentage: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
}

export interface GeographicAllocation {
  region: string;
  value: number;
  percentage: number;
}

export interface PortfolioAnalysis {
  summary: PortfolioSummary;
  assets: PortfolioAsset[];
  assetAllocation: AssetAllocation[];
  sectorAllocation: SectorAllocation[];
  geographicAllocation: GeographicAllocation[];
  performanceHistory: {
    dates: string[];
    values: number[];
  };
  riskAnalysis: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    diversificationScore: number;  // 1-10 arasında değer (10: mükemmel çeşitlendirme)
  };
  recommendations: {
    summary: string;
    actions: {
      assetId: string;
      action: 'buy' | 'sell' | 'hold';
      reasoning: string;
    }[];
  };
}