import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StockPrediction } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/numberFormatter';
import Colors from '../../constants/colors';
import Card from '../common/Card';
import LineChart from '../charts/LineChart';
import TrendIndicator from '../charts/TrendIndicator';

interface StockCardProps {
    prediction: StockPrediction;
    onPress?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ prediction, onPress }) => {
    const isPositive = prediction.trend === 'up';
    const chartData = [...prediction.historicalData, ...prediction.forecastData];

    return (
        <Card>
            <TouchableOpacity onPress={onPress} style={styles.touchable}>
                <View style={styles.header}>
                    <View style={styles.stockInfo}>
                        <Image source={{ uri: prediction.logoUrl }} style={styles.logo} />
                        <View>
                            <Text style={styles.ticker}>{prediction.ticker}</Text>
                            <Text style={styles.name}>{prediction.name}</Text>
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

                <View style={styles.priceContainer}>
                    <View style={styles.currentPriceContainer}>
                        <Text style={styles.currentPrice}>
                            {formatCurrency(prediction.currentValue, 'USD')}
                        </Text>
                        <Text style={styles.exchange}>{prediction.exchange}</Text>
                    </View>

                    <View style={styles.predictedPriceContainer}>
                        <Text style={styles.label}>Predicted Price</Text>
                        <Text style={[styles.predictedPrice, { color: isPositive ? Colors.success : Colors.danger }]}>
                            {formatCurrency(prediction.predictedValue, 'USD')}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailsRow}>
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Sector</Text>
                        <Text style={styles.detailValue}>{prediction.sector}</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Confidence</Text>
                        <Text style={styles.detailValue}>{prediction.confidence}%</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>Time Frame</Text>
                        <Text style={styles.detailValue}>{prediction.timeFrame}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={[styles.recommendationBadge, {
                        backgroundColor: prediction.recommendedAction === 'buy'
                            ? `${Colors.success}20`
                            : prediction.recommendedAction === 'sell'
                                ? `${Colors.danger}20`
                                : `${Colors.warning}20`
                    }]}>
                        <Ionicons
                            name={
                                prediction.recommendedAction === 'buy'
                                    ? 'trending-up'
                                    : prediction.recommendedAction === 'sell'
                                        ? 'trending-down'
                                        : 'remove'
                            }
                            size={16}
                            color={
                                prediction.recommendedAction === 'buy'
                                    ? Colors.success
                                    : prediction.recommendedAction === 'sell'
                                        ? Colors.danger
                                        : Colors.warning
                            }
                        />
                        <Text style={[styles.recommendationText, {
                            color: prediction.recommendedAction === 'buy'
                                ? Colors.success
                                : prediction.recommendedAction === 'sell'
                                    ? Colors.danger
                                    : Colors.warning
                        }]}>
                            {prediction.recommendedAction.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.expectedRoi}>
                        <Text style={styles.roiLabel}>Expected ROI:</Text>
                        <Text style={[styles.roiValue, {
                            color: prediction.expectedROI > 0 ? Colors.success : Colors.danger
                        }]}>
                            {prediction.expectedROI > 0 ? '+' : ''}
                            {prediction.expectedROI.toFixed(2)}%
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
    stockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 8,
        marginRight: 12,
    },
    ticker: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    name: {
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
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    currentPriceContainer: {
        flex: 1,
    },
    currentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
    },
    exchange: {
        fontSize: 12,
        color: Colors.textLight,
    },
    predictedPriceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 12,
        color: Colors.textLight,
        marginBottom: 4,
    },
    predictedPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detail: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.textLight,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 12,
    },
    recommendationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    recommendationText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    expectedRoi: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roiLabel: {
        fontSize: 12,
        color: Colors.textLight,
        marginRight: 4,
    },
    roiValue: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default StockCard;