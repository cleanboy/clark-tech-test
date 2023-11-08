import React from 'react';
import { 
    Input, 
    InputField,
    InputSlot,
    InputIcon,
    SearchIcon
} from '@gluestack-ui/themed';

import Container from '../../components/Container';

const HomeScreen = () => {
    return (
        <Container>
            <Input 
                variant="rounded"
                size="md"
            >
                <InputSlot>
                    <InputIcon as={SearchIcon} color="#aaa" size="md" marginLeft={16} />
                </InputSlot>
                <InputField placeholder="Search..." />
            </Input>
        </Container>
    );
};

export default HomeScreen;