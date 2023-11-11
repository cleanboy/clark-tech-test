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
    }
];

const axiosMock = new MockAdapter(axios);

describe("ProductDetail", () => {
    test('it should render all props passed to product detail screen', async () => {
        axiosMock.onGet('https://fakestoreapi.com/products').reply(200, responseData);

        render(
            <GluestackProvider>
                <Router />
            </GluestackProvider>
        );

        waitFor(() => {
            const itemOne = screen.getByTestId('product-1');

            fireEvent.press(itemOne);

            expect(screen.getByText('Product One Title')).toBeDefined();
            expect(screen.getByText('Product Description')).toBeDefined();
            expect(screen.getByText('Product Category')).toBeDefined();
            expect(screen.getByText('109.95')).toBeDefined();
            expect(screen.getByText('Rating: 3.9/5 (120)')).toBeDefined();
        });

        axiosMock.restore();
    });
});