import React from 'react';
import { 
    Text, 
    VStack, 
    HStack,
    Image
} from '@gluestack-ui/themed';

type ProductCardProps = {
    title: string;
    category: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

const ProductCard = ({
    title,
    category,
    price,
    image,
    rating
}: ProductCardProps) => {
    return (
        <HStack mb="$3">
            <Image 
                source={{ uri: image }}
                role="img"
                alt={title}
                width={100}
                height={100}
                mr={16}
                flex={1}
                resizeMode="contain"
            />
            <VStack flex={2}>
                <Text size="lg" bold>{title}</Text>
                <Text>Category: {category}</Text>
                <Text>Price: &euro;{price}</Text>
                <Text>{rating.rate}/5 ({rating.count})</Text>
            </VStack>
        </HStack>
    );
}

export default ProductCard;