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

        expect(title).toBeDefined();
    });
});