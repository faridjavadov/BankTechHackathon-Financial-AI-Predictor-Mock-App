import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommodityPrediction } from '../../types';
import { formatCurrency } from '../../utils/numberFormatter';
import Colors from '../../constants/colors';
import Card from '../common/Card';
import LineChart from '../charts/LineChart';
import TrendIndicator from '../charts/TrendIndicator';

interface CommodityCardProps {
  prediction: CommodityPrediction;
  onPress?: () => void;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ prediction, onPress }) => {
  const isPositive = prediction.trend === 'up';
  const chartData = [...prediction.historicalData, ...prediction.forecastData];

  return (
    <Card>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <View style={styles.header}>
          <View style={styles.commodityInfo}>
            <Image source={{ uri: prediction.iconUrl }} style={styles.icon} />
            <View>
              <Text style={styles.name}>{prediction.name}</Text>
              <Text style={styles.category}>{prediction.category}</Text>
            </View>
          </View>
          <TrendIndicator 
            trend={prediction.trend} 
            value={prediction.percentageChange} 
          />
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            height={120}
            trend={prediction.trend}
            withDots={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
          />
          <View style={styles.chartDivider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLabel}>
              <Text style={styles.dividerText}>Forecast</Text>
            </View>
            <View style={styles.dividerLine} />
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Current</Text>
            <Text style={styles.currentValue}>
              {formatCurrency(prediction.currentValue, 'USD')} / {prediction.unit}
            </Text>
          </View>
          
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Predicted</Text>
            <Text style={[styles.predictedValue, {color: isPositive ? Colors.success : Colors.danger}]}>
              {formatCurrency(prediction.predictedValue, 'USD')}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={Colors.textLight} />
            <Text style={styles.detailText}>{prediction.timeFrame}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="pulse-outline" size={16} color={Colors.textLight} />
            <Text style={styles.detailText}>{prediction.confidence}% confidence</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons 
              name={prediction.recommendedAction === 'buy' ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={prediction.recommendedAction === 'buy' ? Colors.success : Colors.danger} 
            />
            <Text style={[styles.actionText, {
              color: prediction.recommendedAction === 'buy' ? Colors.success : Colors.danger
            }]}>
              {prediction.recommendedAction.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  commodityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  category: {
    fontSize: 12,
    color: Colors.textLight,
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartDivider: {
    position: 'absolute',
    right: 40,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    width: 1,
    flex: 1,
    backgroundColor: '#ddd',
  },
  dividerLabel: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dividerText: {
    fontSize: 10,
    color: Colors.textLight,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  predictedValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.textLight,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CommodityCard;