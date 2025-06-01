import { TrendDirection } from '../types';

export const calculateROI = (currentValue: number, predictedValue: number): number => {
  return ((predictedValue - currentValue) / currentValue) * 100;
};

export const calculateConfidenceLevel = (confidence: number): 'low' | 'medium' | 'high' | 'very_high' => {
  if (confidence >= 90) return 'very_high';
  if (confidence >= 75) return 'high';
  if (confidence >= 50) return 'medium';
  return 'low';
};

export const getTrendDirection = (currentValue: number, predictedValue: number): TrendDirection => {
  const percentChange = ((predictedValue - currentValue) / currentValue) * 100;
  
  if (percentChange > 1) return 'up';
  if (percentChange < -1) return 'down';
  return 'stable';
};

export const getRecommendedAction = (
  trendDirection: TrendDirection, 
  confidence: number
): 'buy' | 'sell' | 'hold' => {
  if (trendDirection === 'up' && confidence >= 75) return 'buy';
  if (trendDirection === 'down' && confidence >= 75) return 'sell';
  return 'hold';
};

export const generateForecastData = (
  currentData: number[],
  trend: TrendDirection,
  volatility: number = 0.02
): number[] => {
  const lastValue = currentData[currentData.length - 1];
  const forecastData: number[] = [];
  
  let currentValue = lastValue;
  
  for (let i = 0; i < 7; i++) {
    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
    
    if (trend === 'up') {
      currentValue = currentValue * (1 + volatility * randomFactor);
    } else if (trend === 'down') {
      currentValue = currentValue * (1 - volatility * randomFactor);
    } else {
      currentValue = currentValue * randomFactor;
    }
    
    forecastData.push(parseFloat(currentValue.toFixed(2)));
  }
  
  return forecastData;
};