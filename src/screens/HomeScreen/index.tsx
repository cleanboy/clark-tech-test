import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Input, 
    InputField,
    InputSlot,
    InputIcon,
    SearchIcon,
    VStack,
    ScrollView,
    Box,
    Pressable
} from '@gluestack-ui/themed';

import Container from '../../components/Container';
import ProductCard from '../../components/Product';
import LoadingScreen from '../LoadingScreen';

import type { Product } from '../../types/Products';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        // Normally I would most likely do this inside of a hook or an action if using redux 
        // and store it in state however I thought that was overkill for such a small app.
        setIsLoading(true);

        // I am only putting the setTimout here to show the loading screen as the API responds fairly quickly...
        setTimeout(async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
    
                setProducts(response.data);
            } catch (error) {
                console.log('error: ', error);
                // Probably we should show an error message to the user
            } finally {
                setIsLoading(false);
            }
        }, 2000);
    }

    const handleNavigateToProductDetail = (product: Product) => {
        navigation.navigate('ProductDetail', product);
    }

    if (isLoading) {
        return <LoadingScreen />
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
                    {products.map((product, i) => (
                        <>
                            <Pressable
                                onPress={() => handleNavigateToProductDetail(product)}
                            >
                                <ProductCard 
                                    key={`product-${i}`}
                                    title={product.title}
                                    category={product.category}
                                    price={product.price}
                                    image={product.image}
                                    rating={product.rating}
                                />
                            </Pressable>
                            <Box 
                                width="100%"
                                height={1}
                                backgroundColor="#d4d4d4"
                                mb="$3"
                            />
                        </> 
                    ))}
                </VStack>
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;