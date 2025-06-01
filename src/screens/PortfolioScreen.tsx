import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/colors';
import { formatCurrency } from '../utils/numberFormatter';
import { RootStackParamList } from '../navigation/AppNavigator';

type PortfolioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Portfolio'>;

interface Props {
    navigation: PortfolioScreenNavigationProp;
}

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
    },
];

const PortfolioScreen: React.FC<Props> = ({ navigation }) => {
    const totalValue = portfolioAssets.reduce((total, asset) => total + asset.value, 0);
    const totalPerformance = (
        portfolioAssets.reduce((total, asset) => total + (asset.value * asset.performance / 100), 0) /
        totalValue * 100
    ).toFixed(2);

    const getIconName = (type: string) => {
        switch (type) {
            case 'currency':
                return 'cash-outline';
            case 'commodity':
                return 'diamond-outline';
            case 'stock':
                return 'trending-up-outline';
            default:
                return 'help-outline';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Portfolio</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddAsset')}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={[Colors.primary, Colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.summaryCard}
                >
                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(totalValue, 'USD')}</Text>

                        <View style={styles.performanceContainer}>
                            <View style={styles.performanceBadge}>
                                <Ionicons
                                    name={parseFloat(totalPerformance) >= 0 ? 'trending-up' : 'trending-down'}
                                    size={16}
                                    color="white"
                                />
                                <Text style={styles.performanceText}>
                                    {parseFloat(totalPerformance) >= 0 ? '+' : ''}{totalPerformance}%
                                </Text>
                            </View>
                            <Text style={styles.performanceLabel}>Total Performance</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.assetsContainer}>
                    <View style={styles.assetsHeader}>
                        <Text style={styles.assetsTitle}>Your Assets</Text>
                        <TouchableOpacity onPress={() => console.log('Filter assets')}>
                            <Ionicons name="filter" size={20} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    {portfolioAssets.map((asset) => (
                        <TouchableOpacity
                            key={asset.id}
                            style={styles.assetCard}
                            onPress={() => navigation.navigate('AssetDetail', { id: asset.id })}
                        >
                            <View style={styles.assetIconContainer}>
                                <View style={[styles.assetIcon, {
                                    backgroundColor:
                                        asset.type === 'currency' ? `${Colors.primary}20` :
                                            asset.type === 'commodity' ? `${Colors.secondary}20` :
                                                `${Colors.info}20`
                                }]}>
                                    <Ionicons
                                        name={getIconName(asset.type)}
                                        size={24}
                                        color={
                                            asset.type === 'currency' ? Colors.primary :
                                                asset.type === 'commodity' ? Colors.secondary :
                                                    Colors.info
                                        }
                                    />
                                </View>
                            </View>

                            <View style={styles.assetInfo}>
                                <Text style={styles.assetName}>{asset.name}</Text>
                                <Text style={styles.assetType}>{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</Text>
                            </View>

                            <View style={styles.assetValues}>
                                <Text style={styles.assetValue}>{formatCurrency(asset.value, 'USD')}</Text>
                                <View style={[styles.assetPerformance, {
                                    backgroundColor: asset.performance >= 0 ? `${Colors.success}20` : `${Colors.danger}20`
                                }]}>
                                    <Ionicons
                                        name={asset.performance >= 0 ? 'trending-up' : 'trending-down'}
                                        size={12}
                                        color={asset.performance >= 0 ? Colors.success : Colors.danger}
                                    />
                                    <Text style={[styles.assetPerformanceText, {
                                        color: asset.performance >= 0 ? Colors.success : Colors.danger
                                    }]}>
                                        {asset.performance >= 0 ? '+' : ''}{asset.performance.toFixed(2)}%
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: Colors.primary }]}
                        onPress={() => navigation.navigate('Main', { screen: 'Predictions' })}
                    >
                        <Ionicons name="analytics-outline" size={24} color="white" />
                        <Text style={styles.actionText}>View Predictions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: Colors.secondary }]}
                        onPress={() => navigation.navigate('PortfolioAnalysis')}
                    >
                        <Ionicons name="pie-chart-outline" size={24} color="white" />
                        <Text style={styles.actionText}>Portfolio Analysis</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
    },
    summaryContent: {
        padding: 20,
    },
    summaryLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    performanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    performanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    performanceText: {
        color: 'white',
        marginLeft: 4,
        fontWeight: '500',
    },
    performanceLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    assetsContainer: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    assetsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    assetsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    assetCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    assetIconContainer: {
        marginRight: 12,
    },
    assetIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    assetInfo: {
        flex: 1,
    },
    assetName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    assetType: {
        fontSize: 12,
        color: Colors.textLight,
    },
    assetValues: {
        alignItems: 'flex-end',
    },
    assetValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    assetPerformance: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    assetPerformanceText: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 2,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 4,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default PortfolioScreen;