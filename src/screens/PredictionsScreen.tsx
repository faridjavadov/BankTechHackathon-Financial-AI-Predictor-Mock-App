import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CurrencyCard from '../components/predictions/CurrencyCard';
import CommodityCard from '../components/predictions/CommodityCard';
import StockCard from '../components/predictions/StockCard';
import { currencyPredictions } from '../data/mockCurrencies';
import { commodityPredictions } from '../data/mockCommodities';
import { stockPredictions } from '../data/mockStocks';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type PredictionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Predictions'>;
type PredictionsScreenRouteProp = RouteProp<RootStackParamList, 'Predictions'>;

interface Props {
  navigation: PredictionsScreenNavigationProp;
}

type PredictionType = 'all' | 'currency' | 'commodity' | 'stock';
type SortType = 'confidence' | 'roi' | 'timeframe';

const PredictionsScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<PredictionType>('all');
  const [sortBy, setSortBy] = useState<SortType>('confidence');
  
  const getPredictionData = () => {
    let data : any = [];
    
    if (activeTab === 'all' || activeTab === 'currency') {
      data = [...data, ...currencyPredictions.map(item => ({ ...item, type: 'currency' }))];
    }
    
    if (activeTab === 'all' || activeTab === 'commodity') {
      data = [...data, ...commodityPredictions.map(item => ({ ...item, type: 'commodity' }))];
    }
    
    if (activeTab === 'all' || activeTab === 'stock') {
      data = [...data, ...stockPredictions.map(item => ({ ...item, type: 'stock' }))];
    }
    
    // Sort data based on sortBy
    return data.sort((a : any, b : any) => {
      if (sortBy === 'confidence') {
        return b.confidence - a.confidence;
      } else if (sortBy === 'roi') {
        return b.expectedROI - a.expectedROI;
      } else if (sortBy === 'timeframe') {
        return parseInt(a.timeFrame) - parseInt(b.timeFrame);
      }
      return 0;
    });
  };
  
  const renderPredictionItem = ({ item }: any) => {
    if (item.type === 'currency') {
      return (
        <CurrencyCard 
          prediction={item} 
          onPress={() => navigation.navigate('PredictionDetail', { id: item.id, type: 'currency' })}
        />
      );
    } else if (item.type === 'commodity') {
      return (
        <CommodityCard 
          prediction={item} 
          onPress={() => navigation.navigate('PredictionDetail', { id: item.id, type: 'commodity' })}
        />
      );
    } else if (item.type === 'stock') {
      return (
        <StockCard 
          prediction={item} 
          onPress={() => navigation.navigate('PredictionDetail', { id: item.id, type: 'stock' })}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Predictions</Text>
        <Text style={styles.headerSubtitle}>Market forecasts powered by our AI</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Ionicons 
              name="analytics-outline" 
              size={20} 
              color={activeTab === 'all' ? Colors.primary : Colors.textLight} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'currency' && styles.activeTab]}
            onPress={() => setActiveTab('currency')}
          >
            <Ionicons 
              name="cash-outline" 
              size={20} 
              color={activeTab === 'currency' ? Colors.primary : Colors.textLight} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'currency' && styles.activeTabText]}
            >
              Currencies
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'commodity' && styles.activeTab]}
            onPress={() => setActiveTab('commodity')}
          >
            <Ionicons 
              name="diamond-outline" 
              size={20} 
              color={activeTab === 'commodity' ? Colors.primary : Colors.textLight} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'commodity' && styles.activeTabText]}
            >
              Commodities
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stock' && styles.activeTab]}
            onPress={() => setActiveTab('stock')}
          >
            <Ionicons 
              name="trending-up-outline" 
              size={20} 
              color={activeTab === 'stock' ? Colors.primary : Colors.textLight} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'stock' && styles.activeTabText]}
            >
              Stocks
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortOption, sortBy === 'confidence' && styles.activeSortOption]}
          onPress={() => setSortBy('confidence')}
        >
          <Text 
            style={[styles.sortText, sortBy === 'confidence' && styles.activeSortText]}
          >
            Confidence
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.sortOption, sortBy === 'roi' && styles.activeSortOption]}
          onPress={() => setSortBy('roi')}
        >
          <Text 
            style={[styles.sortText, sortBy === 'roi' && styles.activeSortText]}
          >
            ROI
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.sortOption, sortBy === 'timeframe' && styles.activeSortOption]}
          onPress={() => setSortBy('timeframe')}
        >
          <Text 
            style={[styles.sortText, sortBy === 'timeframe' && styles.activeSortText]}
          >
            Timeframe
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={getPredictionData()}
        keyExtractor={item => `${item.type}-${item.id}`}
        renderItem={renderPredictionItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  tabContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
  },
  activeTab: {
    backgroundColor: `${Colors.primary}20`,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textLight,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sortLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginRight: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: Colors.card,
  },
  activeSortOption: {
    backgroundColor: `${Colors.primary}20`,
  },
  sortText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  activeSortText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
});

export default PredictionsScreen;