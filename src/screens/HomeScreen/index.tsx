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
    Pressable,
    useToast,
    Text
} from '@gluestack-ui/themed';

import Container from '../../components/Container';
import ProductCard from '../../components/Product';
import LoadingScreen from '../LoadingScreen';
import CustomToast from '../../components/CustomToast';

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

        // I am only putting the setTimout here to show the loading screen as the API responds fairly quickly...
        setTimeout(async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                // uncomment this and comment above to test the error toast
                // const response = await axios.get('https://fakestoreapi.com/productsnotworking');
    
                setProducts(response.data);
            } catch (error) {
                // dispatch error to sentry or something similar with the above passed error in the catch

                toast.show({
                    placement: "top",
                    render: ({ id }) => <CustomToast id={id} />,
                  })
            } finally {
                setIsLoading(false);
            }
        }, 2000);
    }

    const handleNavigateToProductDetail = (product: Product) => {
        navigation.navigate('ProductDetail', product);
    }

    const handleproductSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            getProducts();
        } 

        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setProducts(filteredProducts);
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    if (products.length === 0) {
        return (
            <Container>
                <Text>No products found...</Text>
            </Container>
        )
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
                    <InputField 
                        onChangeText={handleproductSearch}
                        placeholder="Search..." 
                    />
                </Input>
                <VStack>
                    {products.map((product, i) => {
                        const category = capitalizeFirstLetter(product.category);

                        return (
                            <>
                                <Pressable
                                    key={`product-${i}`}
                                    onPress={() => handleNavigateToProductDetail(product)}
                                >
                                    <ProductCard 
                                        title={product.title}
                                        category={category}
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
                        )
                    })}
                </VStack>
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;