export type TrendDirection = 'up' | 'down' | 'stable';
export type RecommendedAction = 'buy' | 'sell' | 'hold';
export type TimeFrame = '1d' | '1w' | '1m' | '3m' | '6m' | '1y';
export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'very_high';

export interface BasePrediction {
    id: string;
    currentValue: number;
    predictedValue: number;
    percentageChange: number;
    trend: TrendDirection;
    recommendedAction: RecommendedAction;
    confidence: number; // 0-100
    confidenceLevel: ConfidenceLevel;
    timeFrame: string;
    lastUpdated: string;
    historicalData: number[];
    historicalDates: string[];
    forecastData: number[];
    forecastDates: string[];
    expectedROI: number; // Add this property
}

export interface CurrencyPrediction extends BasePrediction {
    fromCurrency: string;
    toCurrency: string;
    pairName: string;
    fromFlag: string;
    toFlag: string;
}

export interface CommodityPrediction extends BasePrediction {
    name: string;
    symbol: string;
    category: string;
    unit: string;
    iconUrl: string;
}

export interface StockPrediction extends BasePrediction {
    ticker: string;
    name: string;
    sector: string;
    exchange: string;
    logoUrl: string;
}

// News types
export interface NewsSource {
    id: string;
    name: string;
    reliability: number; // 0-100
    logoUrl: string;
    category: string;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    content: string;
    source: NewsSource;
    publishedAt: string;
    url: string;
    imageUrl: string;
    category: string;
    topics: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    impactLevel: 'high' | 'medium' | 'low';
    relatedAssets: string[];
}

// User types
export interface Portfolio {
    id: string;
    name: string;
    assets: PortfolioAsset[];
    totalValue: number;
    performance: number;
    createdAt: string;
    lastUpdated: string;
}

export interface PortfolioAsset {
    id: string;
    type: 'currency' | 'commodity' | 'stock';
    name: string;
    symbol: string;
    amount: number;
    value: number;
    purchasePrice: number;
    currentPrice: number;
    performance: number;
    purchaseDate: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    portfolios: Portfolio[];
    preferredCurrency: string;
    riskTolerance: 'low' | 'medium' | 'high';
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
}

// App settings
export interface AppSettings {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notificationsEnabled: boolean;
    analyticsEnabled: boolean;
}