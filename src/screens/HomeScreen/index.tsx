import React, { useEffect, useState, Fragment } from 'react';
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
    Pressable,
    useToast,
    Text
} from '@gluestack-ui/themed';
import { RefreshControl } from 'react-native';

import Container from '../../components/Container';
import ProductCard from '../../components/Product';
import LoadingScreen from '../LoadingScreen';
import CustomToast from '../../components/CustomToast';
import SearchInputProps from '../../components/SearchInput';

import { capitalizeFirstLetter } from '../../helpers/text';

import type { Product } from '../../types/Products';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        // Normally I would most likely do this inside of a hook or an action if using redux 
        // and store it in state however I thought that was overkill for such a small app.
        setIsLoading(true);

        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            // uncomment this and comment above to test the error toast
            // const response = await axios.get('https://fakestoreapi.com/productsnotworking');

            setProducts(response.data);
        } catch (error) {
            // dispatch error to sentry or some similar logging method with the above passed error in the catch

            toast.show({
                placement: "top",
                render: ({ id }) => <CustomToast id={id} />,
                })
        } finally {
            setIsLoading(false);
        }
    }

    const handleNavigateToProductDetail = (product: Product) => {
        navigation.navigate('ProductDetail', product);
    }

    const handleproductSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            getProducts();
            return;
        } 

        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setProducts(filteredProducts);
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Container>
            <ScrollView
                // This is not the most elegant solution for this...time is not on my side.
                refreshControl={
                    <RefreshControl 
                        refreshing={isLoading}
                        onRefresh={getProducts} 
                    />
                }
                testID='home-screen-scrollview'
            >
                <SearchInputProps onChange={handleproductSearch} />
                {products.length === 0 ? (
                    <Text>No products found...</Text>
                ) : (
                    <VStack>
                    {products.map((product, i) => {
                        const category = capitalizeFirstLetter(product.category);

                        return (
                            <Fragment key={`product-${i}`}>
                                <Pressable
                                    onPress={() => handleNavigateToProductDetail(product)}
                                >
                                    <ProductCard 
                                        title={product.title}
                                        category={category}
                                        price={product.price}
                                        image={product.image}
                                        rating={product.rating}
                                        testID={`product-${i}`}
                                    />
                                </Pressable>
                                <Box 
                                    width="100%"
                                    height={1}
                                    backgroundColor="#d4d4d4"
                                    mb="$3"
                                />
                            </Fragment> 
                        )
                    })}
                </VStack>
                )}
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;