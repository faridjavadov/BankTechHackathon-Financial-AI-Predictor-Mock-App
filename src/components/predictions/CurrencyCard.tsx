// src/components/predictions/EnhancedCurrencyCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CurrencyPrediction } from '../../types';
import { formatCurrency } from '../../utils/numberFormatter';
import Colors from '../../constants/colors';

interface EnhancedCurrencyCardProps {
  prediction: CurrencyPrediction;
  onPress: () => void;
}

const CurrencyCard: React.FC<EnhancedCurrencyCardProps> = ({ prediction, onPress }) => {
  const isPositive = prediction.trend === 'up';
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={styles.currencyInfo}>
          <View style={styles.flagContainer}>
            <Image source={{ uri: prediction.fromFlag }} style={styles.flag} />
            <Image source={{ uri: prediction.toFlag }} style={styles.flagOverlay} />
          </View>
          <Text style={styles.pairName}>{prediction.pairName}</Text>
        </View>
        
        <View style={[
          styles.trendBadge, 
          {backgroundColor: isPositive ? `${Colors.success}15` : `${Colors.danger}15`}
        ]}>
          <Ionicons 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={14} 
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
      
      <View style={styles.ratesContainer}>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Current</Text>
          <Text style={styles.rateValue}>{formatCurrency(prediction.currentValue, prediction.toCurrency)}</Text>
        </View>
        
        <View style={styles.arrow}>
          <Ionicons 
            name="arrow-forward" 
            size={16} 
            color={Colors.textLight} 
          />
        </View>
        
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Predicted</Text>
          <Text style={[
            styles.rateValue, 
            {color: isPositive ? Colors.success : Colors.danger}
          ]}>
            {formatCurrency(prediction.predictedValue, prediction.toCurrency)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>{prediction.confidence}% Confidence</Text>
        </View>
        
        <View style={styles.actionBadge}>
          <Text style={styles.actionText}>
            {prediction.recommendedAction.toUpperCase()} • {prediction.timeFrame}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    position: 'relative',
    width: 36,
    height: 24,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    left: 0,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flagOverlay: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    left: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pairName: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  ratesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rateItem: {
    flex: 1,
  },
  rateLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  arrow: {
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confidenceBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 12,
    color: Colors.text,
  },
  actionBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
});

export default CurrencyCard;