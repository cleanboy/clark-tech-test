import { NavigatorScreenParams } from '@react-navigation/native';

import { Product } from '../../types/Products';

export type RootStackParamList = {
    Home: undefined;
    ProductDetail: Product;
}