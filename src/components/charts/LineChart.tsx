import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';
import Colors from '../../constants/colors';

interface LineChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  width?: number;
  withDots?: boolean;
  withVerticalLines?: boolean;
  withHorizontalLines?: boolean;
  withVerticalLabels?: boolean;
  withHorizontalLabels?: boolean;
  trend?: 'up' | 'down' | 'stable';
  showLabelsOnlyForFirstAndLast?: boolean;
  withDashedLine?: boolean;
  dashedLineData?: number[];
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  height = 200,
  width = Dimensions.get('window').width - 32,
  withDots = false,
  withVerticalLines = false,
  withHorizontalLines = true,
  withVerticalLabels = true,
  withHorizontalLabels = true,
  trend = 'up',
  showLabelsOnlyForFirstAndLast = false,
  withDashedLine = false,
  dashedLineData = [],
}) => {
  const getColor = (opacity = 1) => {
    switch (trend) {
      case 'up':
        return `rgba(46, 204, 113, ${opacity})`;
      case 'down':
        return `rgba(231, 76, 60, ${opacity})`;
      case 'stable':
        return `rgba(52, 152, 219, ${opacity})`;
      default:
        return `rgba(52, 152, 219, ${opacity})`;
    }
  };
  
  const getLabels = () => {
    if (!labels) return Array(data.length).fill('');
    
    if (showLabelsOnlyForFirstAndLast) {
      const newLabels = Array(labels.length).fill('');
      newLabels[0] = labels[0];
      newLabels[labels.length - 1] = labels[labels.length - 1];
      return newLabels;
    }
    
    return labels;
  };
  
  return (
    <View style={styles.container}>
      <RNLineChart
        data={{
          labels: getLabels(),
          datasets: [
            {
              data,
              color: getColor,
              strokeWidth: 2,
            },
            ...(withDashedLine && dashedLineData.length > 0
              ? [
                  {
                    data: dashedLineData,
                    color: (opacity = 1) => `rgba(149, 165, 166, ${opacity})`,
                    strokeWidth: 1,
                    withDots: false,
                  },
                ]
              : []),
          ],
        }}
        width={width}
        height={height}
        chartConfig={{
          backgroundColor: Colors.card,
          backgroundGradientFrom: Colors.card,
          backgroundGradientTo: Colors.card,
          decimalPlaces: 2,
          color: getColor,
          labelColor: () => Colors.textLight,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: Colors.card,
          },
          propsForBackgroundLines: {
            strokeDasharray: withDashedLine ? '5, 5' : '',
            strokeWidth: 1,
          },
        }}
        bezier
        style={styles.chart}
        withDots={withDots}
        withInnerLines={withHorizontalLines}
        withOuterLines={false}
        withHorizontalLabels={withHorizontalLabels}
        withVerticalLabels={withVerticalLabels}
        withVerticalLines={withVerticalLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default LineChart;