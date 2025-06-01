import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation 
}) => {
  const insets = useSafeAreaInsets();
  
  // Calculate padding for top and bottom
  const bottomPadding = Platform.OS === 'android' 
    ? Math.max(8, insets.bottom) 
    : insets.bottom;
    
  const topPadding = Platform.OS === 'android' 
    ? Math.max(8, StatusBar.currentHeight || 0) 
    : insets.top;
    
  return (
    <View style={[
      styles.container, 
      { 
        paddingBottom: bottomPadding,
        paddingTop: topPadding
      }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        
        const isFocused = state.index === index;
        
        // Determine which icon to show
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Predictions') {
          iconName = isFocused ? 'analytics' : 'analytics-outline';
        } else if (route.name === 'News') {
          iconName = isFocused ? 'newspaper' : 'newspaper-outline';
        } else if (route.name === 'Portfolio') {
          iconName = isFocused ? 'wallet' : 'wallet-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        } else {
          iconName = 'help-outline';
        }
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons 
              name={iconName as any} 
              size={24} 
              color={isFocused ? colors.primary : colors.textLight} 
            />
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? colors.primary : colors.textLight }
            ]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8, // Base padding that will be added to the safe area insets
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default CustomTabBar;