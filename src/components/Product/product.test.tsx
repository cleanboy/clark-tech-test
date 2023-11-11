import { render, screen } from "@testing-library/react-native";

import GluestackProvider from "../../hoc/GluestackProvider";
import Product from "./index";

describe("Product", () => {
    test("it should pass props", () => {
        const rating = {
            rate: 5,
            count: 10
        }

        render(
            <GluestackProvider>
                <Product 
                    title="Test Title"
                    category="Test Category"
                    price={10}
                    image="https://picsum.photos/200/300"
                    rating={rating}
                />
            </GluestackProvider>
        );

        const title = screen.getByText("Test Title");
        const category = screen.getByText("Category: Test Category");
        const price = screen.getByText("Price: €10");
        const ratingText = screen.getByText("5/5 (10)");

        expect(title).toBeDefined();
        expect(category).toBeDefined();
        expect(price).toBeDefined();
        expect(ratingText).toBeDefined();
    });

    test("it should render an image", async () => {
        const rating = {
            rate: 5,
            count: 10
        }

        render(
            <GluestackProvider>
                <Product 
                    title="Test Title"
                    category="Test Category"
                    price={10}
                    image="https://picsum.photos/200/300"
                    rating={rating}
                />
            </GluestackProvider>
        );

        const image = await screen.findByTestId("product-image");

        expect(image.props.source.uri).toBe('https://picsum.photos/200/300');
    });
});