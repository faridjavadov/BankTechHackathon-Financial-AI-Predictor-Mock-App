import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigation';
import DashboardScreen from '../screens/DashboardScreen';
import PredictionsScreen from '../screens/PredictionsScreen';
import NewsScreen from '../screens/NewsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import PredictionDetailScreen from '../screens/PredictionDetailScreen';
import AssetDetailScreen from '../screens/AssetDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PortfolioAnalysisScreen from '../screens/portolioAnalysisScreen';

export type RootStackParamList = {
    Main: {
        screen?: string;
        params?: object;
    };
    NewsDetail: { id: string };
    PredictionDetail: { id: string; type: string };
    AssetDetail: { id: string };
    Notifications: undefined;
    EditProfile: undefined;
    PersonalInfo: undefined;
    Security: undefined;
    Preferences: undefined;
    AppearanceSettings: undefined;
    HelpCenter: undefined;
    Contact: undefined;
    About: undefined;
    AddAsset: undefined;
    PortfolioAnalysis: undefined;
    // Tab screens
    Dashboard: undefined;
    Predictions: { filter?: string };
    News: undefined;
    Portfolio: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const PlaceholderScreen: React.FC<{ route: any }> = ({ route }) => {
    return null; // This would be replaced with actual screen implementations
};

const AppNavigator: React.FC = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={TabNavigator} />

                {/* Direct routes to tabs for direct navigation */}
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Predictions" component={PredictionsScreen} />
                <Stack.Screen name="News" component={NewsScreen} />
                <Stack.Screen name="Portfolio" component={PortfolioScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />

                {/* Detail screens */}
                <Stack.Screen
                    name="NewsDetail"
                    component={NewsDetailScreen}
                    options={{ headerShown: true, title: 'Article' }}
                />
                <Stack.Screen
                    name="PredictionDetail"
                    component={PredictionDetailScreen}
                    options={{ headerShown: true, title: 'Prediction Details' }}
                />

                {/* Rest of your screens */}
                <Stack.Screen
                    name="AssetDetail"
                    component={AssetDetailScreen}
                    options={{ headerShown: true, title: 'Asset Details' }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{ headerShown: true, title: 'Notifications' }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Edit Profile' }}
                />
                <Stack.Screen
                    name="PersonalInfo"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Personal Information' }}
                />
                <Stack.Screen
                    name="Security"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Security' }}
                />
                <Stack.Screen
                    name="Preferences"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Preferences' }}
                />
                <Stack.Screen
                    name="AppearanceSettings"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Appearance' }}
                />
                <Stack.Screen
                    name="HelpCenter"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Help Center' }}
                />
                <Stack.Screen
                    name="Contact"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Contact Us' }}
                />
                <Stack.Screen
                    name="About"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'About' }}
                />
                <Stack.Screen
                    name="AddAsset"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Add Asset' }}
                />
                <Stack.Screen
                    name="PortfolioAnalysis"
                    component={PlaceholderScreen}
                    options={{ headerShown: true, title: 'Portfolio Analysis' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;