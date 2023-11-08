import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Input, 
    InputField,
    InputSlot,
    InputIcon,
    SearchIcon,
    VStack,
    ScrollView
} from '@gluestack-ui/themed';

import Container from '../../components/Container';
import ProductCard from '../../components/Product';

import type { Product } from './types';

const HomeScreen = () => {
    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');

            setProducts(response.data);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <Container>
            <ScrollView>
                <Input 
                    variant="rounded"
                    size="md"
                    mb="$4"
                >
                    <InputSlot>
                        <InputIcon as={SearchIcon} color="#aaa" size="md" marginLeft={16} />
                    </InputSlot>
                    <InputField placeholder="Search..." />
                </Input>
                <VStack>
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            title={product.title}
                            category={product.category}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                        />
                    ))}
                </VStack>
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;