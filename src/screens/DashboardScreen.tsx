// src/screens/DashboardScreen.tsx - Using new components
import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import DashboardHeader from '../components/common/DashboardHeader';
import MarketSummaryCard from '../components/dashboard/MarketSummaryCard';
import SectionHeader from '../components/common/SectionHeader';
import { currencyPredictions } from '../data/mockCurrencies';
import { newsArticles } from '../data/mockNews';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import CurrencyCard from '../components/predictions/CurrencyCard';
import NewsItem from '../components/news/NewsItem';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
    navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <DashboardHeader
                onNotificationPress={() => navigation.navigate('Notifications')}
                onProfilePress={() => navigation.navigate('Profile')}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <MarketSummaryCard
                    onPress={() => navigation.navigate('Main', { screen: 'Predictions' })}
                />

                <SectionHeader
                    title="Currency Trends"
                    onSeeAllPress={() => navigation.navigate('Predictions', { filter: 'currency' })}
                />

                {currencyPredictions.slice(0, 2).map(prediction => (
                    <CurrencyCard
                        key={prediction.id}
                        prediction={prediction}
                        onPress={() => navigation.navigate('PredictionDetail', { id: prediction.id, type: 'currency' })}
                    />
                ))}

                <SectionHeader
                    title="Market News"
                    onSeeAllPress={() => navigation.navigate('News')}
                />

                {newsArticles.slice(0, 3).map(article => (
                    <NewsItem
                        key={article.id}
                        article={article}
                        onPress={() => navigation.navigate('NewsDetail', { id: article.id })}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});

export default DashboardScreen;