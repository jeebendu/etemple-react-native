// App.js
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Home from './src/screen/Home/Index'
import Tepmle from './src/screen/Temple/Index';

const Stack = createStackNavigator();

const App = () => {

  // const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   // show splash for 5 seconds
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 6000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="dark-content" backgroundColor="#fbf7ef" translucent={false} />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Temple" component={Tepmle} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;