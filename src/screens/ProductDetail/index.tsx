import React from 'react';
import { Text } from '@gluestack-ui/themed'

import Container from '../../components/Container';

import { Product } from '../../types/Products';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router/types';

type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetail = ({route}: ProductDetailScreenProps) => {
    const { title } = route.params;

    return (
        <Container>
            <Text>{title}</Text>
        </Container>
    )
}

export default ProductDetail;