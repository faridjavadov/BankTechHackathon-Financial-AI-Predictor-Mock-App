// src/screens/PredictionDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { currencyPredictions } from '../data/mockCurrencies';
import { commodityPredictions } from '../data/mockCommodities';
import { stockPredictions } from '../data/mockStocks';
import { formatCurrency } from '../utils/numberFormatter';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BasePrediction, CurrencyPrediction, CommodityPrediction, StockPrediction } from '../types';

type PredictionDetailRouteProp = RouteProp<RootStackParamList, 'PredictionDetail'>;

const PredictionDetailScreen: React.FC = () => {
  const route = useRoute<PredictionDetailRouteProp>();
  const { id, type } = route.params;
  const [prediction, setPrediction] = useState<BasePrediction | null>(null);
  const [currencyPrediction, setCurrencyPrediction] = useState<CurrencyPrediction | null>(null);
  const [commodityPrediction, setCommodityPrediction] = useState<CommodityPrediction | null>(null);
  const [stockPrediction, setStockPrediction] = useState<StockPrediction | null>(null);

  useEffect(() => {
    // Find the prediction based on type and id
    if (type === 'currency') {
      const found = currencyPredictions.find(item => item.id === id);
      if (found) {
        setPrediction(found);
        setCurrencyPrediction(found);
      }
    } else if (type === 'commodity') {
      const found = commodityPredictions.find(item => item.id === id);
      if (found) {
        setPrediction(found);
        setCommodityPrediction(found);
      }
    } else if (type === 'stock') {
      const found = stockPredictions.find(item => item.id === id);
      if (found) {
        setPrediction(found);
        setStockPrediction(found);
      }
    }
  }, [id, type]);

  if (!prediction) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const isPositive = prediction.trend === 'up';
  const chartData = [...prediction.historicalData, ...prediction.forecastData];
  const allDates = [...prediction.historicalDates, ...prediction.forecastDates];
  
  // Format dates for display
  const formattedDates = allDates.map(date => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });
  
  // Find divider index between historical and forecast data
  const dividerIndex = prediction.historicalData.length;

  const getNameBasedOnType = (): string => {
    if (type === 'currency' && currencyPrediction) {
      return currencyPrediction.pairName;
    } else if (type === 'commodity' && commodityPrediction) {
      return commodityPrediction.name;
    } else if (type === 'stock' && stockPrediction) {
      return `${stockPrediction.ticker} - ${stockPrediction.name}`;
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{getNameBasedOnType()}</Text>
          
          <View style={[
            styles.trendBadge, 
            {backgroundColor: isPositive ? `${Colors.success}15` : `${Colors.danger}15`}
          ]}>
            <Ionicons 
              name={isPositive ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={isPositive ? Colors.success : Colors.danger} 
            />
            <Text style={[
              styles.trendText, 
              {color: isPositive ? Colors.success : Colors.danger}
            ]}>
              {isPositive ? '+' : ''}{prediction.percentageChange.toFixed(2)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: formattedDates,
              datasets: [{
                data: chartData
              }]
            }}
            width={380}
            height={220}
            chartConfig={{
              backgroundColor: Colors.background,
              backgroundGradientFrom: Colors.background,
              backgroundGradientTo: Colors.background,
              decimalPlaces: 2,
              color: (opacity = 1) => isPositive ? `rgba(46, 204, 113, ${opacity})` : `rgba(231, 76, 60, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: Colors.background
              }
            }}
            bezier
            style={styles.chart}
          />
          
          <View style={[styles.divider, { left: `${(dividerIndex / chartData.length) * 100}%` }]}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLabel}>
              <Text style={styles.dividerText}>Forecast</Text>
            </View>
            <View style={styles.dividerLine} />
          </View>
        </View>
        
        <View style={styles.predictionDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Current Value</Text>
              <Text style={styles.detailValue}>{formatCurrency(prediction.currentValue, 'USD')}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Predicted Value</Text>
              <Text style={[
                styles.detailValue, 
                {color: isPositive ? Colors.success : Colors.danger}
              ]}>
                {formatCurrency(prediction.predictedValue, 'USD')}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Confidence</Text>
              <View style={styles.confidenceContainer}>
                <View style={styles.confidenceBarBg}>
                  <View 
                    style={[
                      styles.confidenceBar, 
                      { 
                        width: `${prediction.confidence}%`,
                        backgroundColor: getConfidenceColor(prediction.confidence)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.confidenceText}>{prediction.confidence}%</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Expected ROI</Text>
              <Text style={[
                styles.detailValue, 
                {color: prediction.expectedROI >= 0 ? Colors.success : Colors.danger}
              ]}>
                {prediction.expectedROI >= 0 ? '+' : ''}{prediction.expectedROI.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Recommendation</Text>
          
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <View style={[
                styles.actionBadge, 
                {
                  backgroundColor: 
                    prediction.recommendedAction === 'buy' ? `${Colors.success}15` : 
                    prediction.recommendedAction === 'sell' ? `${Colors.danger}15` : 
                    `${Colors.warning}15`
                }
              ]}>
                <Ionicons 
                  name={
                    prediction.recommendedAction === 'buy' ? 'trending-up' : 
                    prediction.recommendedAction === 'sell' ? 'trending-down' : 
                    'remove'
                  } 
                  size={18} 
                  color={
                    prediction.recommendedAction === 'buy' ? Colors.success : 
                    prediction.recommendedAction === 'sell' ? Colors.danger : 
                    Colors.warning
                  } 
                />
                <Text style={[
                  styles.actionText, 
                  {
                    color: 
                      prediction.recommendedAction === 'buy' ? Colors.success : 
                      prediction.recommendedAction === 'sell' ? Colors.danger : 
                      Colors.warning
                  }
                ]}>
                  {prediction.recommendedAction.toUpperCase()}
                </Text>
              </View>
              
              <Text style={styles.timeframeText}>Timeframe: {prediction.timeFrame}</Text>
            </View>
            
            <Text style={styles.recommendationText}>
              Based on our AI analysis of market trends, technical indicators, and historical performance,
              we recommend to <Text style={{fontWeight: 'bold'}}>{prediction.recommendedAction}</Text> with
              a {prediction.confidence}% confidence level. The expected return over {prediction.timeFrame} is
              approximately {prediction.expectedROI.toFixed(2)}%.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Factors Influencing Prediction</Text>
          
          <View style={styles.factorsCard}>
            <View style={styles.factor}>
              <Ionicons name="stats-chart-outline" size={24} color={Colors.primary} style={styles.factorIcon} />
              <View style={styles.factorContent}>
                <Text style={styles.factorTitle}>Technical Analysis</Text>
                <Text style={styles.factorDescription}>
                  Strong moving average convergence with positive momentum indicators.
                </Text>
              </View>
            </View>
            
            <View style={styles.factor}>
              <Ionicons name="newspaper-outline" size={24} color={Colors.primary} style={styles.factorIcon} />
              <View style={styles.factorContent}>
                <Text style={styles.factorTitle}>Market Sentiment</Text>
                <Text style={styles.factorDescription}>
                  Recent news articles and social media indicate positive market sentiment.
                </Text>
              </View>
            </View>
            
            <View style={styles.factor}>
              <Ionicons name="globe-outline" size={24} color={Colors.primary} style={styles.factorIcon} />
              <View style={styles.factorContent}>
                <Text style={styles.factorTitle}>Economic Indicators</Text>
                <Text style={styles.factorDescription}>
                  Latest economic data supports continued growth in this sector.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 90) return Colors.success;
  if (confidence >= 70) return Colors.secondary;
  if (confidence >= 50) return Colors.warning;
  return Colors.danger;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
    position: 'relative',
  },
  chart: {
    borderRadius: 16,
  },
  divider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#ddd',
  },
  dividerLabel: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 4,
  },
  dividerText: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '500',
  },
  predictionDetails: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceBarBg: {
    height: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceBar: {
    height: 8,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  timeframeText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  factorsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  factor: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  factorIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  factorContent: {
    flex: 1,
  },
  factorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  factorDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});

export default PredictionDetailScreen;