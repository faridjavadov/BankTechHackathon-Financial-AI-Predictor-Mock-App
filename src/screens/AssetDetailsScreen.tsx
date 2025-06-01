// src/screens/AssetDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { formatCurrency } from '../utils/numberFormatter';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type AssetDetailRouteProp = RouteProp<RootStackParamList, 'AssetDetail'>;

// Mock data for portfolio assets
const portfolioAssets = [
  {
    id: 'port-001',
    name: 'USD/TRY',
    type: 'currency',
    amount: 1000,
    value: 31730,
    purchasePrice: 30.50,
    currentPrice: 31.73,
    performance: 4.03,
    purchaseDate: '2023-05-15',
    historicalData: [30.5, 30.7, 30.9, 31.2, 31.5, 31.7, 31.73],
    historicalDates: [
      '2023-05-15',
      '2023-05-25',
      '2023-06-01',
      '2023-06-07',
      '2023-06-10',
      '2023-06-13',
      '2023-06-15'
    ],
  },
  {
    id: 'port-002',
    name: 'Gold',
    type: 'commodity',
    amount: 10,
    value: 23456,
    purchasePrice: 2290.40,
    currentPrice: 2345.60,
    performance: 2.41,
    purchaseDate: '2023-05-10',
    historicalData: [2290.4, 2300.2, 2315.5, 2330.8, 2335.2, 2340.5, 2345.6],
    historicalDates: [
      '2023-05-10',
      '2023-05-20',
      '2023-05-28',
      '2023-06-05',
      '2023-06-09',
      '2023-06-12',
      '2023-06-15'
    ],
  },
  {
    id: 'port-003',
    name: 'Apple Inc.',
    type: 'stock',
    amount: 50,
    value: 9366,
    purchasePrice: 180.50,
    currentPrice: 187.32,
    performance: 3.78,
    purchaseDate: '2023-04-20',
    historicalData: [180.5, 182.3, 183.7, 184.5, 185.2, 186.4, 187.32],
    historicalDates: [
      '2023-04-20',
      '2023-05-01',
      '2023-05-15',
      '2023-05-29',
      '2023-06-05',
      '2023-06-10',
      '2023-06-15'
    ],
  },
];

const AssetDetailScreen: React.FC = () => {
  const route = useRoute<AssetDetailRouteProp>();
  const { id } = route.params;
  const [asset, setAsset] = useState<typeof portfolioAssets[0] | null>(null);

  useEffect(() => {
    const foundAsset = portfolioAssets.find(item => item.id === id);
    if (foundAsset) {
      setAsset(foundAsset);
    }
  }, [id]);

  if (!asset) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const isPositive = asset.performance > 0;
  
  // Format dates for display
  const formattedDates = asset.historicalDates.map(date => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });
  
  // Calculate absolute gain/loss
  const absoluteGainLoss = (asset.currentPrice - asset.purchasePrice) * asset.amount;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.assetType}>{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</Text>
            <Text style={styles.assetName}>{asset.name}</Text>
          </View>
          
          <View style={[
            styles.performanceBadge, 
            {backgroundColor: isPositive ? `${Colors.success}15` : `${Colors.danger}15`}
          ]}>
            <Ionicons 
              name={isPositive ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={isPositive ? Colors.success : Colors.danger} 
            />
            <Text style={[
              styles.performanceText, 
              {color: isPositive ? Colors.success : Colors.danger}
            ]}>
              {isPositive ? '+' : ''}{asset.performance.toFixed(2)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.valueContainer}>
          <Text style={styles.valueLabel}>Total Value</Text>
          <Text style={styles.valueAmount}>{formatCurrency(asset.value, 'USD')}</Text>
          <Text style={[
            styles.gainLoss,
            {color: isPositive ? Colors.success : Colors.danger}
          ]}>
            {isPositive ? '+' : ''}{formatCurrency(absoluteGainLoss, 'USD')}
          </Text>
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: formattedDates,
              datasets: [{
                data: asset.historicalData
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
        </View>
        
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Asset Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>{asset.amount.toString()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purchase Price</Text>
            <Text style={styles.detailValue}>{formatCurrency(asset.purchasePrice, 'USD')}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Price</Text>
            <Text style={styles.detailValue}>{formatCurrency(asset.currentPrice, 'USD')}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purchase Date</Text>
            <Text style={styles.detailValue}>{new Date(asset.purchaseDate).toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Performance</Text>
            <Text style={[
              styles.detailValue,
              {color: isPositive ? Colors.success : Colors.danger}
            ]}>
              {isPositive ? '+' : ''}{asset.performance.toFixed(2)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.primary }]}>
            <Ionicons name="add-outline" size={20} color="white" />
            <Text style={styles.actionButtonText}>Buy More</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.danger }]}>
            <Ionicons name="remove-outline" size={20} color="white" />
            <Text style={styles.actionButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>AI Prediction</Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>85% Confidence</Text>
            </View>
          </View>
          
          <Text style={styles.predictionText}>
            Based on current market analysis, our AI predicts this asset will
            <Text style={{ fontWeight: 'bold', color: Colors.success }}> appreciate by 2.5% </Text>
            in the next 14 days. Consider holding or increasing your position.
          </Text>
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View Detailed Analysis</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  assetType: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  assetName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  performanceText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  valueContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  valueLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  valueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  gainLoss: {
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chart: {
    borderRadius: 16,
  },
  detailsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  predictionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  confidenceBadge: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  predictionText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    marginBottom: 16,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default AssetDetailScreen;