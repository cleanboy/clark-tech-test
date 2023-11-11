import { render, screen } from '@testing-library/react-native';

import GluestackProvider from "../../hoc/GluestackProvider";
import SearchInput from './index';

const mockOnChage = jest.fn();

describe('SearchInput', () => {
    test('it should render the search input', () => {
        render(
            <GluestackProvider>
                <SearchInput onChange={mockOnChage} />
            </GluestackProvider>
        );

        const input = screen.getByPlaceholderText('Search...');

        expect(input).toBeDefined();
    });

    test('it should call the onChange function when the input changes', () => {
        render(
            <GluestackProvider>
                <SearchInput onChange={mockOnChage} />
            </GluestackProvider>
        );

        const input = screen.getByPlaceholderText('Search...');

        input.props.onChangeText('Test');

        expect(mockOnChage).toHaveBeenCalled();
    });
});