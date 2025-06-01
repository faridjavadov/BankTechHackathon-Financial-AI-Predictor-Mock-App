import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import PredictionsScreen from '../screens/PredictionsScreen';
import NewsScreen from '../screens/NewsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen as React.ComponentType<{}>} />
      <Tab.Screen name="Predictions" component={PredictionsScreen as React.ComponentType<{}>} />
      <Tab.Screen name="News" component={NewsScreen as React.ComponentType<{}>} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen as React.ComponentType<{}>} />
      <Tab.Screen name="Profile" component={ProfileScreen as React.ComponentType<{}>} />
    </Tab.Navigator>
  );
};

export default TabNavigator;