import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';

interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'stable';
  value: number;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  trend,
  value,
  showIcon = true,
  size = 'medium',
}) => {
  const getColor = () => {
    switch (trend) {
      case 'up':
        return Colors.success;
      case 'down':
        return Colors.danger;
      case 'stable':
        return Colors.info;
      default:
        return Colors.info;
    }
  };
  
  const getIcon = () => {
    switch (trend) {
      case 'up':
        return 'arrow-up';
      case 'down':
        return 'arrow-down';
      case 'stable':
        return 'remove';
      default:
        return 'remove';
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 14;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      default:
        return 16;
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: `${getColor()}20` }]}>
      {showIcon && (
        <Ionicons
          name={getIcon() as any}
          size={getIconSize()}
          color={getColor()}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: getColor(), fontSize: getFontSize() }]}>
        {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
        {Math.abs(value).toFixed(2)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
  },
});

export default TrendIndicator;