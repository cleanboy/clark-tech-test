import { render, screen, waitFor, fireEvent } from "@testing-library/react-native";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import GluestackProvider from "../../hoc/GluestackProvider";
import Router from '../Router';

const responseData = [
    {
        id: 1,
        title: "Product One Title",
        price: 109.95,
        description: "Product Description",
        category: "Product Category",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120
        }
    },
    {
        id: 2,
        title: "Product Two Title",
        price: 109.95,
        description: "Product Description",
        category: "Product Category",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120
        }
    },
    {
        id: 1,
        title: "Product Three Title",
        price: 109.95,
        description: "Product Description",
        category: "Product Category",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120
        }
    }
];

const axiosMock = new MockAdapter(axios);

describe('HomeScreen', () => {
    beforeEach(() => {
        axiosMock.reset();
    });

    test('it should render the home screen', async () => {
        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        waitFor(() => {
            expect(screen.getByText('Home')).toBeDefined();
        });
    });

    test('it should show list items', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.getByText('Product Two Title')).toBeDefined();
            expect(screen.getByText('Product Three Title')).toBeDefined();
        });
    });

    test('it should go to product detail screen when product is selected', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        waitFor(() => {
            const itemOne = screen.getByTestId('product-1');

            fireEvent.press(itemOne);

            expect(screen.getByText('Product Info')).toBeDefined();
            expect(screen.getByText('Product One Title')).toBeDefined();
        });
    });

    test('it should go to product detail screen when product is selected then go back when back button is pressed', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        waitFor(() => {
            const itemOne = screen.getByTestId('product-1');

            fireEvent.press(itemOne);

            expect(screen.getByText('Product Info')).toBeDefined();
            expect(screen.getByText('Product One Title')).toBeDefined();

            const backButton = screen.getByText('Back');

            fireEvent.press(backButton);

            expect(screen.getByText('Home')).toBeDefined();
        });
    });

    test('it should search for products', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search...');

            fireEvent.changeText(searchInput, 'Product One Title');

            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.queryByText('Product Two Title')).toBeNull();
            expect(screen.queryByText('Product Three Title')).toBeNull();
        });
    });

    test('it should search for products and then show products when search is cleared', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search...');

            fireEvent.changeText(searchInput, 'Product One Title');

            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.queryByText('Product Two Title')).toBeNull();
            expect(screen.queryByText('Product Three Title')).toBeNull();

            fireEvent.changeText(searchInput, '');
        });

        await waitFor(() => {
            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.getByText('Product Two Title')).toBeDefined();
            expect(screen.getByText('Product Three Title')).toBeDefined();
        });
    });

    test('it should show no products found when no products are found after searching', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search...');

            fireEvent.changeText(searchInput, 'Product Four Title');

            expect(screen.getByText('No products found...')).toBeDefined();
        });
    });

    test('it should show no products found when no products are found after searching then show products when search is cleared', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search...');

            fireEvent.changeText(searchInput, 'Product Four Title');

            expect(screen.getByText('No products found...')).toBeDefined();

            fireEvent.changeText(searchInput, '');
        });

        await waitFor(() => {
            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.queryByText('Product Two Title')).toBeDefined();
            expect(screen.queryByText('Product Three Title')).toBeDefined();
        });
    });

    test('it should show error toast when there is an error', async () => {
        axiosMock.onGet('https://fakestoreapi.com/productsnotworking').reply(500);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeDefined();
        });
    });

    test('it should show no products found when no products are found', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, []);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No products found...')).toBeDefined();
        });
    });

    test('it should show loading screen when loading', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeDefined();
        });
    });

    test('it should refresh the products when the pull to refresh is triggered', async () => {
        const getProducts = jest.fn();

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        waitFor(() => {
            fireEvent(screen.getByTestId('home-screen-scrollview'), 'onRefresh');

            expect(getProducts).toHaveBeenCalled();
        });
    });
});