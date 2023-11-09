import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen';
import ProductDetail from '../ProductDetail';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Info '}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Router;