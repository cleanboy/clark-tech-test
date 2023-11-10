import React from 'react';
import { Dimensions } from 'react-native';
import { 
    Text, 
    VStack, 
    Image,
    ScrollView 
} from '@gluestack-ui/themed'

import Container from '../../components/Container';

import { capitalizeFirstLetter } from '../../helpers/text';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router/types';

type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetail = ({route}: ProductDetailScreenProps) => {
    const { 
        title,
        image,
        price,
        description,
        category,
        rating
    } = route.params;

    const { width, height } = Dimensions.get('window');

    const formattedCategory = capitalizeFirstLetter(category);

    return (
        <Container>
            <ScrollView>
                <VStack alignItems="stretch">
                    <Image 
                        source={{ uri: image }}
                        role="img"
                        alt={title}
                        width={width}
                        height={height * 0.3}
                        resizeMode="contain"
                    />
                    <Text size="xl" bold mt="$3">{title}</Text>
                    <Text size="lg" bold>Category: {formattedCategory}</Text>
                    <Text size="lg" bold>Price: &euro;{price}</Text>
                    <Text>Rating: {rating.rate}/5 ({rating.count})</Text>
                    <Text mt="$3">{description}</Text>
                </VStack>
            </ScrollView>    
        </Container>
    )
}

export default ProductDetail;